using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Interfaces;

namespace CoreBuyNow.Services.Implementations;

public class AccountService (IAccountRepository accountRepository, ICustomerRepository customerRepository, IShopRepository shopRepository, ILogger<AccountService> logger) : IAccountService
{
    public async Task AddAccount<T>(AccountRegisterDto<T> accountRegisterDto)
    {
        var account = new Account
        {
            UserName = accountRegisterDto.UserName,
            PassWord = accountRegisterDto.PassWord,
            Role = accountRegisterDto.Role,
        };
        await accountRepository.AddAccount(account);
        logger.LogInformation("AccountId_: {accountId}", account.AccountId);
        if (account.Role == AccountRole.Shop && accountRegisterDto.Info is ShopDto shopInfo)
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

        if (account.Role == AccountRole.Customer && accountRegisterDto.Info is CustomerDto customerInfo)
        {
            logger.LogInformation("AccountId: {accountId}", account.AccountId);
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