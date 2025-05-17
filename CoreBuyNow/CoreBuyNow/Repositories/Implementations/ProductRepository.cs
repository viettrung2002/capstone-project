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
        var shop = dbContext.Shops.Find(product.ShopId);
        shop.ProductCount = shop.ProductCount + 1;
        dbContext.Shops.Update(shop);
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

    public async Task<ProductInfoResponseDto?> GetProductById(Guid productId)
    {
        var res = await dbContext.Products
            .Where(p => p.ProductId == productId)
            .Include(p=>p.SubCategory)
            .Include(p=>p.Shop)
            .Select(p => new ProductInfoResponseDto
            {
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                SubCategoryId = p.SubCategoryId,
                CategoryName = p.SubCategory.SubCategoryName,
                Like = p.Like,
                ShopId = p.ShopId,
                ShopName = p.Shop.ShopName,
                Price = p.Price,
                MainImage = p.MainImage,
                ExtraImage = p.ExtraImage,
                Sold = p.Sold,
                CreatedDate = p.CreatedDate,
                ReviewCount = dbContext.Comments.Count(c => c.ProductId == p.ProductId),
                Rating = p.Rating,
                Discount = p.Discount,
                Specifications = p.Specifications,
                IsFlashSale = p.IsFlashSale
            })
            .FirstOrDefaultAsync();
        return res;
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

    // public async Task<PageResponseDto<Product>> GetProductByPage(int index, int size)
    // {
    //     return new PageResponseDto<Product>
    //     (
    //         index,
    //         size,
    //         await dbContext.Products.CountAsync(),
    //         await dbContext.Products
    //             .OrderBy(c => c.ProductName)
    //             .Skip(index * size)
    //             .Take(size)
    //             .ToListAsync()
    //     );
    //
    //
    // }
    public async Task<PageResponseDto<ProductResponseDto>> GetProductByPage(ProductFilterDto filter)
    {
        var query = dbContext.Products.AsQueryable();
        logger.LogInformation("SubCategoryId1 {id}", filter.SubCategoryId);

        if (filter.CategoryId != Guid.Empty && filter.CategoryId != null && filter.SubCategoryId != null)
        
            query = query.Include(p=>p.SubCategory).Where(p=>p.SubCategory.CategoryId == filter.CategoryId);

        if (filter.ShopId != Guid.Empty && filter.ShopId != null) {
            logger.LogInformation("ID Shop Nhan Duoc : {id}", filter.ShopId);
            query = query.Where(p=>p.ShopId == filter.ShopId);
        }
        // Lọc khoảng giá
        if (filter.MinPrice.HasValue)
            query = query.Where(p => p.Price >= filter.MinPrice.Value);

        if (filter.MaxPrice.HasValue && filter.MaxPrice > 0)
            query = query.Where(p => p.Price <= filter.MaxPrice.Value);

        if (filter.SubCategoryId != null && filter.SubCategoryId != Guid.Empty)
        {
            logger.LogInformation("SubCategoryId {id}", filter.SubCategoryId);
            query = query.Where(p=>p.SubCategoryId == filter.SubCategoryId);
        }
        if (filter.Rating != 0 && filter.Rating.HasValue) query = query.Where(p => p.Rating >= filter.Rating);
        if (filter.ShopType.HasValue) query = query.Include(p=>p.Shop).Where(p=>p.Shop.IsOfficial == filter.ShopType);
        // Lọc theo keyword (tên sản phẩm)
        if (!string.IsNullOrEmpty(filter.Keyword))
            query = query.Where(p => p.ProductName.Contains(filter.Keyword));

        // Lọc theo thương hiệu
        // if (!string.IsNullOrEmpty(filter.Brand))
        //     query = query.Where(p => p.Brand == filter.Brand);

        // Lọc theo loại shop
        // if (!string.IsNullOrEmpty(filter.ShopType))
        //     query = query.Where(p => p.ShopType == filter.ShopType);

        // Sắp xếp
        query = filter.SortBy switch
        {
            "price_asc"    => query.OrderBy(p => p.Price),
            "price_desc"   => query.OrderByDescending(p => p.Price),
            "sold_desc"    => query.OrderByDescending(p => p.Sold), // giả sử bạn có cột SoldQuantity
            "rating_desc"  => query.OrderByDescending(p => p.Rating),       // giả sử bạn có cột Rating
            _              => query.OrderBy(p => p.Sold)             // mặc định sắp theo tên
        };

        var totalItems = await query.CountAsync();
        if (filter.IsHome.HasValue && !filter.IsFlashSale.HasValue)
        {
            
            var items = await query
                .Take(8)
                .Select(p => new ProductResponseDto {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    SubCategoryName = p.SubCategory.SubCategoryName,
                    MainImage = p.MainImage,
                    Rating = p.Rating,
                    Sold = p.Sold,
                    Discount = p.Discount,
                    ReviewCount = dbContext.Comments.Where(c=>c.ProductId == p.ProductId).Count(),
                    Price = p.Price
                })
                .ToListAsync();
            return new PageResponseDto<ProductResponseDto>(filter.Index, filter.Size, totalItems, items);
        }
            
        if (filter.IsFlashSale.HasValue && filter.IsHome.HasValue)
        {
            var items = await query
                .Where(p=>p.IsFlashSale == filter.IsFlashSale)
                .Take(8)
                .Select(p => new ProductResponseDto {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    SubCategoryName = p.SubCategory.SubCategoryName,
                    MainImage = p.MainImage,
                    Rating = p.Rating,
                    Sold = p.Sold,
                    Discount = p.Discount,
                    ReviewCount = dbContext.Comments.Where(c=>c.ProductId == p.ProductId).Count(),
                    Price = p.Price
                })
                .ToListAsync();
            return new PageResponseDto<ProductResponseDto>(filter.Index, filter.Size, totalItems, items);
        } else
        {
            var items = await query
                .Include(p=>p.SubCategory)
                .Skip(filter.Index * filter.Size)
                .Take(filter.Size)
                .Select(p => new ProductResponseDto {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    SubCategoryName = p.SubCategory.SubCategoryName,
                    MainImage = p.MainImage,
                    Rating = p.Rating,
                    Sold = p.Sold,
                    Discount = p.Discount,
                    ReviewCount = dbContext.Comments.Where(c=>c.ProductId == p.ProductId).Count(),
                    Price = p.Price
                })
                .ToListAsync();
            return new PageResponseDto<ProductResponseDto>(filter.Index, filter.Size, totalItems, items);
        }
        

        
    }

    public async Task<CategoryResDto> GetSubCategory (Guid categoryId) {
        var categoryName = await dbContext.Categories.Where(c=>c.CategoryId==categoryId).Select(c=>c.CategoryName).FirstOrDefaultAsync();
        var subCategory = await dbContext.SubCategories
                                .Where(s=>s.CategoryId == categoryId)
                                .ToListAsync();
        return new CategoryResDto
        {
            CategoryId = categoryId,
            CategoryName = categoryName,
            SubCategory = subCategory
        };
    }

    public async Task<List<CategoryResDto>> GetSubCategories()
    {
        
        var res = await dbContext.Categories
            .Select(p => new CategoryResDto
            {
                CategoryId = p.CategoryId,
                CategoryName = p.CategoryName,
                SubCategory = dbContext.SubCategories
                    .Where(s => s.CategoryId == p.CategoryId)
                    .ToList()
            })
            .ToListAsync();

        return res;
    }
    
}


