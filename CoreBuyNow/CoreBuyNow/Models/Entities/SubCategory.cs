using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
    [JsonIgnore]
    [ForeignKey("CategoryId")]
    public Category? Category { get; set; }
    [JsonIgnore]
    public List<SubCategoryAttribute>? SubCategoriesAttributes { get; set; }
}