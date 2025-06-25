using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Interfaces;

namespace CoreBuyNow.Services.Implementations;

public class ProductService(IProductRepository productRepository) : IProductService
{
    public async Task<List<ProductAttribute>> GetProductAttributeByIdAsync(Guid subCategoryId)
    {
        return await productRepository.GetSubCategoryAttributes(subCategoryId);
    }

    public async Task AddProduct(Product product)
    {
        await productRepository.AddProduct(product);
    }

    public async Task AddProduct(Product product, IFormFile mainImage, List<IFormFile> extraImages)
    {
        await productRepository.AddProduct2(product, mainImage, extraImages);
    }

    public async Task DeleteProduct(Guid productId)
    {
        await productRepository.DeleteProduct(productId);
    }

    public async Task<ProductInfoResponseDto> GetProductById(Guid productId)
    {
        return await productRepository.GetProductById(productId);
    }

    public async Task UpdateProduct(Product product, Guid productId)
    {
        await productRepository.UpdateProduct(product, productId);
    }

    public Task<PageResponseDto<ProductResponseDto>> GetProductByPage(ProductFilterDto filterDto)
    {
        return productRepository.GetProductByPage(filterDto);
    }

    public async Task<CategoryResDto> GetSubCategory (Guid categoryId)
    {
        return await productRepository.GetSubCategory(categoryId);
    }

    public async Task<List<CategoryResDto>> GetSubCategories()
    {
        return await productRepository.GetSubCategories();
    }
}