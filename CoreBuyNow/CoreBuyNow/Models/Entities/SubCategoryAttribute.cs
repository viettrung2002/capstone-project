using System.ComponentModel.DataAnnotations.Schema;

namespace CoreBuyNow.Models.Entities;

public class SubCategoryAttribute
{
    
    public Guid SubcategoryId { get; set; }
    [ForeignKey("SubcategoryId")]
    public SubCategory SubCategory { get; set; }

    public Guid AttributeId { get; set; }
    [ForeignKey("AttributeId")]
    public ProductAttribute ProductAttribute { get; set; }
}