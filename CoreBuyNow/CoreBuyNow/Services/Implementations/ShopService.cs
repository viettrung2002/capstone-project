using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Interfaces;
namespace CoreBuyNow.Services.Implementations;
public class ShopService (IShopRepository shopRepository) : IShopService
{
    public async Task<List<Shop>> GetOfficialShop()
    {
        return await shopRepository.GetOfficialShop();
    }

    public async Task<List<SubCategory?>> GetSubCategoryInShop(Guid shopId)
    {
        return await shopRepository.GetSubCategoryInShop(shopId);
    }

    public async Task<decimal> TongDoanhThu(Guid shopId, DateTime? startDate, DateTime? endDate)
    {
        return await shopRepository.TongDoanhThu(shopId, startDate, endDate);
    }

    public async Task<int> SoLuongDaBan(Guid shopId, DateTime? startDate, DateTime? endDate)
    {
        return await shopRepository.SoLuongDaBan(shopId, startDate, endDate);
    }

    public async Task<double> TiLeHoanThanh(Guid shopId, DateTime? startDate, DateTime? endDate)
    {
        return await shopRepository.TiLeHoanThanh(shopId, startDate, endDate);
    }

    public async Task<List<Product>> TopSanPham(Guid shopId, bool sort)
    {
        return await shopRepository.TopSanPham(shopId, sort);
    }
}