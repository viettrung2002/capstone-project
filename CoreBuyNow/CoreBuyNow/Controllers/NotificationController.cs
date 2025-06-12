using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;
[ApiController]
[Route("api/notification")]
public class NotificationController (INotificationRepository notificationRepository) : ControllerBase
{
     [HttpPost]
     public async Task<IActionResult> CreateNotification(Notification notification)
     {
          try
          {
               await notificationRepository.CreateNotification(notification);
               return Ok(new { message = "Notification created successfully" });
          }
          catch (Exception e)
          {
               return BadRequest(e.Message);
          }
     }

     [HttpGet]
     [Authorize(Roles = "Customer")]
     public async Task<IActionResult> GetNotifications()
     {
          try
          {
               var customerId = User.FindFirst("id")?.Value;
               if (customerId == null) return Unauthorized();
               return Ok(new
               {
                    data = await notificationRepository.GetNotifications(Guid.Parse(customerId))
               });
          }
          catch (Exception e)
          {
              return BadRequest(e.Message);
          }
     }

     [HttpPut("read")]
     [Authorize(Roles = "Customer")]
     public async Task<IActionResult> ReadNotification(Guid notificationId)
     {
          try
          {
               await notificationRepository.ReadNotifications(notificationId);
               return Ok(new { message = "Read notification successfully" });
          }
          catch (Exception e)
          {
               return BadRequest(e.Message);
          }
     }
     
     [HttpPut("read-all")]
     [Authorize(Roles = "Customer")]
     public async Task<IActionResult> ReadAll(Guid userId)
     {
          try
          {
               var customerId = User.FindFirst("id")?.Value;
               if (customerId == null) return Unauthorized();
               await notificationRepository.ReadAllNotifications(Guid.Parse(customerId));
               return Ok(new
               {
                    message = "Read all notifications successfully"
               });
          }
          catch (Exception e)
          {
               return BadRequest(e.Message);
          }
     }
     
     [HttpGet("unread")]
     [Authorize(Roles = "Customer")]
     public async Task<IActionResult> GetUnReadNotifications()
     {
          try
          {
               var customerId = User.FindFirst("id")?.Value;
               if (customerId == null) return Unauthorized();
               return Ok(new
               {
                    data = await notificationRepository.GetUnReadNotifications(Guid.Parse(customerId))
               });
          }
          catch (Exception e)
          {
               return BadRequest(e.Message);
          }
     }
}