using CoreBuyNow.Models;
using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoreBuyNow.Repositories.Implementations;

public class CommentRepository (AppDbContext dbContext) : ICommentRepository
{
    public async Task AddComment(Comment comment)
    {
        if (comment.Rating == 0)
        {
            throw new Exception("Rating is required!");
        }
        if (comment.CommentId == Guid.Empty)
        {
            comment.CommentId = Guid.NewGuid();
        }
        if (comment.ProductId == Guid.Empty)
        {
            throw new Exception("Comment Id is required!");
        }
        
        comment.CreatedDate = DateTime.Now;
        dbContext.Comments.Add(comment);
        await dbContext.SaveChangesAsync();
    }

    public async Task UpdateComment(Comment comment, Guid commentId)
    {
        var commentToUpdate = await dbContext.Comments.FindAsync(commentId);
        if (commentToUpdate == null)
        {
            throw new Exception("Comment not found!");
        }
        commentToUpdate.Rating = comment.Rating;
        commentToUpdate.Content = comment.Content;
        dbContext.Comments.Update(commentToUpdate);
        await dbContext.SaveChangesAsync();
    }

    public async Task DeleteComment(Guid commentId)
    {
        var commentToDelete = await dbContext.Comments.FindAsync(commentId);
        if (commentToDelete == null) throw new Exception("Comment not found!");
        dbContext.Comments.Remove(commentToDelete);
        await dbContext.SaveChangesAsync();
    }

    public async Task<PageResponseDto<Comment>> GetComment(int pageIndex, int pageSize)
    {
        return new PageResponseDto<Comment>(
            pageIndex,
            pageSize,
            await dbContext.Comments.CountAsync(),
            await dbContext.Comments
                .OrderByDescending(c => c.CreatedDate)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync()
        );
    }
}