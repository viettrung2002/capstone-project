using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Interfaces;

namespace CoreBuyNow.Services.Implementations;

public class WalletService (IWalletRepository walletRepository) : IWalletService 
{
    public async Task CreateWallet(Guid userId)
    {
        await walletRepository.CreateWallet(userId);
    }

    public async Task DeleteWallet(Guid userId)
    {
        await walletRepository.DeleteWallet(userId);
    }

    public async Task<Wallet> GetWallet(Guid userId)
    {
        return await walletRepository.GetWallet(userId);
    }

    public async Task TransferMoney(decimal amount, string description, Guid userId, Guid recipientId)
    {
        await walletRepository.TransferMoney(amount, description, userId, recipientId);
    }

    public async Task<List<Transaction>> GetTransactions(Guid userId)
    {
        return await walletRepository.GetTransactions(userId);
    }

    public async Task Pay(Guid billId, Guid customerId)
    {
        await walletRepository.Pay(billId, customerId);
    }
}