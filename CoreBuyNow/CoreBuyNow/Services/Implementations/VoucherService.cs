using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Interfaces;

namespace CoreBuyNow.Services.Implementations;

public class VoucherService (IVoucherRepository voucherRepository) : IVoucherService
{
    public async Task CreateVoucher(Voucher voucher)
    {
        await voucherRepository.CreateVoucher(voucher);
    }

    public async Task<VoucherDto> GetVoucher(Guid voucherId)
    {
        return await voucherRepository.GetVoucher(voucherId);
    }

    public async Task<PageResponseDto<VoucherDto>> GetAllVoucher(Role role, int pageIndex = 1, int pageSize = 10)
    {
        return await voucherRepository.GetAllVoucher(role, pageIndex, pageSize);
    }

    public async Task<PageResponseDto<VoucherDto>> GetAllVoucher(int pageIndex = 1, int pageSize = 10)
    {
        return await voucherRepository.GetAllVoucher(pageIndex, pageSize);
    }

    public async Task UpdateVoucher(Voucher voucher, Guid voucherId)
    {
        await voucherRepository.UpdateVoucher(voucher, voucherId);
    }

    public async Task DeleteVoucher(Guid voucherId)
    {
        await voucherRepository.DeleteVoucher(voucherId);
    }

    public async Task<List<Voucher>> GetVoucherAdmin()
    {
        return await voucherRepository.GetVoucherAdmin();
    }

    public async Task<List<Voucher>> GetVoucherShop(Guid shopId)
    {
        return await voucherRepository.GetVoucherShop(shopId);
    }

    public async Task<List<VoucherWallet>> GetVoucherShopWallet(Guid customerId, Guid shopId)
    {
        return await voucherRepository.GetVoucherShopWallet(customerId, shopId);
    }
    public async Task<List<VoucherWallet>> GetVoucherAdminWallet(Guid customerId)
    {
        return await voucherRepository.GetVoucherAdminWallet(customerId);
    }
}