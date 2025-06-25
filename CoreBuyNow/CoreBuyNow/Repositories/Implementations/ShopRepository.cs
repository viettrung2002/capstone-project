using CoreBuyNow.Models;
using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoreBuyNow.Repositories.Implementations;

public class ShopRepository (AppDbContext dbContext) : IShopRepository
{
    public async Task CreateShop(Shop shop)
    {
        if (string.IsNullOrEmpty(shop.ShopName))
        {
            throw new AggregateException("Enter your shop name!");
        }
        if (shop.ShopId == Guid.Empty) shop.ShopId = Guid.NewGuid();
        shop.CreatedDate = DateTime.Now;
        shop.Status = Status.Inactive;
        dbContext.Shops.Add(shop);
        await dbContext.SaveChangesAsync();
    }

    public async Task<Shop> GetShop(Guid shopId)
    {
        var shop = await dbContext.Shops
            .Include(s=>s.Account)
            .Include(s=>s.Address)
            .ThenInclude(a=>a.Province)
            .Include(s=>s.Address)
            .ThenInclude(a=>a.District)
            .Include(s=>s.Address)
            .ThenInclude(a=>a.Ward)
            .FirstOrDefaultAsync(s=>s.ShopId==shopId);
            
        if (shop == null) throw new Exception("Shop not found!");
        return shop;
    }

    public async Task UpdateShop(Shop shop, Guid id)
    {
        var existingShop = await dbContext.Shops.FindAsync(id);
        if (existingShop == null) throw new AggregateException("Enter your shop id!");
        existingShop.ShopName = shop.ShopName;  
        existingShop.AddressId = shop.AddressId;
        existingShop.ProductCount = shop.ProductCount;
        existingShop.Email = shop.Email;
        existingShop.Avatar = shop.Avatar;
        dbContext.Shops.Update(existingShop);
        await dbContext.SaveChangesAsync();
    }
    
    public async Task DeleteShop(Guid id)
    {
        var existingShop = await dbContext.Shops.FindAsync(id);
        if (existingShop == null)
        {
            throw new AggregateException("Enter your shop id!");
        }
        dbContext.Shops.Remove(existingShop);
        await dbContext.SaveChangesAsync();
    }
    public async Task<ShopResponseDto?> GetShopById(Guid id)
    {
        var ratingCount = dbContext.Comments.Include(p=>p.Product).Count(c => c.Product.ShopId == id);
        var rating = dbContext.Comments.Include(p=>p.Product).Where(c => c.Product.ShopId == id).Sum(c=>c.Rating);
        var categories = dbContext.Products
            .Include(p=>p.SubCategory)
            .Include(p=>p.Shop)
            .Where(p => p.Shop.ShopId == id)
            .Select(p=>p.SubCategory)
            .Distinct()
            .ToList();
        return await dbContext.Shops
            .Where(s => s.ShopId == id)
            .Select(s => new ShopResponseDto
            {
                ShopId = s.ShopId,
                ShopName = s.ShopName,
                Avatar = s.Avatar,
                AddressId = s.AddressId,
                ProductCount = s.ProductCount,
                CreatedDate = s.CreatedDate,
                IsOfficial = s.IsOfficial,
                Rating = ratingCount > 0 ? (double)rating/ratingCount : 0,
                RatingCount = ratingCount,
                Follower = 1000,
                Categories = categories,
            })
            .FirstOrDefaultAsync();

    }

    public async Task<List<Shop>> GetOfficialShop () {
        return await dbContext.Shops
            .Where(s=>s.IsOfficial == true)
            .ToListAsync();
    }

    public async Task<List<SubCategory?>> GetSubCategoryInShop (Guid shopId) {
        return await dbContext.Products
                .Include(p=>p.Shop)
                .Include(p=>p.SubCategory)
                .Where(p=>p.Shop.ShopId == shopId && p.SubCategory != null)
                .Select(p=>p.SubCategory)
                .Distinct()
                .ToListAsync();
    }

