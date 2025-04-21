using System.Text.Json.Serialization;
using CoreBuyNow.Models;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Implementations;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Implementations;
using CoreBuyNow.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace CoreBuyNow.Bootstraping;

public static class ApplicationServicesExtensions
{
    
    public static IHostApplicationBuilder AddApplicationServices(this IHostApplicationBuilder builder)
    {
        builder.Services
            .AddControllers()
            .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add( new JsonStringEnumConverter()));
        builder.Services.AddScoped<IAccountRepository, AccountRepository>(); 
        builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
        builder.Services.AddScoped<IShopRepository, ShopRepository>();
        builder.Services.AddScoped<ICommentRepository, CommentRepository>();
        builder.Services.AddScoped<IProductRepository, ProductRepository>();
        builder.Services.AddScoped<IAccountService, AccountService>();
        builder.Services.AddScoped<IProductService, ProductService>();
        builder.Services.AddScoped<ICommentService, CommentService>();
        builder.Services.AddDbContext<AppDbContext>(options =>
        {
            var connectString = builder.Configuration.GetConnectionString("BuyNowConnectionString");
            options.UseMySql(connectString, ServerVersion.AutoDetect(connectString));
        });
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        
        return builder;
    }
    
}