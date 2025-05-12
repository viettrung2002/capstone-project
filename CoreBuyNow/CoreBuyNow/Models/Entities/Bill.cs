using System.ComponentModel.DataAnnotations;

namespace CoreBuyNow.Models.Entities;

public class Bill
{
    [Key]
    public Guid BillId { get; set; }
    [Required]
    public Guid CustomerId { get; set; }
    public Customer? Customer { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    [Required]
    public decimal TotalPrice { get; set; }
    public DateTime CreateDate { get; set; }
    
    public Guid ItemInCartId { get; set; }
    public Guid ShippingVoucherId { get; set;}
    public Guid ShopVoucherId { get; set; }
    public Guid VoucherId { get; set; }
    public List<ItemInBill>? Items { get; set; }
    
}

public enum OrderStatus
{
    Pending,
    Confirmed,
    Shipped,
    Completed,
    Cancelled
}

public class ItemInBill
{
    
    [Key]
    public Guid ItemId { get; set; }
    public Guid BillId { get; set; }
    public Bill? Bill { get; set; }
    [Required]
    public Guid ProductId { get; set; }
    public Product? Product { get; set; }
    public decimal UnitPrice { get; set; }
    [Required]
    public int Quantity { get; set; }

}