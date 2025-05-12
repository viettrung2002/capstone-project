using System.Security.Claims;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;
[Route("api/cart")]
[ApiController]
public class CartController (ICartService cartService, ILogger<CartController> logger) : ControllerBase
{
    [HttpPost]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> AddItemToCart([FromBody]ItemInCart item)
    {
        try
        { 
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var id = User.FindFirst("id")?.Value;
            logger.LogInformation("AddItemToCart: Username = {username}", username ?? "NULL");
            logger.LogInformation("AddItemToCart: Username = {id}", id ?? "NULL");
            foreach (var claim in User.Claims)
            {
                logger.LogInformation($"Claim Type: {claim.Type}, Value: {claim.Value}");
            }

            item.CustomerId = Guid.Parse(id);
            await cartService.AddItem(item);
            return Ok(new
            {
                message = "Success",
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> GetCart()
    {
        try
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            logger.LogInformation("GetCart: Username = {username}", username ?? "NULL");
            return Ok(new
            {
                data = await cartService.GetCart(username)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("{itemId:guid}")]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> DeleteCart(Guid itemId)
    {
        try
        {
            
            await cartService.RemoveItem(itemId);
            return Ok(new
            {
                message = "Success",
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("{itemId:guid}")]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> UpdateCart(Guid itemId, [FromQuery] int quantity)
    {
        try
        {
            await cartService.UpdateQuantity(itemId, quantity);
            return Ok(new
            {
                message = "Success",
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}