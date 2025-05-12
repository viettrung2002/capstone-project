using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Services.Interfaces;

public interface ICommentService
{
    Task AddComment (Comment comment);
    Task UpdateComment (Comment comment, Guid commentId);
    Task DeleteComment (Guid commentId);
    Task<PageResponseDto<CommentResponseDto>> GetCommentsByPage (int pageIndex, int pageSize, Guid productId, int? star);
    
    Task<Dictionary<int, int>> GetRating(Guid productId);
}