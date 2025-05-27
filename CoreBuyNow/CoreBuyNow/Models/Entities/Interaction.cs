using System.ComponentModel.DataAnnotations;

namespace CoreBuyNow.Models.Entities;

public class Interaction
{
    [Key]
    public Guid InteractionId { get; set; }
    public Guid UserId { get; set; } // Ví dụ: Id từ Identity
    public Guid ProductId { get; set; }
    public Product Product { get; set; }
    public ActionType Action { get; set; } // "View", "Purchase", "Like"
    public DateTime Timestamp { get; set; }
}

public enum ActionType
{
    View,
    Purchase,
    Like
}