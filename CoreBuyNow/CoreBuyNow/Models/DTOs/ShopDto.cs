using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Models.DTOs;

public class ShopDto
{
    [Required]
    [Key]
    public Guid ShopId { get; set; }
    [MaxLength(255)]
    [Required]
    public string? ShopName { get; set; }
    [MaxLength(2000)]
    [Required]    
    public string? Address { get; set; }
    public int ProductCount { get; set; }
    public DateTime CreatedDate { get; set; }
    public bool IsOfficial { get; set; }
    
}