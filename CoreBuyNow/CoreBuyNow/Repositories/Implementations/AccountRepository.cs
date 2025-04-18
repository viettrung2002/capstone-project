using CoreBuyNow.Models;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;

namespace CoreBuyNow.Repositories.Implementations;

public class AccountRepository(AppDbContext dbContext) : IAccountRepository
{
    public async Task AddAccount(Account account)
    {
        if (string.IsNullOrEmpty(account.UserName) || string.IsNullOrEmpty(account.PassWord) )
        {
            throw new ArgumentException ("Please enter username and password.");
        }
        if (!Enum.IsDefined(typeof(AccountRole), account.Role))
        {
            throw new ArgumentException("Invalid role selected.");
        }

        if (account.AccountId == Guid.Empty)
        {
            account.AccountId = Guid.NewGuid();
        }
        dbContext.Accounts.Add(account);
        await dbContext.SaveChangesAsync();

    }
    public async Task<Account?> GetAccountById(Guid id)
    {
        return await dbContext.Accounts.FindAsync(id);
    }

    
}