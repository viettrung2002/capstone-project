using CoreBuyNow.Models.Entities;
namespace CoreBuyNow.Services.Interfaces;
public interface IShopService {
    Task<List<Shop>> GetOfficialShop();
    Task<List<SubCategory?>> GetSubCategoryInShop(Guid shopId);
    
    Task<decimal> TongDoanhThu(Guid shopId, DateTime? startDate, DateTime? endDate);
    Task<int> SoLuongDaBan(Guid shopId, DateTime? startDate, DateTime? endDate);
    Task<double> TiLeHoanThanh(Guid shopId, DateTime? startDate, DateTime? endDate);
    Task<List<Product>> TopSanPham(Guid shopId, bool sort);
    
}