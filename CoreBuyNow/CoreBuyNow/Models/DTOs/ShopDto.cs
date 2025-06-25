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
   
    [Required]    
    
    public Address? Address { get; set; }
    public int ProductCount { get; set; }
    public DateTime CreatedDate { get; set; }
    public bool IsOfficial { get; set; }
    
}

public class ShopResponseDto
{
    public Guid ShopId {set; get;}
    public string? ShopName {set; get;}
    public string? Avatar {set; get;}
    public Guid AddressId {set; get;}
    public int ProductCount {set; get;}
    public DateTime CreatedDate {set; get;}
    public bool IsOfficial {set; get;}
    public double Rating {set; get;}
    public int RatingCount {set; get;}
    public int Follower {set; get;}
    public List<SubCategory>? Categories {set; get;}
}

public class ShopStatisticResponseDto
{
    public decimal Revenue { get; set; }
    public int Sold { get; set; }
    public double CompletionRate {set; get;}
    public List<ProductInStatisticResponseDto>? Products { get; set; }
}