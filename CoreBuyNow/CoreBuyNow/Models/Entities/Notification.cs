using System.ComponentModel.DataAnnotations;

namespace CoreBuyNow.Models.Entities;

public class Notification
{
    [Key]
    public Guid NotificationId {set;get;}
    [Required]
    public Guid UserId {set;get;}
    public DateTime CreatedDate {set;get;}
    [StringLength(500)]
    public string? Title {set;get;}
    [StringLength(3000)]
    public string? Content {set;get;}
    public bool Read {set;get;}
    [Required]
    public Guid BillId {set;get;}
}