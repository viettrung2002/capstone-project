using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Repositories.Interfaces;

public interface IWalletRepository
{
    Task CreateWallet(Guid userId, string otp);
    Task DeleteWallet(Guid userId);
    Task<Wallet> GetWallet(Guid userId);
    Task TransferMoney(decimal amount, string description, Guid userId, Guid recipientId);
    Task<List<Transaction>> GetTransactions(Guid userId);

    Task Pay(Guid billId, Guid customerId);

    Task Recharge(PayOsResponseDto response);
}