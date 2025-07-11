﻿using System.Text.Json;
using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;

[ApiController]
[Route("/api/product")]
public class ProductController (IProductService productService, ILogger<ProductController> logger) : ControllerBase
{
    [HttpGet("attribute/{id:guid}")]
    public async Task<IActionResult> GetSubcategoryAttribute(Guid id)
    {
        var subCategoryAttribute = await productService.GetProductAttributeByIdAsync(id);
        return Ok(subCategoryAttribute);
    }

    [HttpPost("add")]
    [Authorize(Roles = "Shop")]
    public async Task<IActionResult> AddProduct(Product product)
    {
        var id = Guid.Parse(User.FindFirst("id")?.Value);
        try
        {
            product.ShopId = id;
            await productService.AddProduct(product);
            return Ok(new
            {
                message = "Product created successfully"
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpPost("add2")]
    [Authorize(Roles = "Shop")]
    public async Task<IActionResult> AddProduct2(
        [FromForm] string product,
        [FromForm] IFormFile mainImage,
        [FromForm] List<IFormFile> extraImages)
    {
        logger.LogInformation("Product da duoc nhan thanh json {obj}", product);
        Product? productObj;
        try
        {
            productObj = JsonSerializer.Deserialize<Product>(product, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            
            logger.LogInformation("Product da duoc chuyen thanh json {obj}", productObj.ToString());
        }
        catch (Exception ex)
        {
            return BadRequest($"Không thể parse object product: {ex.Message}");
        }
        
        if (productObj == null) return BadRequest("Product object rỗng");
        productObj.MainImage = "";
        var id = User.FindFirst("id")?.Value;
        if (id == null) return Unauthorized();
        try
        {
            productObj.ShopId = Guid.Parse(id);
            await productService.AddProduct(productObj, mainImage, extraImages);
            return Ok(new
            {
                message = "Product created successfully"
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
       
        
    }

    [HttpPut("update/{id:guid}")]
    [Authorize(Roles = "Shop")]
    public async Task<IActionResult> UpdateProduct(Product product, Guid id)
    {
        await productService.UpdateProduct(product,id);
        return Ok(new
        {
            message = "Product updated"
        });
    }

    [HttpDelete("delete/{id:guid}")]
    [Authorize(Roles = "Shop")]
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
    [Authorize(Roles = "Customer, Shop")]
    public async Task<IActionResult> GetProduct(Guid id) => Ok(await productService.GetProductById(id));
    
    [HttpPost("search")]
    
    public async Task<IActionResult> GetProduct(ProductFilterDto filter)
    {
        try
        {
            return Ok(new
            {
                data = await productService.GetProductByPage(filter)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("category/{id:guid}")]
    
    public async Task<IActionResult> GetSubCategory(Guid id)
    {
        try
        {
            return Ok(new
            {
                data = await productService.GetSubCategory(id),
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet("categories")]
    
    public async Task<IActionResult> GetSubCategory()
    {
        try
        {
            return Ok(new
            {
                data = await productService.GetSubCategories(),
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}