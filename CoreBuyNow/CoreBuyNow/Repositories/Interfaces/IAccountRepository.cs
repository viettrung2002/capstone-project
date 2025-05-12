using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Repositories.Interfaces;

public interface IAccountRepository
{
    Task AddAccount(Account account);
    Task<Account?> GetAccountById(Guid id);
    Task<AccountResponseDto<Shop>> Login(string username, string password);
    Task<AccountResponseDto<Customer>> CustomerLogin(string username, string password);
    Task<AccountResponseDto<Admin>> AdminLogin(string username, string password);
    AccountRole GetRole (string username);
}