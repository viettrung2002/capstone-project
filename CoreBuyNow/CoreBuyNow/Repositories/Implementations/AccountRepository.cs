using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CoreBuyNow.Models;
using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace CoreBuyNow.Repositories.Implementations;

public class AccountRepository(AppDbContext dbContext, IConfiguration configuration) : IAccountRepository
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
        var eAccount = dbContext.Accounts.FirstOrDefault(x=>x.UserName == account.UserName);
        if (eAccount != null) throw new Exception("Account already exists.");
        dbContext.Accounts.Add(account);
        await dbContext.SaveChangesAsync();

    }
    public async Task<Account?> GetAccountById(Guid id)
    {
        return await dbContext.Accounts.FindAsync(id);
    }
    

    public async Task<AccountResponseDto<Shop>> Login(string username, string password)
    {
        var user = dbContext.Accounts.FirstOrDefault(x => x.UserName == username);
        if (user.PassWord != password) throw new ArgumentException ("Invalid password.");
        
        var shop = dbContext.Shops.FirstOrDefault(x=>x.AccountId == user.AccountId);
        return new AccountResponseDto<Shop>
        {
            Role = AccountRole.Shop,
            Token = GenerateJwtToken(username, "Shop", shop.ShopId),
            Info = shop
        };
    }

    public async Task<AccountResponseDto<Customer>> CustomerLogin(string username, string password)
    {
        var user = dbContext.Accounts.FirstOrDefault(x => x.UserName == username);
        if (user.PassWord != password) throw new ArgumentException ("Invalid password.");
        
        var customer = dbContext.Customers.FirstOrDefault(x=>x.AccountId == user.AccountId);
        return new AccountResponseDto<Customer>
        {
            Role = AccountRole.Customer,
            Token = GenerateJwtToken(username, "Customer", customer.CustomerId),
            Info = customer
        };
    }

    public async Task<AccountResponseDto<Admin>> AdminLogin(string username, string password)
    {
        var user = dbContext.Accounts.FirstOrDefault(x => x.UserName == username);
        if (user.PassWord != password) throw new ArgumentException ("Invalid password.");
        
        var customer = dbContext.Admins.FirstOrDefault(x=>x.AccountId == user.AccountId);
        return new AccountResponseDto<Admin>
        {
            Role = AccountRole.Admin,
            Token = GenerateJwtToken(username, "Admin", customer.AdminId),
            Info = customer
        };
    }

    public AccountRole GetRole(string username)
    {
        var role = dbContext.Accounts.Where(x=>x.UserName == username).Select(x=>x.Role);
        return role.SingleOrDefault();
    }

    private string GenerateJwtToken(string username, string role, Guid id)
    {
        var jwtSettings = configuration.GetSection("JwtSettings");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim("id", id.ToString()),
            new Claim(ClaimTypes.Role, role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}