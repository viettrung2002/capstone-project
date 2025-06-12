using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Models.DTOs;

public class AdminDto
{
    public int ShopCount {set; get;}
    public int ProductCount {set; get;}
    public int BillCount {set; get;}
    public int CustomerCount {set; get;}
    public decimal Revenue {set; get;}
}

public class ShopInAdminResponse
{
    public Guid ShopId { get; set; }
    public string? Avatar { get; set; }
    public string? ShopName { get; set; }
    public int ProductCount { get; set; }
    public int BillCount { get; set; }
    public decimal Revenue { get; set; }
    public Status Status { get; set; }
}

public class CustomerInAdminResponse

{
    public Guid? AccountId { get; set; }
    public Guid CustomerId { get; set; }
    public string? Avatar { get; set; }
    public string? CustomerName { get; set; }
    public string? PhoneNumber { get; set; }
    public decimal TotalSpending { get; set; }
    public int CompleteOrderCount { get; set; }
    
}