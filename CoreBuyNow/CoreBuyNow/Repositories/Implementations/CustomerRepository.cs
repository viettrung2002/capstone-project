using CoreBuyNow.Models;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace CoreBuyNow.Repositories.Implementations
{


    public class CustomerRepository(AppDbContext dbContext, ILogger<CustomerRepository> logger) : ICustomerRepository
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
            existingCustomer.Email = customer.Email;
            existingCustomer.Avatar = customer.Avatar;
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

        public async Task<Customer> GetCustomerByAccountId(Guid accountId)
        {
            return await dbContext.Customers.FindAsync(accountId);
        }


        public async Task RecordInteraction(Guid userId, Guid productId, ActionType action)
        {
            dbContext.Interactions.Add(new Interaction
            {
                UserId = userId,
                ProductId = productId,
                Action = action,
                Timestamp = DateTime.UtcNow
            });

            var user = await dbContext.Customers.Include(u => u.Interactions)
                .FirstOrDefaultAsync(u => u.CustomerId == userId);
            var recentProductIds = user.Interactions.OrderByDescending(i => i.Timestamp).Take(10)
                .Select(i => i.ProductId).ToList();
            var vectors = await dbContext.Products.Where(p => recentProductIds.Contains(p.ProductId))
                .Select(p => p.Vector).ToListAsync();

            if (vectors.Count > 0)
            {
                var dim = vectors.First().Length;
                var avgVector = new double[dim];
                foreach (var vec in vectors)
                    for (var i = 0; i < dim; i++)
                        avgVector[i] += vec[i];
                for (var i = 0; i < dim; i++) avgVector[i] /= vectors.Count;
                user.Vector = avgVector;
            }

            await dbContext.SaveChangesAsync();
        }

        public async Task<List<Product>> RecommendForUser(Guid userId)
        {
            var user = await dbContext.Customers.FindAsync(userId);
            if (user?.Vector == null) return new List<Product>();
            
            var allProducts = await dbContext.Products.ToListAsync();

            var vectors = await dbContext.Interactions
                .Include(i => i.Product)
                .Where(i => i.UserId == userId )
                .Take(40)
                .Select(i => i.Product.Vector)
                .ToListAsync();
            if (vectors.Count == 0) throw new Exception("No record found!");

            var dim = vectors[0].Length;
            var avgVector = new double[dim];
            var count = 0;
            foreach (var vec in vectors)
                if (vec.Length > 0)
                {
                    for (int i = 0; i < dim; i++)
                        avgVector[i] += vec[i];
                    count += 1;
                }
            
            for (int i = 0; i < dim; i++)
                avgVector[i] /= count;
            logger.LogInformation("User vector: {vec}", string.Join(",", avgVector.Length));
            foreach (var p in allProducts)
            {
                // logger.LogInformation("Ten San Pham: {name} - Score: {Score}", p.ProductName, CosineSimilarity(avgVector, p.Vector));
                logger.LogInformation("Do dai vector: {vec}", string.Join(",", p.Vector.Length));
            }
            var results = allProducts.Select(p => new
                {
                    Product = p,
                    Score = CosineSimilarity(avgVector, p.Vector)
                })
                .OrderByDescending(x => x.Score)
                .Take(10)
                .Select(x => x.Product)
                .ToList();
            
            return results;
        }
        private static double CosineSimilarity(double[] a, double[] b)
        {

            if (a.Length != b.Length) return 0;
            double dot = 0, magA = 0, magB = 0;
            for (int i = 0; i < a.Length; i++)
            {
                dot += a[i] * b[i];
                magA += a[i] * a[i];
                magB += b[i] * b[i];
            }
            return dot / (Math.Sqrt(magA) * Math.Sqrt(magB) + 1e-10);
        }
    }
    
}
