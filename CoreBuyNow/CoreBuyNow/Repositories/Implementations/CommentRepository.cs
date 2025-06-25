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
        var product = dbContext.Products.FirstOrDefault(p => p.ProductId == comment.ProductId);
        if (product == null) throw new Exception("Product not found!");
        var count = dbContext.Comments.Count(c => c.ProductId == comment.ProductId);
        product.Rating = (product.Rating * count + comment.Rating)/(count + 1); 
        dbContext.Products.Update(product);
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

    public async Task<PageResponseDto<CommentResponseDto>> GetComment(int pageIndex, int pageSize, Guid productId, int? star)
    {

        
        if (star < 0 | star > 5) throw new Exception("Star must be between 1 and 5!");
        if (star > 0 )
        {
            return new PageResponseDto<CommentResponseDto>(
                pageIndex,
                pageSize,
                await dbContext.Comments.CountAsync(p=>p.ProductId == productId && p.Rating == star),
                await dbContext.Comments
                    .Include(p => p.Customer)
                    .Where(c => c.ProductId == productId && c.Rating == star)
                    .Select(c=> new CommentResponseDto
                    {
                        CommentId = c.CommentId,
                        CustomerName = c.Customer.CustomerName,
                        CreateDate = c.CreatedDate,
                        Content = c.Content,
                        Rating = c.Rating
                    })
                    .OrderByDescending(c => c.CreateDate)
                    .Skip((pageIndex - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync()
            );
        }  
        return new PageResponseDto<CommentResponseDto>(
            pageIndex,
            pageSize,
            await dbContext.Comments.CountAsync(p=>p.ProductId == productId),
            await dbContext.Comments
                .Include(p => p.Customer)
                .Where(c => c.ProductId == productId)
                .Select(c=> new CommentResponseDto
                {
                    CommentId = c.CommentId,
                    CustomerName = c.Customer.CustomerName,
                    CreateDate = c.CreatedDate,
                    Content = c.Content,
                    Rating = c.Rating
                })
                .OrderByDescending(c => c.CreateDate)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync()
        );
    }

    public async Task<Dictionary<int, int>> GetRating(Guid productId)
    {
        var rating = await dbContext.Comments
            .Where(c => c.ProductId == productId)
            .GroupBy(c => c.Rating)
            .Select(g=>new {Star = g.Key, Count = g.Count()})
            .ToDictionaryAsync(c => c.Star, c => c.Count);
        
        for (int i = 1; i <= 5; i++)
        {
            if (!rating.ContainsKey(i))
                rating[i] = 0;
        }
        return rating;
    }
}