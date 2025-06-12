using CoreBuyNow.Models;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoreBuyNow.Repositories.Implementations;

public class NotificationRepository (AppDbContext dbContext) : INotificationRepository
{
    public Task CreateNotification(Notification notification)
    {
        notification.NotificationId = Guid.NewGuid();
        if (notification.Title == null) throw new Exception("Title cannot be null");
        if (notification.Content == null) throw new Exception("Content cannot be null");
        if (notification.BillId == Guid.Empty) throw new Exception("BillId cannot be empty");
        if (notification.UserId == Guid.Empty) throw new Exception("UserId cannot be empty");
        notification.CreatedDate = DateTime.Now;
        notification.Read = false;
        dbContext.Notifications.Add(notification);
        return dbContext.SaveChangesAsync();
    }

    public async Task<List<Notification>> GetNotifications(Guid userId)
    {
        var notifications = await dbContext.Notifications.Where(n => n.UserId == userId).OrderByDescending(n => n.CreatedDate).ToListAsync();
        return notifications;
    }
    public async Task ReadNotifications(Guid notificationId)
    {
        var notification = await dbContext.Notifications.Where(n => n.NotificationId == notificationId).FirstOrDefaultAsync();
        if (notification == null) throw new Exception("Notification not found");
        notification.Read = true;
        dbContext.Update(notification);
        await dbContext.SaveChangesAsync();
    }

    public async Task ReadAllNotifications(Guid userId)
    {
        var notifications = await dbContext.Notifications.Where(n => n.UserId == userId).OrderByDescending(n => n.CreatedDate).ToListAsync();
        foreach (var notification in notifications)
        {
            notification.Read = true;
        }
        dbContext.Update(notifications);
        await dbContext.SaveChangesAsync();
    }

    public async Task<int> GetUnReadNotifications(Guid userId)
    {
        var unreadCount = await dbContext.Notifications.Where(n => n.UserId == userId && n.Read == false).CountAsync();
        return unreadCount;
    }
}