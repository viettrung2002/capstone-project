using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Interfaces;

public class CustomerService (ICustomerRepository customerRepository) : ICustomerService
{
    public async Task<Customer?> GetCustomerById(Guid customerId)
    {
        return await customerRepository.GetCustomerById(customerId);
    }


    public async Task EditCustomer(Customer customer, Guid id)
    {
        await customerRepository.EditCustomer(customer, id);
    }
}