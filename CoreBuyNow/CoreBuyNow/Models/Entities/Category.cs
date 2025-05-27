using System.ComponentModel.DataAnnotations;

namespace CoreBuyNow.Models.Entities;

public class Category
{
    [Key]
    public Guid CategoryId { get; set; }
    [Required]
    [StringLength(500)]
    public string? CategoryName { get; set; }
    public List<SubCategory>? SubCategories { get; set; }
    [StringLength(500)]
    public string? ImageUrl { get; set; }
}