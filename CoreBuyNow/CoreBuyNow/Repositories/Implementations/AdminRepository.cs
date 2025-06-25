using CoreBuyNow.Models;
using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoreBuyNow.Repositories.Implementations;
 
public class AdminRepository (AppDbContext dbContext) : IAdminRepository
{
    public async Task<AdminDto> GetInfomation(DateTime? startDate, DateTime? endDate)
    {
        if (startDate.HasValue && endDate.HasValue)
        {
            var customerCount = await dbContext.Customers.Include(c=>c.Account).Where(c=>c.Account.CreatedDate >= startDate && c.Account.CreatedDate<= endDate).CountAsync();
            var shopCount = await dbContext.Shops.Include(c=>c.Account).Where(c=>c.Account.CreatedDate >= startDate && c.Account.CreatedDate<= endDate).CountAsync();
            var billCount = await dbContext.Bills.Where(b=>b.CreateDate >= startDate && b.CreateDate <= endDate).CountAsync();
            var revenue = await dbContext.Bills.Where(b=>b.CreateDate >= startDate && b.CreateDate <= endDate).Select(b=>b.TotalPrice).DefaultIfEmpty().SumAsync();
            var productCount = await dbContext.Products.Where(p=>p.CreatedDate >= startDate && p.CreatedDate <= endDate).CountAsync();
            return new AdminDto
            {
                ShopCount = shopCount,
                ProductCount = productCount,
                BillCount = billCount,
                CustomerCount = customerCount,
                Revenue = revenue,
            };
        }
        else
        {   
            var customerCount = await dbContext.Customers.CountAsync();
            var shopCount = await dbContext.Shops.CountAsync();
            var billCount = await dbContext.Bills.CountAsync();
            var revenue = await dbContext.Bills.Select(b=>b.TotalPrice).DefaultIfEmpty().SumAsync();
            var productCount = await dbContext.Products.CountAsync();
            return new AdminDto
            {
                ShopCount = shopCount,
                ProductCount = productCount,
                BillCount = billCount,
                CustomerCount = customerCount,
                Revenue = revenue,
            };
        }
    }
    public async Task<decimal> GetRevenueOverTime(DateTime startDate, DateTime endDate)
    {
        var revenue = await dbContext.Bills
            .Where(b=>b.CreateDate >= startDate && b.CreateDate <= endDate)
            .Select(b=>b.TotalPrice)
            .DefaultIfEmpty()
            .SumAsync();
        return revenue;
    }

    public async Task<List<ShopInAdminResponse>> GetShops()
    {
        return await dbContext.Shops
            .Select(s=> new ShopInAdminResponse
            {
                ShopId = s.ShopId,
                Avatar = s.Avatar,
                ShopName = s.ShopName,
                ProductCount = s.ProductCount,
                BillCount = dbContext.Bills.Count(b => b.ShopId == s.ShopId),
                Revenue = dbContext.Bills.Where(b => b.ShopId == s.ShopId && b.OrderStatus == OrderStatus.Completed).Sum(b => b.TotalPrice),
                Status = s.Status,
            })
            .ToListAsync();
    }
    public async Task<List<CustomerInAdminResponse>> GetCustomers()
    {
        return await dbContext.Customers
            .Select(s=> new CustomerInAdminResponse
            {
                AccountId = s.AccountId,
                CustomerId = s.CustomerId,
                CustomerName = s.CustomerName,
                Avatar = s.Avatar,
                PhoneNumber = s.PhoneNumber,
                TotalSpending = dbContext.Bills.Where(b=>b.CustomerId == s.CustomerId).Sum(b=>b.TotalPrice),
                CompleteOrderCount = dbContext.Bills.Count(b => b.OrderStatus == OrderStatus.Completed && b.CustomerId == s.CustomerId),
            })
            .ToListAsync();
    }

    public async Task ActivateShop(Guid shopId)
    {
        var shop = dbContext.Shops.FirstOrDefault(s=>s.ShopId == shopId);
        if (shop == null) throw new Exception("Shop not found");
        if (shop.Status == Status.Active) throw new Exception("Shop is already active");
        shop.Status = Status.Active;
        dbContext.Shops.Update(shop);
        await dbContext.SaveChangesAsync();
    }

    public async Task DeactivateShop(Guid shopId)
    {
        var shop = dbContext.Shops.FirstOrDefault(s=>s.ShopId == shopId);
        if (shop == null) throw new Exception("Shop not found");
        if (shop.Status == Status.Inactive) throw new Exception("Shop is already inactive");
        shop.Status = Status.Inactive;
        dbContext.Shops.Update(shop);
        await dbContext.SaveChangesAsync();
    }

    public async Task ResetPassword(Guid accountId)
    {
        var account = dbContext.Accounts.FirstOrDefault(a => a.AccountId == accountId);
        if (account == null) throw new Exception("Account not found");
        account.PassWord = "1";
        dbContext.Accounts.Update(account);
        await dbContext.SaveChangesAsync();
    }
}