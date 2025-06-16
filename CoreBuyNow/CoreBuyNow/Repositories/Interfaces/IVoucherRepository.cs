using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Repositories.Interfaces;

public interface IVoucherRepository
{
    Task CreateVoucher(Voucher voucher);
    Task<VoucherDto> GetVoucher (Guid voucherId);
    Task<PageResponseDto<VoucherDto>> GetAllVoucher(Role role, int pageIndex = 1, int pageSize = 10); 
    Task<PageResponseDto<VoucherDto>> GetAllVoucher(int pageIndex = 1, int pageSize = 10); 
    Task UpdateVoucher(Voucher voucher, Guid voucherId);
    Task DeleteVoucher(Guid voucherId);

    Task<List<Voucher>> GetVoucherAdmin();
    Task<List<Voucher>> GetVoucherShop(Guid shopId);
    Task<List<VoucherWallet>> GetVoucherShopWallet(Guid customerId, Guid shopId);
    Task<List<VoucherWallet>> GetVoucherAdminWallet(Guid customerId);
    Task SaveVoucher(Guid voucherId, Guid customerId);
    Task IssueVoucher(Guid voucherId);
}