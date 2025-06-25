using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Interfaces;

namespace CoreBuyNow.Services.Implementations;

public class WalletService(IWalletRepository walletRepository) : IWalletService
{
    public async Task CreateWallet(Guid userId, string otp)
    {
        await walletRepository.CreateWallet(userId, otp);
    }

    public async Task DeleteWallet(Guid userId)
    {
        await walletRepository.DeleteWallet(userId);
    }

    public async Task<Wallet> GetWallet(Guid userId)
    {
        return await walletRepository.GetWallet(userId);
    }

    public async Task TransferMoney(decimal amount, string description, Guid userId, string recipientId, string otp)
    {
        await walletRepository.TransferMoney(amount, description, userId, recipientId, otp);
    }

    public async Task<List<Transaction>> GetTransactions(Guid userId, DateTime? startDate, DateTime? endDate)
    {
        return await walletRepository.GetTransactions(userId, startDate, endDate);
    }

    public async Task Pay(Guid billId, Guid customerId)
    {
        await walletRepository.Pay(billId, customerId);
    }
    public async Task<string> GetWalletByWalletNumber(string walletNumber)
    {
        return await walletRepository.GetWalletByWalletNumber(walletNumber);
    }
}