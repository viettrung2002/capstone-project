using CoreBuyNow.Models.Entities;
using CoreBuyNow.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;
[ApiController]
[Route("api/comment")]
public class CommentController (ICommentService service) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetCommentsByPage([FromQuery] int pageIndex, [FromQuery] int pageSize)
    {
        var comments = await service.GetCommentsByPage(pageIndex, pageSize);
        return Ok(comments);
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateComment(Comment comment)
    {
        try
        {
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
    public async Task<IActionResult> UpdateComment(Comment comment, Guid id)
    {
        try
        {
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
    
}