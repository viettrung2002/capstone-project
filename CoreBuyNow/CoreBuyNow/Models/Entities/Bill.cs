using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CoreBuyNow.Models.Entities;

public class Bill
{
    [Key]
    public Guid BillId { get; set; }
    [Required]
    public Guid CustomerId { get; set; }
    public Customer? Customer { get; set; }
    
    public Guid ShopId { get; set; }
    public Shop? Shop { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    [Required]
    public decimal TotalPrice { get; set; }
    public DateTime CreateDate { get; set; }
    
    public Guid ItemInCartId { get; set; }
    public Guid ShippingVoucherId { get; set;}
    public Guid ShopVoucherId { get; set; }
    public Guid VoucherId { get; set; }
    public List<ItemInBill> Items { get; set; } = [];
    [StringLength(1500)]
    public string? Note { get; set; }
    public Guid AddressId { get; set; }
    public Address? Address { get; set; }
    public PaymentType PaymentType { get; set; } = PaymentType.Cod;
}

public enum OrderStatus
{
    Pending,
    Confirmed,
    Shipped,
    Completed,
    Cancelled
}

public enum PaymentType
{
    Cod,
    Wallet
}
public class ItemInBill
{
    
    [Key]
    public Guid ItemId { get; set; }
    public Guid BillId { get; set; }
    [JsonIgnore]
    public Bill? Bill { get; set; }
    [Required]
    public Guid ProductId { get; set; }

    public string? ProductName { set; get; }
    public string? Image { set; get; }
    [JsonIgnore]
    public Product? Product { get; set; }
    public decimal UnitPrice { get; set; }
    [Required]
    public int Quantity { get; set; }

}