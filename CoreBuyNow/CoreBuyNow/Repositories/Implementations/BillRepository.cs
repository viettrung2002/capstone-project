using CoreBuyNow.Models;
using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoreBuyNow.Repositories.Implementations;

public class BillRepository (AppDbContext dbContext, ILogger<BillRepository> logger) : IBillRepository
{
    public async Task CreateBill(Bill bill, Guid customerId)
    {
        if (bill.BillId == Guid.Empty) bill.BillId = Guid.NewGuid();
        bill.CreateDate = DateTime.Now;
        
        var customer = await dbContext.Customers.FindAsync(customerId);
        logger.LogInformation("customer Id {id}", customer.CustomerId);
        logger.LogInformation("customer Id {price}", bill.TotalPrice);
        if (customer == null)
        {
            throw new Exception("Customer not found");
        }
        if (bill.Items != null)
        {
            foreach (var item in bill.Items)
            {
                item.ItemId = Guid.NewGuid();
                
                item.BillId = bill.BillId;
            }
        }
        foreach (var item in bill.Items)
        {
            var product =  dbContext.Products.FirstOrDefault(p=>p.ProductId == item.ProductId);
            if (product != null) 
            {
                item.UnitPrice = product.Price;
                // bill.TotalPrice += product.Price - (product.Price * product.Discount / 100) * item.Quantity;
            }
        }

        if (bill.ShopVoucherId != Guid.Empty || bill.ShopVoucherId != Guid.Empty)
        {
            
            var voucher = dbContext.VoucherWallets.Include(b=>b.Voucher).Where(v=>v.CustomerId == customerId).FirstOrDefault(b=>b.VoucherId == bill.ShopVoucherId);
            if (voucher is { Voucher: not null })
            {
                logger.LogInformation($"Voucher ID nhan duoc tu client: {voucher.VoucherId}");
                if (voucher.Quantity > 0)
                {
                    bill.TotalPrice -= voucher.Voucher.Value;
                    voucher.Quantity -= 1;
                    dbContext.VoucherWallets.Update(voucher);
                    logger.LogInformation($"Voucher sau khi da add {voucher.Quantity}");
                } else throw new Exception("Shop Voucher ís over");
                
            } else throw new Exception("Shop Voucher not found");
        }
        if (bill.VoucherId != Guid.Empty || bill.VoucherId != Guid.Empty)
        {
            logger.LogInformation($"Voucher Admin ID nhan duoc tu client: {bill.VoucherId}, so luong voucher ");
            var voucher = dbContext.VoucherWallets.Include(v=>v.Voucher).Where(v=>v.CustomerId == customerId).FirstOrDefault(b=>b.VoucherId == bill.VoucherId && b.Voucher.Role == Role.Product);
            // logger.LogInformation("Voucher da tim thay {voucherId}", voucher.VoucherId);
            if (voucher is { Voucher: not null })
            {
                logger.LogInformation($"Voucher Admin ID nhan duoc tu client: {voucher.VoucherId}, so luong voucher {voucher.Quantity}");
                if (voucher.Quantity > 0)
                {
                    bill.TotalPrice -= voucher.Voucher.Value;
                    voucher.Quantity -= 1;
                    dbContext.VoucherWallets.Update(voucher);
                } else throw new Exception("BuyNow Voucher ís over");
                
            } else throw new Exception("BuyNow Voucher not found");
        }
        if (bill.ShippingVoucherId != Guid.Empty || bill.ShippingVoucherId != Guid.Empty)
        {
            var voucher = dbContext.VoucherWallets.Include(v=>v.Voucher).FirstOrDefault(b=>b.VoucherId == bill.ShippingVoucherId && b.Voucher.Role == Role.Shipping);
            if (voucher is { Voucher: not null })
            {
                if (voucher.Quantity > 0)
                {
                    bill.TotalPrice -= voucher.Voucher.Value;
                    voucher.Quantity -= 1;
                } else throw new Exception("Shipping Voucher ís over");
                
            } else throw new Exception("Shipping Voucher not found");
        }
        bill.CustomerId = customerId;
        dbContext.Bills.Add(bill);
        await dbContext.SaveChangesAsync();
    }

    public async Task<PageResponseDto<BillResponseDto>> GetBills(Guid customerId, int pageIndex, int pageSize)
    {
        return new PageResponseDto<BillResponseDto>
        (
            pageIndex,
            pageSize,
            await dbContext.Bills.CountAsync(
                b=>b.CustomerId == customerId),
            await dbContext.Bills
                .Include(b => b.Items)!
                    .ThenInclude(i => i.Product)!
                    .ThenInclude(p => p.Shop)
                .Where(b => b.CustomerId == customerId)
                .OrderByDescending(b => b.CreateDate)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .Select(b => new BillResponseDto
                {
                    BillId = b.BillId,
                    ShopName = b.Items.Select(i => i.Product.Shop.ShopName).FirstOrDefault(),
                    ShopId = b.Items.Select(i => i.Product.Shop.ShopId).FirstOrDefault(),
                    OrderStatus = b.OrderStatus,
                    TotalPrice = b.TotalPrice,
                    Items = b.Items
                })
                .ToListAsync()
        );
    }
    public async Task<PageResponseDto<BillResponseDto>> GetBills(Guid customerId, OrderStatus status, int pageIndex, int pageSize)
    {
        return new PageResponseDto<BillResponseDto>
        (
            pageIndex,
            pageSize,
            await dbContext.Bills.CountAsync(
                b=>b.CustomerId == customerId && b.OrderStatus == status),
            await dbContext.Bills
                .Include(b => b.Items)!
                .ThenInclude(i => i.Product)!
                .ThenInclude(p => p.Shop)
                .Where(b => b.CustomerId == customerId && b.OrderStatus == status)
                .OrderByDescending(b => b.CreateDate)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .Select(b => new BillResponseDto
                {
                    BillId = b.BillId,
                    ShopName = b.Items[0].Product.Shop.ShopName,
                    ShopId = b.Items[0].Product.Shop.ShopId,
                    OrderStatus = b.OrderStatus,
                    TotalPrice = b.TotalPrice,
                    Items = b.Items
                })
                .ToListAsync()
        );
    }

    public async Task UpdateStatus(Guid billId)
    {
        var bill = await dbContext.Bills.FindAsync(billId);
        if (bill == null)
        {
            throw new Exception("Bill not found");
        }
        if (bill.OrderStatus == OrderStatus.Completed || bill.OrderStatus == OrderStatus.Cancelled)
        {
            throw new Exception("Bill is completed");
        }
        bill.OrderStatus += 1;
        dbContext.Update(bill);
        await dbContext.SaveChangesAsync();
    }

    public async Task CancelBill(Guid billId)
    {
        var bill = await dbContext.Bills.FindAsync(billId);
        if (bill == null)
        {
            throw new Exception("Bill not found");
        }
        if (bill.OrderStatus == OrderStatus.Completed ) throw new Exception("Bill is completed");
        bill.OrderStatus = OrderStatus.Cancelled;
        dbContext.Update(bill);
        await dbContext.SaveChangesAsync();
    }
}