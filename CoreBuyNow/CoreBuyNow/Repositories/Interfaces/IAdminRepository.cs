using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Repositories.Interfaces;

public interface IAdminRepository
{
    Task<AdminDto> GetInfomation(DateTime? startDate, DateTime? endDate);
    Task<decimal> GetRevenueOverTime(DateTime startDate, DateTime endDate);
    
    Task<List<ShopInAdminResponse>> GetShops();
    
    Task<List<CustomerInAdminResponse>> GetCustomers();
    
    Task ActivateShop(Guid shopId);
    Task DeactivateShop(Guid shopId);
    
    Task ResetPassword(Guid accountId);
}