using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Repositories.Interfaces;

public interface IProductRepository 
{
    Task AddProduct(Product product);
    Task<List<ProductAttribute>> GetSubCategoryAttributes(Guid subCategoryId);
    Task UpdateProduct(Product product, Guid productId);
    Task DeleteProduct(Guid productId);
    Task<Product?> GetProductById(Guid productId);
}