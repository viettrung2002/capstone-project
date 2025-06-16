using CoreBuyNow.Models;
using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoreBuyNow.Repositories.Implementations;

public class CartRepository (AppDbContext dbContext) : ICartRepository
{
    public async Task AddItem(ItemInCart item)
    {
        if (item.ItemId == Guid.Empty)
        {
            item.ItemId = Guid.NewGuid();
        }
        var product = await dbContext.Products.FindAsync(item.ProductId);
        if (product == null) throw new Exception("Product not found");
        if (product.Inventory < item.Quantity) throw new Exception("Not enough inventory");
        var item1 = dbContext.ItemInCarts.FirstOrDefault(x => x.ProductId == item.ProductId && x.CustomerId == item.CustomerId);
        if (item1 == null)
        {
            if (item.Quantity == 0 ) item.Quantity = 1;
            dbContext.Add(item);
        }
        else
        {
            if (item.Quantity == 0)
            {
                item1.Quantity += 1;
            }
            else
                item1.Quantity += item.Quantity;
            dbContext.Update(item1);
        }
        await dbContext.SaveChangesAsync();
    }

    public async Task UpdateQuantity(Guid id, int quantity)
    {
        var item = await dbContext.ItemInCarts.FindAsync(id);
        if (item == null) throw new Exception("Item not found");
        if (quantity == 0)
        {
            dbContext.ItemInCarts.Remove(item);
        }
        else
        {
            item.Quantity = quantity;
        }
        await dbContext.SaveChangesAsync();
    }

    public async Task RemoveItem(Guid id)
    {
        var item = await dbContext.ItemInCarts.FindAsync(id);
        if (item == null) throw new Exception("Item not found");
        dbContext.ItemInCarts.Remove(item);
        await dbContext.SaveChangesAsync();
    }

    public async Task<List<CartDto>> GetItemInCarts(string username)
    {

        var customerId = dbContext.Customers
            .Include(c => c.Account)
            .Where(c => c.Account.UserName == username)
            .Select(c=>c.CustomerId)
            .FirstOrDefault();
            
        return await dbContext.ItemInCarts
            .Include(i => i.Product)
            .ThenInclude(p => p.Shop)
            .Where(i => i.CustomerId == customerId)
            .Select(i => new CartDto
            {
                ItemId = i.ItemId,
                Quantity = i.Quantity,
                ProductId = i.ProductId,
                ProductName = i.Product.ProductName,
                ShopId = i.Product.Shop.ShopId,
                ShopName = i.Product.Shop.ShopName,
                Price = i.Product.Price,
                ProductImage = i.Product.MainImage,
                
            })
            .ToListAsync();
    }
}