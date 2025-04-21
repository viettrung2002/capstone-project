using CoreBuyNow.Models;
using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoreBuyNow.Repositories.Implementations;

public class ProductRepository(AppDbContext dbContext, ILogger<ProductRepository> logger) : IProductRepository
{
    public async Task<List<ProductAttribute>> GetSubCategoryAttributes(Guid subCategoryId)
    {
        return await dbContext.SubCategoryAttributes
            .Where(sa=>sa.SubcategoryId == subCategoryId)
            .Include(sa=> sa.ProductAttribute)
            .Select(sa => sa.ProductAttribute)
            .ToListAsync();
    }

    public async Task AddProduct(Product product)
    {
        var productAttribute =  dbContext.SubCategoryAttributes 
            .Where(sa => sa.SubcategoryId == product.SubCategoryId)
            .Include(sa => sa.ProductAttribute)
            .Select(sa => sa.ProductAttribute.AttributeName)
            .ToList();
        logger.LogInformation("{id} Product Attribute: {ProductAttribute}",product.SubCategoryId, productAttribute);
        foreach (var key in product.Specifications)
        {
            logger.LogInformation("Key: {key}",key.Key);
            if (!productAttribute.Contains(key.Key))
            {
                throw new Exception($"Attribute '{key}' is not valid for this subcategory");
            }
        }
        product.ProductId = Guid.NewGuid();
        product.CreatedDate = DateTime.Now;
        dbContext.Products.Add(product);
        await dbContext.SaveChangesAsync();
    }

    public async Task DeleteProduct(Guid productId)
    {
        var product = await dbContext.Products.FindAsync(productId);
        if (product == null)
        {
            throw new InvalidOperationException("Enter your shop id!");
        }
        dbContext.Products.Remove(product);
        await dbContext.SaveChangesAsync();
    }

    public async Task<Product?> GetProductById(Guid productId)
    {
        return await dbContext.Products.FindAsync(productId);
    }

    public async Task UpdateProduct([FromBody]Product product, Guid productId)
    {
        var existingProduct = await dbContext.Products.FindAsync(productId);
        if (existingProduct == null) throw new AggregateException("Enter your shop id!");
        existingProduct.ProductName = product.ProductName;
        existingProduct.Price = product.Price;
        existingProduct.MainImage = product.MainImage;
        existingProduct.ExtraImage = product.ExtraImage;
        existingProduct.Specifications = product.Specifications;
        existingProduct.IsFlashSale = product.IsFlashSale;
        dbContext.Products.Update(existingProduct);
        await dbContext.SaveChangesAsync();
    }

    public async Task<PageResponseDto<Product>> GetProductByPage(int index, int size)
    {
        return new PageResponseDto<Product>
        (
            index,
            size,
            await dbContext.Products.CountAsync(),
            await dbContext.Products
                .OrderBy(c => c.ProductName)
                .Skip(index * size)
                .Take(size)
                .ToListAsync()
        );


    }
}


