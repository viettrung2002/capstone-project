using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;

[ApiController]
[Route("/api/account")]
public class AccountController(IAccountService accountService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult> CreateAccountAsync([FromBody] AccountRegisterDto<Shop> info)
    {
        var account = new Account
        {
            UserName = info.UserName,
            PassWord = info.PassWord,
            Role = info.Role,
        };
        
        await accountService.AddAccount( account: account, info: info.Info);
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