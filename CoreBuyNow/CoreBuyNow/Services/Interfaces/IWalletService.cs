using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Services.Interfaces;

public interface IWalletService
{
    Task CreateWallet(Guid userId, string otp);
    Task DeleteWallet(Guid userId);
    Task<Wallet> GetWallet(Guid userId);
    Task TransferMoney(decimal amount, string description, Guid userId, string recipientId, string otp);
    Task<List<Transaction>> GetTransactions(Guid userId, DateTime? startDate, DateTime? endDate);

    Task Pay(Guid billId, Guid customerId);
    Task<string> GetWalletByWalletNumber(string walletNumber);
}