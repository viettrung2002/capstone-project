using System.ComponentModel.DataAnnotations;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Models.DTOs;

public class BillResponseDto
{
    public Guid BillId { set; get; }
    public string? ShopName { get; set; }
    public Guid ShopId { get; set; }
    public OrderStatus OrderStatus { get; set; }
    
    public Guid CustomerId { get; set; }
    public decimal TotalPrice { get; set; }
    public int Quantity { get; set; }
    public string? Note { get; set; }
    public List<ItemInBill>? Items { get; set; }
    public PaymentType PaymentType { get; set; }
    
}

public class BillInShopPage
{
    public Guid BillId { set; get; }
    public string? CustomerName { get; set; }
    public decimal TotalPrice { get; set; }
    public OrderStatus OrderStatus { get; set; }
    
    
}

public class BillRequestDto
{
    [StringLength(6), MinLength(6)] 
    [RegularExpression(@"^\d{6}$", ErrorMessage = "OTP must be exactly 6 digits.")]
    public string? Otp { get; set; }
    public Bill Bill { get; set; }
}