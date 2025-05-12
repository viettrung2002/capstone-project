namespace CoreBuyNow.Models.Entities;

public class CustomerInteraction
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ProductId { get; set; }
    public bool IsPurchase { get; set; }
    public Customer Customer { get; set; }
    public Product Product { get; set; }
}