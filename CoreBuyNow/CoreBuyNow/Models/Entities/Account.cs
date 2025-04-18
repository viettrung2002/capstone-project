using System.ComponentModel.DataAnnotations;

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
    
    public Shop? Shop { get; set; }      
    public Customer? Customer { get; set; }
}

public enum AccountRole
{
    Admin,
    Customer,
    Shop
}