using System.ComponentModel.DataAnnotations;

namespace CoreBuyNow.Models.Entities;

public class Image
{
    [Key]
    public Guid ImageId { get; set; }
    public Guid ProductId { get; set; }
    public Product? Product { get; set; }
    public string? ImageUrl { get; set; }
}