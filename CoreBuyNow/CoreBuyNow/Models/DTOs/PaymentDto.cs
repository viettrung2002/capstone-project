namespace CoreBuyNow.Models.DTOs;

public class PaymentRequestDto
{
        public int Amount { get; set; }
        public int OrderId { get; set; }
        public string Description { get; set; }
        public string ReturnUrl { get; set; }
        public string CancelUrl { get; set; }
}

public class PayOsResponseDto
{
        public decimal Amount { get; set; }
        public string Status { get; set; }
        public DateTime PaidTime { get; set; }
        public Guid UserId { get; set; }
}
