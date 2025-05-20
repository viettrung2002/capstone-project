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
        modelBuilder.Entity<Voucher>(entity =>
        {
            entity.HasOne(b => b.Admin)
                .WithMany()
                .HasForeignKey(b => b.AdminId)
                .OnDelete(DeleteBehavior.SetNull);

            entity.HasOne(b => b.Shop)
                .WithMany()
                .HasForeignKey(b => b.ShopId)
                .OnDelete(DeleteBehavior.SetNull);
        });
        
        modelBuilder.Entity<CustomerInteraction>()
            .HasIndex(ui => ui.UserId);
        modelBuilder.Entity<CustomerInteraction>()
            .HasIndex(ui => ui.ProductId);
        
    }
    public DbSet<Account> Accounts { get; set; }
    public DbSet<Shop> Shops { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<ItemInCart> ItemInCarts { get; set; }
    public DbSet<ItemInBill> ItemInBills { get; set; }
    public DbSet<Bill> Bills { get; set; }
    public DbSet<VoucherWallet> VoucherWallets { get; set; }
    public DbSet<Admin> Admins { get; set; }
    public DbSet<CustomerInteraction> CustomerInteractions { get; set; }
    
    public DbSet<Wallet> Wallets { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Voucher> Vouchers { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<SubCategory> SubCategories { get; set; }
    public DbSet<SubCategoryAttribute> SubCategoryAttributes { get; set; }
    public DbSet<ProductAttribute> ProductAttributes { get; set; }
    
}