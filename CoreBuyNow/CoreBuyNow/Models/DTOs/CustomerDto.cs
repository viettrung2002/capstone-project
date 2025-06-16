using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Models.DTOs;

public class CustomerDto
{
    [Key]
    public Guid CustomerId { get; set; }
    [Required]
    [MaxLength(255)]
    public string? CustomerName { get; set; }
    [MaxLength(2005)]
    public string? Address { get; set; }
    [Phone]
    [MaxLength(10)]
    public string? PhoneNumber { get; set; }
    public bool Gender { get; set; }
    public DateTime BirthDay { get; set; }
    
}

