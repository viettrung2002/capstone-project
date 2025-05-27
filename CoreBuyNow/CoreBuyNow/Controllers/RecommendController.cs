using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Implementations;
using CoreBuyNow.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;
[ApiController]
[Route("/api/recommend")]
public class RecommendController (IProductRepository productRepository ,ICustomerRepository customerRepository, ILogger<RecommendController> logger) : ControllerBase
{
    [HttpPost]
    [Authorize(Roles = "Shop")]
    public async Task<IActionResult> AddProductAndVector(Product product)
    {
            var shopId = Guid.Parse(User.FindFirst("id")?.Value); 
            product.ShopId = shopId;
            await productRepository.AddProductAndVector(product);
            return Ok(new
            {
                message = "Product added",
            });
    }

    [HttpPost("record")]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> Record(Guid productId, ActionType action)
    {
        var customerId = Guid.Parse(User.FindFirst("id")?.Value);
        await customerRepository.RecordInteraction(customerId, productId, action);
        return Ok(new
        {
            message = "Record added",
        });
    }

    [HttpGet]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> RecommendForUser()
    {
        var customerId = Guid.Parse(User.FindFirst("id")?.Value);
        return Ok(new
        {
            data = await customerRepository.RecommendForUser(customerId)
        });
    }
}