    public async Task<decimal> TongDoanhThu(Guid shopId, DateTime? startDate, DateTime? endDate)
    {
        var query = dbContext.Bills.AsQueryable();
        if (startDate.HasValue & endDate.HasValue)
        {
            query = query.Where(b=>b.CreateDate >= startDate && b.CreateDate <= endDate);
        }
        var doanhThu = await query.Where(b => b.ShopId == shopId && b.OrderStatus == OrderStatus.Completed)
                                .Select(b=>b.TotalPrice)
                                .SumAsync();
        return doanhThu;
    }
    public async Task<int> SoLuongDaBan(Guid shopId, DateTime? startDate, DateTime? endDate)
    {
        var query = dbContext.Bills.AsQueryable();
        if (startDate.HasValue && endDate.HasValue)
        {
            query = query.Where(b => b.CreateDate >= startDate && b.CreateDate <= endDate);
        }
        var soLuongDaBan = await query
            .Include(b => b.Items)
            .Where(b => b.ShopId == shopId && b.OrderStatus == OrderStatus.Completed)
            .SelectMany(b => b.Items)
            .SumAsync(p => p.Quantity);
        return soLuongDaBan;
    }
    public async Task<double> TiLeHoanThanh(Guid shopId, DateTime? startDate, DateTime? endDate)
    {
        var query = dbContext.Bills.AsQueryable();
        if (startDate.HasValue && endDate.HasValue)
        {
            query = query.Where(b => b.CreateDate >= startDate && b.CreateDate <= endDate);
        }
        var soLuongDaHoanThanh = await query
            .Where(b => b.ShopId == shopId && b.OrderStatus == OrderStatus.Completed)
            .CountAsync();
        var soLuongDaHuy = await query
            .Where(b => b.ShopId == shopId && b.OrderStatus == OrderStatus.Cancelled)
            .CountAsync();
        if (soLuongDaHoanThanh + soLuongDaHuy == 0) throw new Exception("No bill has been created.");
        return (double)soLuongDaHoanThanh/(soLuongDaHoanThanh+soLuongDaHuy);

    }
    public async Task<List<ProductInStatisticResponseDto>> TopSanPham(Guid shopId, bool sort, DateTime? startDate, DateTime? endDate )
    {
        var query = dbContext.Bills.Where(b=>b.ShopId == shopId && b.OrderStatus == OrderStatus.Completed);
        if (startDate.HasValue && endDate.HasValue) 
            query = query.Where(b => b.CreateDate >= startDate && b.CreateDate <= endDate);
        var billItems = await query.SelectMany(b => b.Items).Include(i=>i.Product).ToListAsync();
        if (!sort)
            return billItems
                .GroupBy(item => item.ProductId)
                .Select(g => new ProductInStatisticResponseDto
                {
                    ProductId = g.Key,
                    ProductName = g.Select(i=>i.Product.ProductName).FirstOrDefault(),
                    Sold = g.Sum(s => s.Quantity),
                    Price = g.Select(i=>i.Product.Price).FirstOrDefault(),
                    Image = g.Select(i=>i.Image).FirstOrDefault(),
                })
                .OrderBy(x => x.Sold)
                .ToList();
        {
            var result = billItems
                .GroupBy(item => item.ProductId)
                .Select(g => new ProductInStatisticResponseDto
                {
                    ProductId = g.Key,
                    ProductName = dbContext.Products.Where(p=>p.ProductId == g.Key).Select(p=>p.ProductName).FirstOrDefault(),
                    Sold = g.Sum(s => s.Quantity),
                    Price = dbContext.Products.Where(p => p.ProductId == g.Key).Select(p=>p.Price).FirstOrDefault(),
                    Image = g.Select(i=>i.Image).FirstOrDefault(),
                })
                .OrderByDescending(x => x.Sold) 
                .ToList();
            return result;
        }
    }
    // public async Task<List<SubCategory>> GetSubCategoryInShop(Guid shopId)
    // {
    //     throw new NotImplementedException();
    // }
}