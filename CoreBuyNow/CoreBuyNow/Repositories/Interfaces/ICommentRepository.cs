using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Repositories.Interfaces;

public interface ICommentRepository
{
    Task AddComment(Comment comment);
    Task UpdateComment(Comment comment, Guid commentId);
    Task DeleteComment(Guid commentId);
    Task<PageResponseDto<CommentResponseDto>> GetComment(int pageIndex, int pageSize, Guid productId, int? star);
    Task<Dictionary<int, int>> GetRating(Guid productId);
}