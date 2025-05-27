using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Repositories.Interfaces;

public interface IProductRepository 
{
    Task AddProduct(Product product);
    Task AddProductAndVector(Product product);
    Task<List<ProductAttribute>> GetSubCategoryAttributes(Guid subCategoryId);
    Task UpdateProduct(Product product, Guid productId);
    Task DeleteProduct(Guid productId);
    Task<ProductInfoResponseDto?> GetProductById(Guid productId);
    
    Task<PageResponseDto<ProductResponseDto>> GetProductByPage(ProductFilterDto filter);
    Task<CategoryResDto> GetSubCategory (Guid categoryId);
    Task<List<CategoryResDto>> GetSubCategories();
    
    
}