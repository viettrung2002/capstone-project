using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Repositories.Interfaces;

public interface ICartRepository
{
    Task AddItem(ItemInCart item);
    Task UpdateQuantity(Guid id, int quantity);
    Task RemoveItem(Guid id);
    Task<List<CartDto>> GetItemInCarts(Guid customerId);
    
}