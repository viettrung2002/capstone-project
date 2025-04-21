using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Services.Interfaces;

public interface IAccountService
{
    Task AddAccount<T>(AccountRegisterDto<T> accountRegisterDto);
    Task<Account?> GetAccountByIdAsync(Guid id);
}