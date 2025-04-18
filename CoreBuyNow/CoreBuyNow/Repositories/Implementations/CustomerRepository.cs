using CoreBuyNow.Models;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;

namespace CoreBuyNow.Repositories.Implementations;

public class CustomerRepository (AppDbContext dbContext) : ICustomerRepository
{
    public async Task CreateCustomer(Customer customer)
    {
        if (string.IsNullOrEmpty(customer.CustomerName))
        {
            throw new AggregateException("Enter your customer name!");
        }
        if (customer.CustomerId == Guid.Empty) customer.CustomerId = Guid.NewGuid();
        dbContext.Customers.Add(customer);
        await dbContext.SaveChangesAsync();
    }
    public async Task EditCustomer(Customer customer, Guid id)
    {
        var existingCustomer = await dbContext.Customers.FindAsync(id);
        if (existingCustomer == null) throw new AggregateException("Enter your customer id!");
        existingCustomer.CustomerName = customer.CustomerName;  
        existingCustomer.Gender = customer.Gender;
        existingCustomer.BirthDay = customer.BirthDay;
        existingCustomer.Address = customer.Address;
        existingCustomer.PhoneNumber = customer.PhoneNumber;
        dbContext.Customers.Update(existingCustomer);
        await dbContext.SaveChangesAsync();
    }

    public async Task DeleteCustomer(Guid id)
    {
        var existingCustomer = await dbContext.Customers.FindAsync(id);
        if (existingCustomer == null)
        {
            throw new AggregateException("Enter your customer id!");
        }
        dbContext.Customers.Remove(existingCustomer);
        await dbContext.SaveChangesAsync();
    }
    public async Task<Customer?> GetCustomerById(Guid id)
    {
        return await dbContext.Customers.FindAsync(id);
    }
}