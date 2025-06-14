using CoreBuyNow.Models.Entities;
namespace CoreBuyNow.Services.Interfaces; 
public interface ICustomerService {
    Task<Customer?> GetCustomerById (Guid customerId);
    
    Task EditCustomer (Customer customer, Guid id);
}