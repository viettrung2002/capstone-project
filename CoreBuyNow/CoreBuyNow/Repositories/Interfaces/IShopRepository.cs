using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Repositories.Interfaces;

public interface IShopRepository
{
    Task CreateShop(Shop shop);
    Task<ShopResponseDto?> GetShopById(Guid shopId);
    Task UpdateShop(Shop shop, Guid shopId);
    Task DeleteShop(Guid shopId);

    Task<List<Shop>> GetOfficialShop();

    Task<List<SubCategory?>> GetSubCategoryInShop(Guid shopId);
    
    Task<decimal> TongDoanhThu(Guid shopId, DateTime? startDate, DateTime? endDate);
    Task<int> SoLuongDaBan(Guid shopId, DateTime? startDate, DateTime? endDate);
    Task<double> TiLeHoanThanh(Guid shopId, DateTime? startDate, DateTime? endDate);
    Task<List<Product>> TopSanPham (Guid shopId, bool sort);
    
    
    
}