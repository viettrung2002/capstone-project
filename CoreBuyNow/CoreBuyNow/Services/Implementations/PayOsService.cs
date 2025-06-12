using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Net.payOS;
using Net.payOS.Types;
namespace CoreBuyNow.Services.Implementations;

public class PayOsService 
{
    private readonly PayOS _payOs;
    private readonly ILogger<PayOsService> _logger;
    public PayOsService(IConfiguration configuration, ILogger<PayOsService> logger)
    {
        _logger = logger;
        var clientId = configuration["PayOS:ClientId"];
        var apiKey = configuration["PayOS:ApiKey"];
        var checksumKey = configuration["PayOS:ChecksumKey"];

        _logger.LogInformation("PayOS - Initializing with clientId: {clientId}", clientId);
        
        if (string.IsNullOrWhiteSpace(clientId) || string.IsNullOrWhiteSpace(apiKey) || string.IsNullOrWhiteSpace(checksumKey)) throw new Exception("PayOS configuration Error");
        _payOs = new PayOS(clientId, apiKey, checksumKey);
    }
    public async Task<string> CreatePaymentLink(int amount, long orderId, string description, string returnUrl, string cancelUrl)
    {
        var itemData = new ItemData("", 1, 1000);
        List<ItemData> items =
        [
            itemData
        ];
        var orderCode = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        var originalGuid = Guid.Parse(description);
        byte[] guidBytes = originalGuid.ToByteArray();
        string base64Guid = Convert.ToBase64String(guidBytes);
        _logger.LogInformation("GUID ORIGIN: {a}", originalGuid);
        PaymentData paymentData = new PaymentData(orderCode: orderCode, amount: amount, description: base64Guid, items, returnUrl: returnUrl, cancelUrl: cancelUrl );
        _logger.LogInformation("payment Data {data}",  paymentData.ToString());
        CreatePaymentResult createPayment = await _payOs.createPaymentLink(paymentData);
        
        return createPayment.checkoutUrl;
    }
}
