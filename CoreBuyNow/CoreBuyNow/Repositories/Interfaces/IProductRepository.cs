using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Repositories.Interfaces;

public interface IProductRepository 
{
    Task AddProduct(Product product);
    Task<List<ProductAttribute>> GetSubCategoryAttributes(Guid subCategoryId);
    Task UpdateProduct(Product product, Guid productId);
    Task DeleteProduct(Guid productId);
    Task<Product?> GetProductById(Guid productId);
    
    Task<PageResponseDto<Product>> GetProductByPage(int pageIndex, int pageSize);
}