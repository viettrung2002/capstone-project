using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Models.DTOs;


    public class VoucherDto
    {
        public Guid VoucherId { get; set; }
        public string VoucherName { get; set; } = string.Empty;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Value { get; set; }
        public int Quantity { get; set; }
        public decimal MinPrice { get; set; }
        public Guid? ShopId { get; set; }
        public string? ShopName { get; set; }
        public Guid? AdminId { get; set; }
        public string? AdminName { get; set; }
        public Role Role { get; set; }
    }

    public class VoucherWalletResponseDto
    {
        public Guid VoucherWalletId { get; set; }
        public Guid CustomerId { get; set; }
        public int Quantity { get; set; }
        public Guid VoucherId { get; set; }
        public Voucher? Voucher { get; set; }
    }
