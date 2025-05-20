namespace CoreBuyNow.Models.Entities;

public class Wallet
{
    public Guid WalletId { get; set; }
    public Guid UserId { get; set; }
    public Shop? Shop { get; set; }
    public Customer? Customer { get; set; }
    public decimal Balance { get; set; }
    public DateTime UpdateDate { get; set; }
    
}