using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreBuyNow.Models.Entities;

public class Product
{
    [Key]
    public Guid ProductId { get; set; }
    [Required]
    public string ProductName { get; set; }
    [Required]
    public Guid SubCategoryId { get; set; }
    public SubCategory? SubCategory { get; set; }
    public int Like { get; set; } 
    [Required]
    public Guid ShopId { get; set; }
    public Shop? Shop { get; set; }
    [Required]
    public decimal Price { get; set; }
    [Url]
    public string? MainImage { get; set; }
    [Url]
    public string? ExtraImage { get; set; }
    public int Sold { get; set; }
    [Required]
    public DateTime CreatedDate { get; set; }
    
    [Column(TypeName = "json")] 
    public Dictionary<string, string> Specifications { get; set; } = new ();
    public bool IsFlashSale { get; set; }
}