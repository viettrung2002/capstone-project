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

    public async Task<PageResponseDto<Comment>> GetCommentsByPage(int pageIndex, int pageSize)
    {
        return await commentRepository.GetComment(pageIndex, pageSize);
    }
}