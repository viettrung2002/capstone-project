namespace CoreBuyNow.Models.DTOs;

public class CommentResponseDto
{
    public Guid CommentId { get; set; }
    public string? CustomerName { get; set; }
    public DateTime CreateDate { get; set; }
    public string? Content { get; set; }
    public int Rating { get; set; }
}
