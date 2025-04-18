using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Repositories.Interfaces;

public interface IAccountRepository
{
    Task AddAccount(Account account);
    Task<Account?> GetAccountById(Guid id);
}