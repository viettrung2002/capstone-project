using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Repositories.Interfaces;

public interface INotificationRepository
{
    Task CreateNotification(Notification notification);
    Task<List<Notification>> GetNotifications(Guid userId);
    Task ReadNotifications(Guid notificationId);
    Task ReadAllNotifications(Guid userId);
    Task<int> GetUnReadNotifications(Guid userId);
    
}