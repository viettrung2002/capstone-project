using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Services.Interfaces;

public interface ICommentService
{
    Task AddComment (Comment comment);
    Task UpdateComment (Comment comment, Guid commentId);
    Task DeleteComment (Guid commentId);
    Task<PageResponseDto<Comment>> GetCommentsByPage (int pageIndex, int pageSize);
}