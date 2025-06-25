using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Interfaces;
namespace CoreBuyNow.Services.Implementations;
public class ShopService (IShopRepository shopRepository, IAddressRepository addressRepository) : IShopService
{
    public async Task<List<Shop>> GetOfficialShop()
    {
        return await shopRepository.GetOfficialShop();
    }

    public async Task<Shop> GetShop(Guid shopId)
    {
        return await shopRepository.GetShop(shopId);
    }

    public async Task<List<SubCategory?>> GetSubCategoryInShop(Guid shopId)
    {
        return await shopRepository.GetSubCategoryInShop(shopId);
    }

    public async Task UpdateShop(Shop shop)
    {
        await shopRepository.UpdateShop(shop, shop.ShopId);
    }

    public async Task<decimal> TongDoanhThu(Guid shopId, DateTime? startDate, DateTime? endDate)
    {
        return await shopRepository.TongDoanhThu(shopId, startDate, endDate);
    }

   
    public async Task<ShopStatisticResponseDto> GetDataStatistic(Guid shopId, DateTime? startDate, DateTime? endDate)
    {
            return new ShopStatisticResponseDto
            {
                Revenue = await shopRepository.TongDoanhThu(shopId, startDate, endDate),
                Sold = await shopRepository.SoLuongDaBan(shopId, startDate, endDate),
                CompletionRate = await shopRepository.TiLeHoanThanh(shopId, startDate, endDate),
                Products = await shopRepository.TopSanPham(shopId, true, startDate, endDate)
            };
        
    }
}