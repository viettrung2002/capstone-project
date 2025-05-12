using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Interfaces;

namespace CoreBuyNow.Services.Implementations;

public class CommentService (ICommentRepository commentRepository) : ICommentService
{
    public async Task AddComment(Comment comment)
    {
        await commentRepository.AddComment(comment);
    }

    public async Task UpdateComment(Comment comment, Guid commentId)
    {
        await commentRepository.UpdateComment(comment, commentId);
    }

    public async Task DeleteComment(Guid commentId)
    {
        await commentRepository.DeleteComment(commentId);
    }

    public async Task<PageResponseDto<CommentResponseDto>> GetCommentsByPage(int pageIndex, int pageSize, Guid productId, int? star)
    {
        return await commentRepository.GetComment(pageIndex, pageSize, productId, star);
    }

    public async Task<Dictionary<int, int>> GetRating(Guid productId)
    {
        return await commentRepository.GetRating(productId);
    }
}