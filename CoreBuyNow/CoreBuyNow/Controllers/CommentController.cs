using CoreBuyNow.Models.Entities;
using CoreBuyNow.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;
[ApiController]
[Route("api/comment")]
public class CommentController (ICommentService service) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetCommentsByPage([FromQuery] int pageIndex, [FromQuery] int pageSize,
        Guid productId, int? star)
    {
        try
        {
            var comments = await service.GetCommentsByPage(pageIndex, pageSize, productId, star);
            return Ok(comments);

        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }


    [HttpPost("create")]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> CreateComment(Comment comment)
    {
        try
        {
            comment.CustomerId = Guid.Parse(User.FindFirst("id")?.Value);
            await service.AddComment(comment);
            return Ok(new
            {
                message = "Comment has been added!",
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("update/{id:guid}")]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> UpdateComment(Comment comment, Guid id)
    {
        try
        {
            comment.CustomerId = Guid.Parse(User.FindFirst("id")?.Value);
            await service.UpdateComment(comment, id);
            return Ok(new
            {
                message = "Comment has been updated!",
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("delete/{id:guid}")]
    public async Task<IActionResult> DeleteComment(Guid id)
    {
        try
        {
            await service.DeleteComment(id);
            return Ok(new
            {
                message = "Comment has been deleted!",
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("star/{id:guid}")]
    public async Task<IActionResult> GetStarComments(Guid id)
    {
        try
        {
            return Ok( new
            {
                data = await service.GetRating(id)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
}