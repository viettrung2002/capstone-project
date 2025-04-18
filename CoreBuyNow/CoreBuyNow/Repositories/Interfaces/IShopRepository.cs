using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Repositories.Interfaces;

public interface IShopRepository
{
    Task CreateShop(Shop shop);
    Task<Shop?> GetShopById(Guid shopId);
    Task UpdateShop(Shop shop, Guid shopId);
    Task DeleteShop(Guid shopId);
}