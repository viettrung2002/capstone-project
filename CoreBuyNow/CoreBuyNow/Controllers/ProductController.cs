using CoreBuyNow.Models.Entities;
using CoreBuyNow.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;

[ApiController]
[Route("/api/product")]
public class ProductController (IProductService productService) : ControllerBase
{
    [HttpGet("attribute/{id:guid}")]
    public async Task<IActionResult> GetSubcategoryAttribute(Guid id)
    {
        var subCategoryAttribute = await productService.GetProductAttributeByIdAsync(id);
        return Ok(subCategoryAttribute);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddProduct(Product product)
    {
        await productService.AddProduct(product);
        return Ok();
    }

    [HttpPut("update/{id:guid}")]
    public async Task<IActionResult> UpdateProduct(Product product, Guid id)
    {
        await productService.UpdateProduct(product,id);
        return Ok(new
        {
            message = "Product updated"
        });
    }

    [HttpDelete("delete/{id:guid}")]
    public async Task<IActionResult> DeleteProduct(Guid id)
    {
        try
        {
            await productService.DeleteProduct(id);
            return Ok(new
            {
                message = "Product deleted"
            });
        }
        catch (InvalidOperationException e)
        {
            return BadRequest(e.Message);
        }
        
    }
    
    [HttpGet("get/{id:guid}")]
    public async Task<IActionResult> GetProduct(Guid id) => Ok(await productService.GetProductById(id));
    
}