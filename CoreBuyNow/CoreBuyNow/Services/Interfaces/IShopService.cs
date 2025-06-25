using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
namespace CoreBuyNow.Services.Interfaces;
public interface IShopService {
    Task<List<Shop>> GetOfficialShop();
    Task<Shop> GetShop(Guid shopId);
    Task<List<SubCategory?>> GetSubCategoryInShop(Guid shopId);
    Task UpdateShop(Shop shop);
    
    Task<decimal> TongDoanhThu(Guid shopId, DateTime? startDate, DateTime? endDate);
    
    Task<ShopStatisticResponseDto> GetDataStatistic(Guid shopId, DateTime? startDate, DateTime? endDate);
    
}