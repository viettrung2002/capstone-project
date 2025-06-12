using CoreBuyNow.Repositories.Implementations;
using CoreBuyNow.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;
[ApiController]
[Route("/api/admin")]
public class AdminController (IAdminRepository adminRepository) : ControllerBase
{
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAdminInfo()
    {
        try
        {
            return Ok(new
            {
                data = await adminRepository.GetInfomation()
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet("revenue")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetRevenueOverTime(DateTime startDate, DateTime endDate)
    {
        try
        {
            return Ok(new
            {
                data = await adminRepository.GetRevenueOverTime(startDate, endDate)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("shops")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetShops()
    {
        try
        {
            return Ok(new
            {
                data = await adminRepository.GetShops()
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpGet("customers")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetCustomers()
    {
        try
        {
            return Ok(new
            {
                data = await adminRepository.GetCustomers()
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpPut("activate")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ActivateShop(Guid shopId)
    {
        try
        {
            await adminRepository.ActivateShop(shopId);
            return Ok(new
            {
                message = "Activate Success"
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpPut("deactivate")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeactivateShop(Guid shopId)
    {
        try
        {
            await adminRepository.DeactivateShop(shopId);
            return Ok(new
            {
                message = "Deactivate Success"
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    } 
    
    [HttpPut("reset-password")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ResetPassword(Guid accountId)
    {
        try
        {
            await adminRepository.ResetPassword(accountId);
            return Ok(new
            {
                message = "Deactivate Success"
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    } 
}