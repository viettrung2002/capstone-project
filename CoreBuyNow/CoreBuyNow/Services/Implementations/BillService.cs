using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Interfaces;

namespace CoreBuyNow.Services.Implementations;

public class BillService (IBillRepository billRepository) : IBillService
{
    public async Task CreateBill(Bill bill, Guid customerId)
    {
        await billRepository.CreateBill(bill, customerId);
    }

    public async Task<PageResponseDto<BillResponseDto>> GetBills(Guid customerId, int pageIndex, int pageSize)
    {
        return await billRepository.GetBills(customerId, pageIndex, pageSize);
    }

    public async Task<PageResponseDto<BillResponseDto>> GetBills(Guid customerId, OrderStatus status, int pageIndex, int pageSize)
    {
         return await billRepository.GetBills(customerId, status, pageIndex, pageSize);
    }

    public async Task UpdateStatus(Guid billId)
    {
        await billRepository.UpdateStatus(billId);
    }

    public async Task CancelBill(Guid billId)
    {
        await billRepository.CancelBill(billId);
    }
}