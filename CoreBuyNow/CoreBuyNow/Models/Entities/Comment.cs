using System.ComponentModel.DataAnnotations;

namespace CoreBuyNow.Models.Entities;

public class Comment
{
    [Key]
    public Guid CommentId { get; set; }
    [Required]
    public Guid CustomerId { get; set; }
    public Customer? Customer { get; set; }
    [Required]
    public Guid ProductId { get; set; }
    public Product? Product { get; set; }
    [StringLength(1000)]
    public string? Content { get; set; }
    public DateTime CreatedDate { get; set; }
    [Required]
    public int Rating { get; set; }
}