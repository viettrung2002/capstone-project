using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Interfaces;

namespace CoreBuyNow.Services.Implementations;

public class AccountService (IAccountRepository accountRepository, ICustomerRepository customerRepository, IShopRepository shopRepository, ILogger<AccountService> logger, IAddressRepository addressRepository) : IAccountService
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
        switch (account.Role)
        {
            case AccountRole.Shop when accountRegisterDto.Info is ShopDto shopInfo:
            {
                logger.LogInformation("da vao day");
                var newId = Guid.NewGuid();
                if (shopInfo.Address != null)
                {
                    var address = new Address
                    {
                        AddressId = Guid.NewGuid(),
                        UserId = newId,
                        ProvinceId = shopInfo.Address.ProvinceId,
                        Name = "shop",
                        PhoneNumber = "0",
                        DistrictId = shopInfo.Address.DistrictId,
                        WardId = shopInfo.Address.WardId,
                        StreetAddress = "s"
                    };
                    await addressRepository.AddAddressShop(address);
                    var shop = new Shop
                    {
                        ShopId = newId,
                        ShopName = shopInfo.ShopName,
                        AddressId = address.AddressId,
                        ProductCount = shopInfo.ProductCount,
                        CreatedDate = DateTime.Now,
                        IsOfficial = shopInfo.IsOfficial,
                        AccountId = account.AccountId,
                    };
                    await shopRepository.CreateShop(shop);
                    
                    
                }

                
                break;
            }
            case AccountRole.Customer when accountRegisterDto.Info is CustomerDto customerInfo:
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
                break;
            }
            case AccountRole.Admin:
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }
    }
    public async Task<Account?> GetAccountByIdAsync(Guid id)
    {
        return await accountRepository.GetAccountById(id);
    }

    public async Task<AccountResponseDto<object>> Login(string username, string password)
    {
        var role = accountRepository.GetRole(username);
        switch (role)
        {
            case AccountRole.Customer:
            {
                var response = await accountRepository.CustomerLogin(username, password);
                return new AccountResponseDto<object>
                {
                    Role = response.Role,
                    Token = response.Token,
                    Info = response.Info 
                };
            }
            case AccountRole.Shop:
            {
                var response = await accountRepository.Login(username, password);
                return new AccountResponseDto<object>
                {
                    Role = response.Role,
                    Token = response.Token,
                    Info = response.Info 
                };
            }
            case AccountRole.Admin:
            {
                var response = await accountRepository.AdminLogin(username, password);
                return new AccountResponseDto<object>
                {
                    Role = response.Role,
                    Token = response.Token,
                    Info = response.Info 
                };
            }
            default:
                throw new Exception($"Invalid role: {role}");
        }
    }

    public async Task<Customer> GetCustomer(Guid customerId)
    {
        return await customerRepository.GetCustomerById(customerId);
    }

    public async Task<ShopResponseDto> GetShop(Guid shopId)
    {
        return await shopRepository.GetShopById(shopId);
    }

    public async Task ChangePassword(string oldPassword, string newPassword, Guid accountId)
    {
        await accountRepository.ChangePassword(oldPassword, newPassword, accountId);
    }
}