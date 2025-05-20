using CoreBuyNow.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
[ApiController]
[Route("/api/shop")]
public class ShopController (IShopService shopService) : ControllerBase {
    [HttpGet]
    public async Task<IActionResult> GetOfficialShop () {
        try
        {
            return Ok(new{
                data = await shopService.GetOfficialShop()
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("subcategory/{shopId:guid}")]
    public async Task<IActionResult> GetSubCategoryInShop (Guid shopId) {
        try
        {
            return Ok(new{
                data = await shopService.GetSubCategoryInShop(shopId)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("doanh-thu")]
    [Authorize(Roles = "Shop")]
    public async Task<IActionResult> TongDoanhThu(DateTime? startDate, DateTime? endDate)
    {
        var shopId = Guid.Parse(User.FindFirst("id")?.Value);
        try
        {
            return Ok(new
            {
                data = await shopService.TongDoanhThu(shopId, startDate, endDate)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpGet("sold")]
    [Authorize(Roles = "Shop")]
    public async Task<IActionResult> SoLuongDaBan(DateTime? startDate, DateTime? endDate)
    {
        var shopId = Guid.Parse(User.FindFirst("id")?.Value);
        try
        {
            return Ok(new
            {
                data = await shopService.SoLuongDaBan(shopId, startDate, endDate)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpGet("complete")]
    [Authorize(Roles = "Shop")]
    public async Task<IActionResult> TiLeHoanThanh(DateTime? startDate, DateTime? endDate)
    {
        var shopId = Guid.Parse(User.FindFirst("id")?.Value);
        try
        {
            return Ok(new
            {
                data = await shopService.TiLeHoanThanh(shopId, startDate, endDate)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpGet("most-product")]
    [Authorize(Roles = "Shop")]
    public async Task<IActionResult> TopSanPham(bool sort)
    {
        var shopId = Guid.Parse(User.FindFirst("id")?.Value);
        try
        {
            return Ok(new
            {
                data = await shopService.TopSanPham(shopId, sort)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}