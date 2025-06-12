using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Services.Interfaces;

public interface IBillService
{
    Task CreateBill(BillRequestDto req, Guid customerId);
    Task<PageResponseDto<BillResponseDto>> GetBills(Guid customerId, int pageIndex, int pageSize);
    Task<PageResponseDto<BillResponseDto>> GetBills(Guid customerId, OrderStatus status, int pageIndex, int pageSize);
    Task UpdateStatus(Guid billId);
    Task CancelBill(Guid billId);
    Task<PageResponseDto<BillResponseDto>> GetBillWithShopId(Guid shopId, OrderStatus? status ,int pageIndex, int pageSize);
    
    Task<Bill> GetBill(Guid billId);
}