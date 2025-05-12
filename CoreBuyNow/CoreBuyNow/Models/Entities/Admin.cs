using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CoreBuyNow.Models.Entities;

public class Admin
{
    [Key]
    public Guid AdminId { get; set; }
    public Guid AccountId { get; set; }
    [ForeignKey("AccountId")]
    [JsonIgnore]
    public Account? Account { get; set; }
    public string Name { get; set; }
}