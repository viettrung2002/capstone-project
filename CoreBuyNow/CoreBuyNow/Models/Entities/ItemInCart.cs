using System.ComponentModel.DataAnnotations;

namespace CoreBuyNow.Models.Entities;

public class ItemInCart
{
    [Key]
    public Guid ItemId { get; set; }
    [Required]
    public Guid ProductId { get; set; }
    public Product? Product { get; set; }
    public Guid VoucherId { get; set; }
    [Required]
    public Guid CustomerId { get; set; }
    public Customer? Customer { get; set; }
    public Guid ShippingVoucherId { get; set; }
    [Required]
    public int Quantity { get; set; }
}