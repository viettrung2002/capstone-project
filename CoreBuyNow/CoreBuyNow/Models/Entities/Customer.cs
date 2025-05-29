using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CoreBuyNow.Models.Entities;

public class Customer
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
    [Required]
    public Guid? AccountId { get; set; }
    [ForeignKey("AccountId")]
    [JsonIgnore]
    public Account? Account { get; set; }
    public List<Interaction> Interactions { get; set; }

    public double[] Vector { get; set; } = [];

}