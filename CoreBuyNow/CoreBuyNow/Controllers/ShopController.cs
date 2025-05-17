using CoreBuyNow.Services.Interfaces;
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
}