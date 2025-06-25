using CoreBuyNow.Bootstraping;
using CoreBuyNow.Repositories.Interfaces;

namespace CoreBuyNow.Services;

using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Options;

public class EmailService(IOptions<EmailSettings> settings, IAccountRepository accountRepository)
{
    private readonly EmailSettings _settings = settings.Value;

    public async Task SendResetPasswordEmailAsync(string toEmail)
    {
        var token = Guid.NewGuid();
        await accountRepository.SavePassWordToken(toEmail, token);
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_settings.SenderName, _settings.SenderEmail));
        message.To.Add(MailboxAddress.Parse(toEmail));
        message.Subject = "Yêu cầu đặt lại mật khẩu";

        var resetLink = $"http://localhost:3000/reset-password?token={token}";

        message.Body = new TextPart("html")
        {
            Text = $@"
                <p>Chào bạn,</p>
                <p>Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào liên kết dưới đây để tiếp tục:</p>
                <p><a href='{resetLink}'>Đặt lại mật khẩu</a></p>
                <p>Liên kết sẽ hết hạn sau 15 phút.</p>"
        };

        using var client = new SmtpClient();
        await client.ConnectAsync(_settings.SmtpServer, _settings.Port, MailKit.Security.SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(_settings.SenderEmail, _settings.AppPassword);
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}
