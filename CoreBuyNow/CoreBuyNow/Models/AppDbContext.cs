using System.Text.Json;
using System.Text.Json.Serialization;
using CoreBuyNow.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace CoreBuyNow.Models;

public class AppDbContext : DbContext
{
    private static readonly JsonSerializerOptions SJsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = false,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
    };
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<SubCategoryAttribute>() 
            .HasKey(s => new { s.SubcategoryId, s.AttributeId });

        modelBuilder.Entity<Product>()
            .Property(p => p.Specifications)
            .HasColumnType("json")
            .HasConversion(
                v => JsonSerializer.Serialize(v, SJsonOptions),
                v => JsonSerializer.Deserialize<Dictionary<string, string>>(v, SJsonOptions) ??
                     new Dictionary<string, string>());
    }
    public DbSet<Account> Accounts { get; set; }
    public DbSet<Shop> Shops { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<SubCategory> SubCategories { get; set; }
    public DbSet<SubCategoryAttribute> SubCategoryAttributes { get; set; }
    public DbSet<ProductAttribute> ProductAttributes { get; set; }
    
}