using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreBuyNow.Models.Entities;

public class SubCategory
{
    [Key]
    public Guid SubCategoryId { get; set; }
    [Required]
    [StringLength(300)]
    public string? SubCategoryName { get; set; }
    [Required]
    public Guid CategoryId { get; set; }
    [ForeignKey("CategoryId")]
    public Category? Category { get; set; }
    public List<SubCategoryAttribute>? SubCategoriesAttributes { get; set; }
}