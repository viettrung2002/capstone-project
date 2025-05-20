using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Services.Interfaces;

public interface IWalletService
{
    Task CreateWallet(Guid userId);
    Task DeleteWallet(Guid userId);
    Task<Wallet> GetWallet(Guid userId);
    Task TransferMoney(decimal amount, string description, Guid userId, Guid recipientId);
    Task<List<Transaction>> GetTransactions(Guid userId);

    Task Pay(Guid billId, Guid customerId);
}