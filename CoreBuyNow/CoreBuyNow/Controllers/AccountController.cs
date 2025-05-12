using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;

[ApiController]
[Route("/api/account")]
public class AccountController(IAccountService accountService) : ControllerBase
{
    [HttpPost("register/shop")]
    public async Task<ActionResult> CreateAccountAsync([FromBody] AccountRegisterDto<ShopDto> info)
    {
        try
        {
            await accountService.AddAccount(info);
            return Ok( new
            {
                message = "Account created",
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
        
    }
    [HttpPost("register/customer")]
    public async Task<ActionResult> CreateAccountAsync([FromBody] AccountRegisterDto<CustomerDto> info)
    {
        try
        {
            await accountService.AddAccount(info);
            return Ok( new
            {
                message = "Account created",
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
        
    }
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetAccountByIdAsync(Guid id)
    {
        var account = await accountService.GetAccountByIdAsync(id);
        if (account == null)
        {
            return NotFound(new
            {
                message = "Account not found",
            });
        }
        return Ok(new
        {
            data = account
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginReqDto loginReq)
    {
        try
        {
            return Ok(new
            {
                message = "Login success",
                data = await accountService.Login(loginReq.Username, loginReq.Password)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("getcustomer")]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> GetCustomerByAccountId()
    {
        try
        {
            var customerId = Guid.Parse(User.FindFirst("id")?.Value); 
            return Ok(new
            {
                data = await accountService.GetCustomer(customerId)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("shop/{id:guid}")]
    public async Task<IActionResult> GetShop(Guid id)
    {
        try
        {
            return Ok(new
            {
                data = await accountService.GetShop(id)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
}