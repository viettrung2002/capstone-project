using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CoreBuyNow.Models.Entities;

public class Transaction
{
    [Key]
    public Guid TransactionId { get; set; }
    public Guid WalletId { get; set; }
    [JsonIgnore]
    public Wallet? Wallet { get; set; }
    [Required]
    public TransactionType TransactionType { get; set; }
    [Required]
    public decimal Amount { get; set; }
    public decimal BalanceAfter { get; set; }
    [StringLength(200)]
    public string? Description { get; set; }
    public DateTime CreateDate { get; set; }
}

public enum TransactionType
{
    Deposit,
    Withdraw,
}