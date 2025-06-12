using System.Text;
using System.Text.Json;
using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Implementations;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;

[ApiController]
[Route("api/pay")]
public class PaymentsController(PayOsService payOsService, IConfiguration configuration, ILogger<PaymentsController> logger, IWalletRepository walletRepository) : ControllerBase
{
    [HttpPost("create")]
    public async Task<IActionResult> CreatePayment([FromBody] PaymentRequestDto request)
    {
        var paymentUrl = await payOsService.CreatePaymentLink(
            request.Amount,
            request.OrderId,
            request.Description,
            request.ReturnUrl,
            request.CancelUrl
        );

        return Ok(new { url = paymentUrl });
    }
    
    [HttpPost("webhook")]
    public async Task<IActionResult> PayOsWebhook([FromBody] JsonElement payload)
    {
        
        logger.LogInformation("Da Thanh Toan So Tien: {amount}", payload.ToString());

        var id = payload.GetProperty("data").GetProperty("description").ToString();
        
        int spaceIndex = id.IndexOf(' ');
        string result = spaceIndex >= 0 ? id.Substring(spaceIndex + 1) : id;
        logger.LogInformation("ID CallBack Nhan Duoc: {amount}", result += "==");
        
        byte[] revertedBytes = Convert.FromBase64String(result);
        Guid revertedGuid = new Guid(revertedBytes);
        logger.LogInformation("ID CallBack Nhan Duoc: {amount}", revertedGuid);
        
        string finalGuidString = revertedGuid.ToString("d");
        
        logger.LogInformation("ID Khoi Phuc: {amount}", Guid.Parse(finalGuidString));

        var payResponse = new PayOsResponseDto
        {
            Amount = payload.GetProperty("data").GetProperty("amount").GetDecimal(),
            Status = payload.GetProperty("desc").ToString(),
            PaidTime = DateTime.Parse(payload.GetProperty("data").GetProperty("transactionDateTime").ToString()),
            UserId = Guid.Parse(finalGuidString)
        };  
        logger.LogInformation("Pay Response: {amount}, {status}, {paidtime}, {userId}", payResponse.Amount, payResponse.Status, payResponse.PaidTime, payResponse.UserId );
        await walletRepository.Recharge(payResponse);
        
        return Ok(new
        {
            message = "Recharged Successfully",
        });
    }

}


