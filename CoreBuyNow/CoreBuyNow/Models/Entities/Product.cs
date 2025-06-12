using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CoreBuyNow.Models.Entities;

public class Product
{
    [Key]
    public Guid ProductId { get; set; }
    [Required]
    public string ProductName { get; set; }
    [Required]
    public Guid SubCategoryId { get; set; }
    [JsonIgnore]
    public SubCategory? SubCategory { get; set; }
    public int Like { get; set; } 
    [Required]
    public Guid ShopId { get; set; }
    [JsonIgnore]
    public Shop? Shop { get; set; }
    [Required]
    public decimal Price { get; set; }
    [Url]
    public string? MainImage { get; set; }
    [Url]
    public string? ExtraImage { get; set; }
    
    
    public string? Description { get; set; }
    
    public int Inventory { get; set; }
    public int Sold { get; set; }
    [Required]
    public DateTime CreatedDate { get; set; }
    public int Rating { get; set; }
    [Range(0, 100, ErrorMessage = "Price must be between 0 and 100.")]
    public int Discount { get; set; } = 0;
    [Column(TypeName = "json")] 
    public Dictionary<string, string> Specifications { get; set; } = new ();
    public bool IsFlashSale { get; set; }
    
    [Column(TypeName = "json")]
    public double[] Vector { get; set; } = [];
}