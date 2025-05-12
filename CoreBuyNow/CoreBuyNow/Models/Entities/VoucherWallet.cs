using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoreBuyNow.Models.Entities;

public class VoucherWallet
{
    [Key]
    public Guid VoucherWalletId { get; set; }
    [Required]
    public Guid CustomerId { get; set; }
    [ForeignKey("CustomerId")]
    public Customer? Customer { get; set; }
    public int Quantity { get; set; }
    public Guid VoucherId { get; set; }
    public Voucher? Voucher { get; set; }
}