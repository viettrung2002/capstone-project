using System.ComponentModel.DataAnnotations;

namespace CoreBuyNow.Models.DTOs;

public class CartDto
{
    [Key]
    public Guid ItemId { get; set; }
    public int Quantity { get; set; }
    public Guid ProductId { get; set; }
    public string ProductName { get; set;}
    public Guid ShopId { get; set; }
    public string ShopName { get; set; }
    public decimal Price { get; set; }
    public string ProductImage { get; set; }
    public Guid VoucherId { get; set; }
    public Guid ShippingVoucherId { get; set; }
}