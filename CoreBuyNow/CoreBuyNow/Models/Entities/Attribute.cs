using System.ComponentModel.DataAnnotations;

namespace CoreBuyNow.Models.Entities;

public class ProductAttribute
{
    [Key]
    public Guid AttributeId { get; set; }
    [Required]
    public string AttributeName { get; set; }
    public DataType DataType { get; set; }
    [Required]
    public string Unit { get; set; }
    public List<SubCategoryAttribute> SubCategoriesAttributes { get; set; }
}

public enum DataType
{
    String,
    Integer,
    Boolean,
}