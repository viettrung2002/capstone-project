namespace CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
public class AccountRegisterDto<T>
{
    public string UserName { get; set; } = default!;
    public string PassWord { get; set; } = default!;
    public AccountRole Role { get; set; }
    public T Info { get; set; } = default!;
}