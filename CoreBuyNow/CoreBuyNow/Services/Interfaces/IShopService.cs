using CoreBuyNow.Models.Entities;
namespace CoreBuyNow.Services.Interfaces;
public interface IShopService {
    Task<List<Shop>> GetOfficialShop();
    Task<List<SubCategory?>> GetSubCategoryInShop(Guid shopId);
}