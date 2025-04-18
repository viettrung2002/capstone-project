using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Services.Interfaces;

public interface IAccountService
{
    Task AddAccount<T>(Account account, T info);
    Task<Account?> GetAccountByIdAsync(Guid id);
}