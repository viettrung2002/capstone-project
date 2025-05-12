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

public class ShopResponseDto
{
    public Guid ShopId {set; get;}
    public string? ShopName {set; get;}
    public string? Avatar {set; get;}
    public string? Address {set; get;}
    public int ProductCount {set; get;}
    public DateTime CreatedDate {set; get;}
    public bool IsOfficial {set; get;}
    public double Rating {set; get;}
    public int RatingCount {set; get;}
    public int Follower {set; get;}
    public List<SubCategory>? Categories {set; get;}
}