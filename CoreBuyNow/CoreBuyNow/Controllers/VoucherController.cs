﻿using CoreBuyNow.Models.Entities;
using CoreBuyNow.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;
[Route("api/voucher")]
[ApiController]
public class VoucherController (IVoucherService voucherService, ILogger<VoucherController> logger) : ControllerBase
{
    [HttpPost]
    [Authorize(Roles = "Shop,Admin")]
    public async Task<IActionResult> CreateVoucher(Voucher voucher)
    {
        try
        {
            var id = User.FindFirst("id")?.Value;
            logger.LogInformation("ID: {id}", id);
            var role = User.FindFirst("http://schemas.microsoft.com/ws/2008/06/identity/claims/role")?.Value;
            logger.LogInformation("Role: {role}", role);

            if (role == "Shop")
            {
                voucher.ShopId = Guid.Parse(id);
                logger.LogInformation("SHOPID: {id}", voucher.ShopId);
                voucher.AdminId = null;
            }
            else
            {
                voucher.AdminId = Guid.Parse(id);
                voucher.ShopId = null;
            }
               
            await voucherService.CreateVoucher(voucher);
            return Ok(new
            {
                message = "Voucher created successfully"
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("{voucherId:guid}")]
    public async Task<IActionResult> GetVouchers(Guid voucherId)
    {
        try
        {
            return Ok(new
            {
                data = await voucherService.GetVoucher(voucherId)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
   
    public async Task<IActionResult> GetAllVouchers(Role? role, int pageIndex = 1, int pageSize = 10)
    {
        try
        {
            if (role.HasValue)
            {
                return Ok(new
                {
                    data = await voucherService.GetAllVoucher(role.Value, pageIndex, pageSize)
                });
            }
            return Ok(new
            {
                data = await voucherService.GetAllVoucher(pageIndex, pageSize)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut]
    [Authorize(Roles = "Admin,Shop")]
    public async Task<IActionResult> UpdateVoucher(Voucher voucher, Guid voucherId)
    {
        try
        {
            await voucherService.UpdateVoucher(voucher, voucherId);
            return Ok(new
            {
                message = "Voucher updated successfully"
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete]
    [Authorize(Roles = "Admin,Shop")]
    public async Task<IActionResult> DeleteVoucher(Guid voucherId)
    {
        try
        {
            await voucherService.DeleteVoucher(voucherId);
            return Ok(new
            {
                message = "Voucher deleted successfully"
            });
        }
        catch (Exception e) 
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("admin/all")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAdminVouchers()
    {
        try
        {
            return Ok(new
            {
                data = await voucherService.GetVoucherAdmin()
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet("shop")]
    [Authorize(Roles = "Shop")]
    public async Task<IActionResult> GetShopVouchers()
    {
        try
        {
            var shopId = User.FindFirst("id")?.Value;
            return Ok(new
            {
                data = await voucherService.GetVoucherShop(Guid.Parse(shopId))
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpGet("shop/{shopId:guid}")]
    public async Task<IActionResult> GetShopVouchers(Guid shopId)
    {
        try
        {
            return Ok(new
            {
                data = await voucherService.GetVoucherShop(shopId)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpPost("wallet")]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> SaveVoucher(Guid voucherId)
    {
        try
        {
            var customerId = User.FindFirst("id")?.Value;
            if (customerId == null) return Unauthorized();
            await voucherService.SaveVoucher(voucherId, Guid.Parse(customerId));
            return Ok(new
            {
                message = "Voucher saved successfully"
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {message = e.Message});
        }
    }
    [HttpGet("customer/shop-voucher/{shopId:guid}")]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> GetVoucherShopWallet(Guid shopId)
    {
        try
        {
            var id = User.FindFirst("id")?.Value;
            return Ok(new
            {
                data = await voucherService.GetVoucherShopWallet(Guid.Parse(id), shopId)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet("customer/admin-voucher")]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> GetVoucherAdminWallet()
    {
        try
        {
            var id = User.FindFirst("id")?.Value;
            return Ok(new
            {
                data = await voucherService.GetVoucherAdminWallet(Guid.Parse(id))
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}