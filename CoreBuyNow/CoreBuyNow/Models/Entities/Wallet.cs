using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CoreBuyNow.Models.Entities;

public class Wallet
{
    public Guid WalletId { get; set; }
    public Guid UserId { get; set; }
    public Shop? Shop { get; set; }
    public Customer? Customer { get; set; }
    public decimal Balance { get; set; }
    public DateTime UpdateDate { get; set; }
    public string WalletNumber { get; set; }
    [JsonIgnore]
    [StringLength(6), MinLength(6)] 
    [RegularExpression(@"^\d{6}$", ErrorMessage = "OTP must be exactly 6 digits.")]
    public string Otp { get; set; } = "0000000";


}