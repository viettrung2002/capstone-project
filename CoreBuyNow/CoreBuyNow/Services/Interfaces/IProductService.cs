using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Services.Interfaces;

public interface IProductService
{
    Task<List<ProductAttribute>> GetProductAttributeByIdAsync(Guid subCategoryId);
    Task AddProduct (Product product);
    Task DeleteProduct (Guid productId);
    Task<ProductInfoResponseDto> GetProductById (Guid productId);
    Task UpdateProduct (Product product, Guid productId);
    
    Task<PageResponseDto<ProductResponseDto>> GetProductByPage (ProductFilterDto filterDto);
    Task<CategoryResDto> GetSubCategory (Guid categoryId);
    Task<List<CategoryResDto>> GetSubCategories();
}