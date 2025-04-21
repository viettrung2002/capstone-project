using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;

[ApiController]
[Route("/api/account")]
public class AccountController(IAccountService accountService) : ControllerBase
{
    [HttpPost("register/shop")]
    public async Task<ActionResult> CreateAccountAsync([FromBody] AccountRegisterDto<ShopDto> info)
    {
        await accountService.AddAccount(info);
        return Ok( new
        {
           message = "Account created",
        });
    }
    [HttpPost("register/customer")]
    public async Task<ActionResult> CreateAccountAsync([FromBody] AccountRegisterDto<CustomerDto> info)
    {
        
        await accountService.AddAccount(info);
        return Ok( new
        {
            message = "Account created",
        });
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
    
    
}