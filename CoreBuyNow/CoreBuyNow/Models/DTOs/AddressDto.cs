using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Models.DTOs;

public class AddressResponseDto
{
     public Guid AddressId { get; set; }
     public string StreetAddress { get; set; }
     public string Name { get; set; }
     public string PhoneNumber { get; set; }
     public Province Province { get; set; }
     public District District { get; set; }
     public Ward Ward { get; set; }
     public bool IsDefault { get; set; }
}