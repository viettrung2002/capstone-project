using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Models.DTOs;

public class BillResponseDto
{
    public Guid BillId { set; get; }
    public string? ShopName { get; set; }
    public Guid ShopId { get; set; }
    public OrderStatus OrderStatus { get; set; }
    public decimal TotalPrice { get; set; }
    public int Quantity { get; set; }
    
    public List<ItemInBill>? Items { get; set; }
    
}