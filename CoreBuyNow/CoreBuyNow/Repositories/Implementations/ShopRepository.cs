using CoreBuyNow.Models;
using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

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
    public async Task<ShopResponseDto?> GetShopById(Guid id)
    {
        var ratingCount = dbContext.Comments.Include(p=>p.Product).Count(c => c.Product.ShopId == id);
        var rating = dbContext.Comments.Include(p=>p.Product).Where(c => c.Product.ShopId == id).Sum(c=>c.Rating);
        var categories = dbContext.Products
            .Include(p=>p.SubCategory)
            .Include(p=>p.Shop)
            .Where(p => p.Shop.ShopId == id)
            .Select(p=>p.SubCategory)
            .Distinct()
            .ToList();
            
        return await dbContext.Shops
            .Where(s => s.ShopId == id)
            .Select(s => new ShopResponseDto
            {
                ShopId = s.ShopId,
                ShopName = s.ShopName,
                Avatar = s.Avatar,
                Address = s.Address,
                ProductCount = s.ProductCount,
                CreatedDate = s.CreatedDate,
                IsOfficial = s.IsOfficial,
                Rating = (double)rating/ratingCount,
                RatingCount = ratingCount,
                Follower = 1000,
                Categories = categories,
            })
            .FirstOrDefaultAsync();

    }
}