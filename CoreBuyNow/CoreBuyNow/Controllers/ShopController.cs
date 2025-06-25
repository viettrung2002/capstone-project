using CoreBuyNow.Models.Entities;
using CoreBuyNow.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
[ApiController]
[Route("/api/shop")]
public class ShopController (IShopService shopService) : ControllerBase {
    [HttpGet("official")]
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
    
    [HttpPut]
    public async Task<IActionResult> UpdateShop ([FromBody] Shop shop) {
        try
        {
            await shopService.UpdateShop(shop);
            return Ok(new{
                message = "Shop updated"
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
    
    [HttpGet()]
    [Authorize(Roles = "Shop")]
    public async Task<IActionResult> GetShop()
    {
        var shopId = User.FindFirst("id")?.Value;
        if (shopId == null) return Unauthorized();
        try
        {
            return Ok(new
            {
                data = await shopService.GetShop(Guid.Parse(shopId))
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpGet("statistic")]
    [Authorize(Roles = "Shop")]
    public async Task<IActionResult> GetDataStatistic(DateTime? startDate, DateTime? endDate)
    {
        var shopId = User.FindFirst("id")?.Value;
        if (shopId == null) return Unauthorized();
        try
        {
            return Ok(new
            {
                data = await shopService.GetDataStatistic(Guid.Parse(shopId), startDate, endDate)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}