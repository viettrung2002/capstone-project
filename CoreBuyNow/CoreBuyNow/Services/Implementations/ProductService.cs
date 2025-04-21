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

    public async Task DeleteProduct(Guid productId)
    {
        await productRepository.DeleteProduct(productId);
    }

    public async Task<Product?> GetProductById(Guid productId)
    {
        return await productRepository.GetProductById(productId);
    }

    public async Task UpdateProduct(Product product, Guid productId)
    {
        await productRepository.UpdateProduct(product, productId);
    }

    public Task<PageResponseDto<Product>> GetProductByPage(int pageIndex, int pageSize)
    {
        return productRepository.GetProductByPage(pageIndex, pageSize);
    }

    
}