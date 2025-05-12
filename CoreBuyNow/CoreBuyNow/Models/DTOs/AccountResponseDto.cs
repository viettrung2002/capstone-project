using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Models.DTOs;

public class AccountResponseDto<T>
{
    public AccountRole Role { get; set; }
    public string Token { get; set; } 
    public T Info { get; set; }
}