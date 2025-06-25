using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CoreBuyNow.Models.Entities;

public class Account
{
    [Key]
    public Guid AccountId { get; set; } 
    [Required]
    [MaxLength(255)]
    public string UserName { get; set; }
    [Required]
    [MaxLength(255)]
    public string PassWord { get; set; }
    [Required]
    public AccountRole Role { get; set; }
    [JsonIgnore]
    public Shop? Shop { get; set; }   
    [JsonIgnore]
    public Customer? Customer { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.Now;
    public Guid ResetPasswordToken { get; set; }
    public DateTime ResetPasswordTokenExpiration { get; set; }
}

public enum AccountRole
{
    Admin,
    Customer,
    Shop
}