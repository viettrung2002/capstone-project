using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Services.Interfaces;

public interface ICartService
{
    Task AddItem(ItemInCart item);
    Task RemoveItem(Guid itemId);
    Task UpdateQuantity(Guid itemId, int quantity);
    Task<List<CartDto>> GetCart(string username);
}