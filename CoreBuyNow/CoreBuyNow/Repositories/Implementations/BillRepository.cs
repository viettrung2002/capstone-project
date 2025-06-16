using CoreBuyNow.Models;
using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoreBuyNow.Repositories.Implementations;

public class BillRepository (AppDbContext dbContext, ILogger<BillRepository> logger) : IBillRepository
{
    public async Task CreateBill(BillRequestDto req, Guid customerId)
    {
        
        var bill = req.Bill;
        if (bill.BillId == Guid.Empty) bill.BillId = Guid.NewGuid();
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
                item.Image = product.MainImage;
                bill.ShopId = product.ShopId;
            }
        }
        if (!string.IsNullOrEmpty(req.Otp))
        {
            var walletCustomer = dbContext.Wallets.FirstOrDefault(w=>w.UserId == customerId);
            if (walletCustomer == null) throw new Exception("Wallet user not found");
            var walletShop = dbContext.Wallets.FirstOrDefault(w => w.UserId == bill.ShopId);
            if (walletShop == null) throw new Exception("Wallet shop not found");
            if (walletCustomer.Otp != req.Otp) throw new Exception("Otp doesn't match");
            if (walletCustomer.Balance < bill.TotalPrice) throw new Exception("Insufficient balance to pay");
            walletCustomer.Balance -= bill.TotalPrice;
            var withdrawTransaction = new Transaction
            {
                TransactionId = Guid.NewGuid(),
                WalletId = walletCustomer.WalletId,
                TransactionType = TransactionType.Withdraw,
                Amount = bill.TotalPrice,
                BalanceAfter = walletCustomer.Balance,
                Description = "Thanhn toan don hang " + bill.BillId,
                CreateDate = DateTime.Now,
            };
            bill.PaymentType = PaymentType.Wallet;
            dbContext.Wallets.Update(walletCustomer);
            dbContext.Transactions.Add(withdrawTransaction);
        }
        else
        {
            bill.PaymentType = PaymentType.Cod;
        }
        
        bill.CreateDate = DateTime.Now;
        var customer = await dbContext.Customers.FindAsync(customerId);
        logger.LogInformation("customer Id {id}", customer.CustomerId);
        logger.LogInformation("customer Id {price}", bill.TotalPrice);
        if (customer == null)
        {
            throw new Exception("Customer not found");
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
        
        // Check Inventory
        foreach (var item in bill.Items)
        {
            var product = dbContext.Products.FirstOrDefault(p => p.ProductId == item.ProductId);
            if (product == null) throw new Exception ("Not found product");
            if (product.Inventory > item.Quantity)
            {
                product.Inventory -= item.Quantity;
                dbContext.Products.Update(product);
            }
            else throw new Exception("Insufficient inventory");
        }
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
                    Note = b.Note,
                    TotalPrice = b.TotalPrice,
                    Items = b.Items,
                    CustomerId = b.CustomerId,
                    PaymentType = b.PaymentType,
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
                    ShopName = b.Items.FirstOrDefault().Product.Shop.ShopName,
                    ShopId = b.Items.FirstOrDefault().Product.Shop.ShopId,
                    OrderStatus = b.OrderStatus,
                    CustomerId = b.CustomerId,
                    Note = b.Note,
                    TotalPrice = b.TotalPrice,
                    Items = b.Items,
                    PaymentType = b.PaymentType,
                })
                .ToListAsync()
        );
    }

    public async Task UpdateStatus(Guid billId)
    {
        var bill = dbContext.Bills.Include(b=>b.Items).FirstOrDefault(b=>b.BillId == billId);
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
        if (bill.OrderStatus == OrderStatus.Completed)
        {
            foreach (var item in bill.Items)
            {
                var product = dbContext.Products.FirstOrDefault(p => p.ProductId == item.ProductId);
                if (product == null) throw new Exception ("Not found product");
                product.Sold += item.Quantity;
                dbContext.Products.Update(product);
            }

            if (bill.PaymentType == PaymentType.Wallet)
            {
                var shopWallet = dbContext.Wallets.FirstOrDefault(w => w.UserId == bill.ShopId);
                if (shopWallet == null) throw new Exception ("Not found shop wallet");
                if (bill.VoucherId != Guid.Empty)
                {
                    var value = dbContext.Vouchers.Where(v=>v.VoucherId == bill.VoucherId).Select(v=>v.Value);
                    shopWallet.Balance += (Convert.ToDecimal(value) + bill.TotalPrice);
                    var dTransaction = new Transaction
                    {
                        TransactionId = Guid.NewGuid(),
                        WalletId = shopWallet.WalletId,
                        TransactionType = TransactionType.Deposit,
                        Amount = bill.TotalPrice + Convert.ToDecimal(value),
                        BalanceAfter = shopWallet.Balance,
                        Description = "Nhan Tien Tu Don Hang " + bill.BillId,
                        CreateDate = DateTime.Now,
                    };
                    dbContext.Transactions.Add(dTransaction);
                }
                else
                {
                    shopWallet.Balance +=  bill.TotalPrice;
                    var dTransaction = new Transaction
                    {
                        TransactionId = Guid.NewGuid(),
                        WalletId = shopWallet.WalletId,
                        TransactionType = TransactionType.Deposit,
                        Amount = bill.TotalPrice,
                        BalanceAfter = shopWallet.Balance,
                        Description = "Nhan Tien Tu Don Hang " + bill.BillId,
                        CreateDate = DateTime.Now,
                    };
                    dbContext.Transactions.Add(dTransaction);
                }
            }
        }
            
        await dbContext.SaveChangesAsync();
    }

    public async Task CancelBill(Guid billId)
    {
        var bill = dbContext.Bills
            .Include(b => b.Items)
            .FirstOrDefault(b=>b.BillId == billId);
        if (bill == null)
        {
            throw new Exception("Bill not found");
        }
        if (bill.OrderStatus == OrderStatus.Completed ) throw new Exception("Bill is completed");
        bill.OrderStatus = OrderStatus.Cancelled;
        foreach (var item in bill.Items)
        {
            var product = dbContext.Products.FirstOrDefault(p => p.ProductId == item.ProductId);
            if (product == null) throw new Exception ("Not found product");
            product.Inventory += item.Quantity;
            dbContext.Products.Update(product);
        }
        dbContext.Update(bill);
        if (bill.PaymentType == PaymentType.Wallet)
        {
            var customerWallet = dbContext.Wallets.FirstOrDefault(w => w.UserId == bill.CustomerId);
            if (customerWallet == null) throw new Exception ("Not found user Wallet");
            customerWallet.Balance += bill.TotalPrice;
            var dTransaction = new Transaction
            {
                TransactionId = Guid.NewGuid(),
                WalletId = customerWallet.WalletId,
                TransactionType = TransactionType.Deposit,
                Amount = bill.TotalPrice,
                BalanceAfter = customerWallet.Balance,
                Description = "Hoan Tien Don Hang " + bill.BillId,
                CreateDate = DateTime.Now,
            };
        }
        await dbContext.SaveChangesAsync();
    }

    public async Task<PageResponseDto<BillResponseDto>> GetBillWithShopId(Guid shopId, OrderStatus? status, int pageIndex, int pageSize)
    {
        if (!status.HasValue)
        {
            return new PageResponseDto<BillResponseDto>
            (
                pageIndex,
                pageSize,
                await dbContext.Bills.CountAsync(
                    b=>b.ShopId == shopId),
                await dbContext.Bills
                    .Include(b => b.Items)!
                    .Where(b => b.ShopId == shopId)
                    .OrderByDescending(b => b.CreateDate)
                    .Skip((pageIndex - 1) * pageSize)
                    .Take(pageSize)
                    .Select(b => new BillResponseDto
                    {
                        BillId = b.BillId,
                        OrderStatus = b.OrderStatus,
                        Note = b.Note,
                        TotalPrice = b.TotalPrice,
                        Items = b.Items,
                        CustomerId = b.CustomerId,
                        PaymentType = b.PaymentType,
                    })
                    .ToListAsync()
            );
        }
        else
        {
            return new PageResponseDto<BillResponseDto>
            (
                pageIndex,
                pageSize,
                await dbContext.Bills.CountAsync(
                    b=>b.ShopId == shopId && b.OrderStatus == status),
                await dbContext.Bills
                    .Include(b => b.Items)!
                    .Where(b => b.ShopId == shopId && b.OrderStatus == status)
                    .OrderByDescending(b => b.CreateDate)
                    .Skip((pageIndex - 1) * pageSize)
                    .Take(pageSize)
                    .Select(b => new BillResponseDto
                    {
                        BillId = b.BillId,
                        OrderStatus = b.OrderStatus,
                        Note = b.Note,
                        TotalPrice = b.TotalPrice,
                        Items = b.Items,
                        CustomerId = b.CustomerId,
                        PaymentType = b.PaymentType,
                    })
                    .ToListAsync()
            );
        }
    }

    public async Task<Bill> GetBill(Guid billId)
    {
        var bill = await dbContext.Bills
            .Include(b => b.Items)
            .Include(b=>b.Address)
            .ThenInclude(a => a.Province)
            .Include(b=>b.Address)
            .ThenInclude(a => a.District)
            .Include(b=>b.Address)
            .ThenInclude(a => a.Ward)
            .FirstOrDefaultAsync(b => b.BillId == billId);
        if (bill == null ) throw new Exception ("Bill not found");
        return bill;
    }
}