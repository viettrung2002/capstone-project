using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreBuyNow.Models.Entities;

public class Voucher
{
    [Key]
    public Guid VoucherId { get; set; }
    [StringLength(500)]
    public string VoucherName { get; set; } = string.Empty;
    [Required]
    public DateTime StartTime { get; set; }
    [Required]
    public DateTime EndTime { get; set; }
    [Required]
    public int Value { get; set; }
    [Required]
    public int Quantity { get; set; }

    public decimal MinPrice { get; set; } = 0;
    public Guid? ShopId { get; set; }
    [ForeignKey("ShopId")]
    public Shop? Shop { get; set; }
    public Guid? AdminId { get; set; }
    [ForeignKey("AdminId")]
    public Admin? Admin { get; set; }
    public Role Role { get; set; }
    public bool IsIssued { get; set; }
    public int PerUserQuantity { get; set; }
}

public enum Role
{
    Shipping,
    Product
}