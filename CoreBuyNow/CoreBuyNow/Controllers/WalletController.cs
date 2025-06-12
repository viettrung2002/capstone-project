using CoreBuyNow.Models.Entities;
using CoreBuyNow.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;
[ApiController]
[Route("/api/wallet")]
public class WalletController (IWalletService walletService) : ControllerBase
{
    [HttpPut]
    [Authorize(Roles = "Customer, Shop")]
    public async Task<IActionResult> CreateWallet([FromBody] string otp)
    {
        try
        {
            var id = Guid.Parse(User.FindFirst("id")?.Value);
            await walletService.CreateWallet(id, otp);
            return Ok(new
            {
                message = "Wallet was created"
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete]
    [Authorize(Roles = "Customer, Shop")]
    public async Task<IActionResult> DeleteWallet()
    {
        try
        {   
            var id = Guid.Parse(User.FindFirst("id")?.Value);
            await walletService.DeleteWallet(id);
            return Ok(new
            {
                message = "Wallet was deleted"
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpGet]
    [Authorize(Roles = "Customer, Shop")]
    public async Task<IActionResult> GetWallet()
    {
        try
        {
            var id = Guid.Parse(User.FindFirst("id")?.Value);
            return Ok(new
            {
                data = await walletService.GetWallet(id)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> TransferMoney(decimal amount, string description, Guid recipientId)
    {
        try
        {
            var id = Guid.Parse(User.FindFirst("id")?.Value);
            await walletService.TransferMoney(amount, description, id, recipientId);
            return Ok(new
            {
                message = "Money transfered"
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("transactions")]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> GetTransactions()
    {
        
        try
        {
            var id = Guid.Parse(User.FindFirst("id")?.Value);
            return Ok(new
            {
                data = await walletService.GetTransactions(id)
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("pay/{billId:guid}")]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> Pay(Guid billId)
    {
        try
        {
            var id = Guid.Parse(User.FindFirst("id")?.Value);
            await walletService.Pay(billId, id);
            return Ok(new
            {
                message = "Payed"
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }



}