using CoreBuyNow.Models;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;

namespace CoreBuyNow.Repositories.Implementations;

public class ShopRepository (AppDbContext dbContext) : IShopRepository
{
    public async Task CreateShop(Shop shop)
    {
        if (string.IsNullOrEmpty(shop.ShopName))
        {
            throw new AggregateException("Enter your shop name!");
        }
        if (shop.ShopId == Guid.Empty) shop.ShopId = Guid.NewGuid();
        shop.CreatedDate = DateTime.Now;
        dbContext.Shops.Add(shop);
        await dbContext.SaveChangesAsync();
    }
    public async Task UpdateShop(Shop shop, Guid id)
    {
        var existingShop = await dbContext.Shops.FindAsync(id);
        if (existingShop == null) throw new AggregateException("Enter your shop id!");
        existingShop.ShopName = shop.ShopName;  
        existingShop.Address = shop.Address;
        existingShop.ProductCount = shop.ProductCount;
        dbContext.Shops.Update(existingShop);
        await dbContext.SaveChangesAsync();
    }

    public async Task DeleteShop(Guid id)
    {
        var existingShop = await dbContext.Shops.FindAsync(id);
        if (existingShop == null)
        {
            throw new AggregateException("Enter your shop id!");
        }
        dbContext.Shops.Remove(existingShop);
        await dbContext.SaveChangesAsync();
    }
    public async Task<Shop?> GetShopById(Guid id)
    {
        return await dbContext.Shops.FindAsync(id);
    }
}