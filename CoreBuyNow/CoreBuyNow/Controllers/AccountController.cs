﻿using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services;
using CoreBuyNow.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;

[ApiController]
[Route("/api/account")]
public class AccountController(IAccountService accountService, EmailService emailService, IAccountRepository accountRepository) : ControllerBase
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
            var customerId = User.FindFirst("id")?.Value;
            if (customerId == null) return Unauthorized();
            return Ok(new
                {
                    data = await accountService.GetCustomer(Guid.Parse(customerId))
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

    [HttpPut("change-password")]
    [Authorize(Roles = "Customer, Shop")]
    public async Task<IActionResult> ChangePassword(string oldPassword, string newPassword, string accountId)
    {
        try
        {
            await accountService.ChangePassword(oldPassword, newPassword, Guid.Parse(accountId));
            return Ok(new
            {
               message = "Password changed"
            });
            
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(string email)
    {
        try
        {
            await emailService.SendResetPasswordEmailAsync(email);
            return Ok(new
            {
                message = "Reset password email sent"
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(ForgotPasswordDto forgotPasswordDto)
    {
        try
        {
            await accountRepository.ResetPassword(forgotPasswordDto.Password, forgotPasswordDto.Token);
            return Ok(new
            {
                message = "Password has been reset"
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}