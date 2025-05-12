using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Repositories.Interfaces;

public interface ICustomerRepository
{
    Task CreateCustomer(Customer customer);
    Task<Customer?> GetCustomerById(Guid id);
    Task EditCustomer(Customer customer, Guid id);
    Task DeleteCustomer(Guid id); 
    Task<Customer> GetCustomerByAccountId(Guid accountId);
}