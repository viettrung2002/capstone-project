using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CoreBuyNow.Models.Entities;

public class Shop
{
    [Required]
    [Key]
    public Guid ShopId { get; set; }
    [MaxLength(255)]
    [Required]
    public string? ShopName { get; set; }
    [Required]    
    public Guid AddressId { get; set; }
    public Address? Address { get; set; }
    public int ProductCount { get; set; }
    public DateTime CreatedDate { get; set; }
    public bool IsOfficial { get; set; }
    [Required]
    public Guid AccountId { get; set; }
    [StringLength(250)]
    public string? Email { get; set; }
    [ForeignKey("AccountId")]
    public Account? Account { get; set; }     
    [StringLength(500)]
    public string? Avatar { get; set; }
    public Status Status { get; set; }
}

public enum Status
{
    Active ,
    Inactive 
}