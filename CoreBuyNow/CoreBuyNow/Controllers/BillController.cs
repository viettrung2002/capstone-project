using CoreBuyNow.Models.Entities;
using CoreBuyNow.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;
[ApiController]
[Route("api/bill")]
public class BillController(IBillService billService, ILogger<BillController> logger) : ControllerBase
{
    [HttpPost]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> Create(Bill bill)
    {
        try
        {
            var id = User.FindFirst("id")?.Value;
            logger.LogInformation("ID={id}", id);
            
            await billService.CreateBill(bill, Guid.Parse(id));
            
            return Ok(new
            {
                message = "Bill created"
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> GetBills( [FromQuery] OrderStatus? orderStatus, int pageIndex = 1, int pageSize = 10)
    {
        try
        {
            var customerId = Guid.Parse(User.FindFirst("id")?.Value); 
            
            if (orderStatus.HasValue)
            {
                return Ok(new
                {
                    data = await billService.GetBills(customerId, orderStatus.Value, pageIndex, pageSize)
                });
            }
            return Ok(new
            {
                data = await billService.GetBills(customerId, pageIndex, pageSize)
            });
            
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("update-status")]
    public async Task<IActionResult> UpdateStatus(Guid billId)
    {
        try
        {
            await billService.UpdateStatus(billId);
            return Ok(new
            {
                message = "Bill updated"
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpPut("cancel")]
    public async Task<IActionResult> CancelBill(Guid billId)
    {
        try
        {
            await billService.CancelBill(billId);
            return Ok(new
            {
                message = "Bill updated"
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("shop")]
    [Authorize(Roles = "Shop")]
    public async Task<IActionResult> GetBillInShop([FromQuery] OrderStatus? orderStatus, int pageIndex = 1, int pageSize = 10)
    {
        try
        {
            if (orderStatus.HasValue)
            {
                return Ok(new
                {
                    data = await billService.GetBillWithShopId(Guid.Parse(User.FindFirst("id")?.Value), orderStatus, pageIndex, pageSize)
                });
            }

            return Ok(new
            {
                data = await billService.GetBillWithShopId(Guid.Parse(User.FindFirst("id")?.Value), null, pageIndex,
                    pageSize)
            });

        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
}