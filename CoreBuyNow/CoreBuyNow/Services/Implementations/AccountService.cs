using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Interfaces;

namespace CoreBuyNow.Services.Implementations;

public class AccountService (IAccountRepository accountRepository, ICustomerRepository customerRepository, IShopRepository shopRepository) : IAccountService
{
    public async Task AddAccount<T>(Account account, T info)
    {
        await accountRepository.AddAccount(account);
        if (account.Role == AccountRole.Shop && info is Shop shopInfo)
        {
            var shop = new Shop
            {
                ShopId = Guid.NewGuid(),
                ShopName = shopInfo.ShopName,
                Address = shopInfo.Address,
                ProductCount = shopInfo.ProductCount,
                CreatedDate = DateTime.Now,
                IsOfficial = shopInfo.IsOfficial,
                AccountId = account.AccountId,
            };
            await shopRepository.CreateShop(shop);
        }

        if (account.Role == AccountRole.Customer && info is Customer customerInfo)
        {
            var customer = new Customer
            {
                CustomerId = Guid.NewGuid(),
                CustomerName = customerInfo.CustomerName,
                Address = customerInfo.Address,
                PhoneNumber = customerInfo.PhoneNumber,
                Gender = customerInfo.Gender,
                BirthDay = customerInfo.BirthDay,
                AccountId = account.AccountId,
            };
            await customerRepository.CreateCustomer(customer);
        }
    }
    public async Task<Account?> GetAccountByIdAsync(Guid id)
    {
        return await accountRepository.GetAccountById(id);
    }
}