using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Interfaces;

namespace CoreBuyNow.Services.Implementations;

public class CartService (ICartRepository cartRepository) :  ICartService
{
    public async Task AddItem(ItemInCart item)
    {
        await cartRepository.AddItem(item);
    }

    public async Task RemoveItem(Guid itemId)
    {
        await cartRepository.RemoveItem(itemId);
    }

    public async Task UpdateQuantity(Guid itemId, int quantity)
    {
        await cartRepository.UpdateQuantity(itemId, quantity);
    }

    public async Task<List<CartDto>> GetCart(string username)
    {
        return await cartRepository.GetItemInCarts(username);
    }
}