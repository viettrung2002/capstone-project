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

    
}