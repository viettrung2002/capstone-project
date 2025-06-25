using CoreBuyNow.Models;
using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using LinqToDB;
using Microsoft.EntityFrameworkCore;

namespace CoreBuyNow.Repositories.Implementations;

public class WalletRepository(AppDbContext dbContext, ILogger<WalletRepository> logger) : IWalletRepository
{
    public async Task CreateWallet(Guid userId, string otp)
    {
        var wallet1 = dbContext.Wallets.FirstOrDefault(w => w.UserId == userId);
        if (wallet1 != null) throw new Exception("Wallet already exists");
        var guid = Guid.NewGuid();
        var base64 = Convert.ToBase64String(guid.ToByteArray());
        base64 = base64.Replace("/", "_").Replace("+", "-").TrimEnd('=');
        var wallet = new Wallet
        {
            Otp = otp,
            WalletNumber = base64,
            WalletId = Guid.NewGuid(),
            UserId = userId,
            Balance = 0,
            UpdateDate = DateTime.Now,
        };
        dbContext.Wallets.Add(wallet);
        await dbContext.SaveChangesAsync();
    }

    public async Task DeleteWallet(Guid userId)
    {
        var wallet = dbContext.Wallets.FirstOrDefault(w => w.UserId == userId);
        if (wallet != null)
            dbContext.Wallets.Remove(wallet);
        else
            throw new Exception("Wallet not found");
        await dbContext.SaveChangesAsync();
    }

    public async Task<Wallet> GetWallet(Guid userId)
    {
        var wallet = await dbContext.Wallets.FirstOrDefaultAsync(w => w.UserId == userId);
        if (wallet != null)
            return wallet;
        throw new Exception("Wallet not found");
    }

    public async Task TransferMoney(decimal amount, string description, Guid userId, string recipientId, string otp)
    {
        logger.LogInformation("ID Nhan Duoc: {id}", userId);
        var wallet = dbContext.Wallets.FirstOrDefault(w => w.UserId == userId);
        if (wallet == null)
            throw new Exception("Wallet not found");
        if (wallet.Otp != otp) throw new Exception("Wrong otp");
        if (wallet.Balance < amount)
            throw new Exception("Insufficient balance");
        wallet.Balance -= amount;
        var depositTransaction = new Transaction
        {
            TransactionId = Guid.NewGuid(),
            WalletId = wallet.WalletId,
            TransactionType = TransactionType.Withdraw,
            Amount = amount,
            BalanceAfter = wallet.Balance,
            Description = description,
            CreateDate = DateTime.Now,
        };
        var wallet2 = dbContext.Wallets.FirstOrDefault(w => w.WalletNumber == recipientId);
        if (wallet2 == null) throw new Exception("Wallet2 not found");
        wallet2.Balance += amount;
        var withdrawTransaction = new Transaction
        {
            TransactionId = Guid.NewGuid(),
            WalletId = wallet2.WalletId,
            TransactionType = TransactionType.Deposit,
            Amount = amount,
            BalanceAfter = wallet2.Balance,
            Description = description,
            CreateDate = DateTime.Now
        };
        dbContext.Transactions.Add(depositTransaction);
        dbContext.Transactions.Add(withdrawTransaction);
        await dbContext.SaveChangesAsync();

    }

    public async Task Pay(Guid billId, Guid customerId)
    {
        var bill = await dbContext.Bills.FirstOrDefaultAsync(b => b.BillId == billId);
        var wallet = await dbContext.Wallets.FirstOrDefaultAsync(w => w.UserId == customerId);
        if (bill == null) throw new Exception("Bill not found");
        if (wallet == null) throw new Exception("Wallet not found");
        if (wallet.Balance < bill.TotalPrice) throw new Exception("Insufficient balance");
        wallet.Balance -= bill.TotalPrice;
        var depositTransaction = new Transaction
        {
            TransactionId = Guid.NewGuid(),
            WalletId = wallet.WalletId,
            TransactionType = TransactionType.Deposit,
            Amount = bill.TotalPrice,
            BalanceAfter = wallet.Balance,
            CreateDate = DateTime.Now,
        };
        var shopId = await dbContext.Bills
            .Include(b => b.Items)
            .ThenInclude(i => i.Product)
            .ThenInclude(p => p.Shop)
            .Select(b => b.Items
                .Select(i => i.Product.Shop.ShopId)
                .FirstOrDefault())
            .FirstOrDefaultAsync();


        var shopWallet = await dbContext.Wallets.FirstOrDefaultAsync(w => w.WalletId == shopId);
        if (shopWallet == null) throw new Exception("Shop Wallet not found");
        shopWallet.Balance += bill.TotalPrice;

        var wTransaction = new Transaction
        {
            TransactionId = Guid.NewGuid(),
            WalletId = shopWallet.WalletId,
            TransactionType = TransactionType.Withdraw,
            Amount = bill.TotalPrice,
            BalanceAfter = shopWallet.Balance,
            CreateDate = DateTime.Now,
        };

        dbContext.Transactions.Add(depositTransaction);
        dbContext.Wallets.Update(wallet);
        dbContext.Wallets.Update(shopWallet);
        await dbContext.SaveChangesAsync();
    }

    public async Task Recharge(PayOsResponseDto response)
    {
        var wallet = dbContext.Wallets.FirstOrDefault(wallet => wallet.UserId == response.UserId);
        if (wallet == null) throw new Exception("Wallet not found");
        wallet.Balance += response.Amount;
        wallet.UpdateDate = response.PaidTime;

        var depositTransaction = new Transaction
        {
            TransactionId = Guid.NewGuid(),
            WalletId = wallet.WalletId,
            TransactionType = TransactionType.Deposit,
            Amount = response.Amount,
            BalanceAfter = wallet.Balance,
            Description = "Nap Tien Vao Vi",
            CreateDate = response.PaidTime,
        };
        dbContext.Wallets.Update(wallet);
        dbContext.Transactions.Add(depositTransaction);
        await dbContext.SaveChangesAsync();
    }

    public async Task<List<Transaction>> GetTransactions(Guid userId, DateTime? startDate, DateTime? endDate)
    {
        var query = dbContext.Transactions.AsQueryable();
        if (startDate.HasValue && endDate.HasValue)
        {
            query = query.Where(t => t.CreateDate >= startDate.Value && t.CreateDate <= endDate.Value);
        }
        return await query
            .Include(t => t.Wallet)
            .Where(t => t.Wallet.UserId == userId)
            .OrderByDescending(t => t.CreateDate)
            .ToListAsync();
    }

    public async Task<string> GetWalletByWalletNumber(string walletNumber)
    {
        var wallet = await dbContext.Wallets.FirstOrDefaultAsync(w => w.WalletNumber == walletNumber);
        if (wallet == null) throw new Exception("Wallet not found");
        var customer = await dbContext.Customers.FirstOrDefaultAsync(c=>c.CustomerId == wallet.UserId);
        if (customer?.CustomerName != null) return customer.CustomerName;
        var shop = dbContext.Shops.FirstOrDefault(s => s.ShopId == wallet.UserId);
        if (shop?.ShopName == null) throw new Exception("Not found name");
        return shop.ShopName;
    }
}