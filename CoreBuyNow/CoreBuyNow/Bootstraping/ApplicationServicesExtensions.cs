using System.Text;
using System.Text.Json.Serialization;
using CoreBuyNow.Models;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Implementations;
using CoreBuyNow.Repositories.Interfaces;
using CoreBuyNow.Services.Implementations;
using CoreBuyNow.Services.Interfaces;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Quartz.AspNetCore;
using Quartz;
using Quartz.Impl;

namespace CoreBuyNow.Bootstraping;

public static class ApplicationServicesExtensions
{
    
    public static IHostApplicationBuilder AddApplicationServices(this IHostApplicationBuilder builder)
    {
        
        var jwtSettings = builder.Configuration.GetSection("JwtSettings");
        var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);
        builder.Services
            .AddControllers()
            .AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add( new JsonStringEnumConverter()));

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend", policy =>
            {
                policy.WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });
        builder.Services.AddQuartz(q =>
        {
            q.UseMicrosoftDependencyInjectionJobFactory();
            q.UseInMemoryStore(); // Lưu ý: Chuyển sang AdoJobStore nếu cần bền vững
            q.UseDefaultThreadPool(options => options.MaxConcurrency = 10); // Tăng thread pool
        });
        
        builder.Services.AddSingleton(provider =>
        {
            var schedulerFactory = provider.GetRequiredService<ISchedulerFactory>();
            return schedulerFactory.GetScheduler().Result;
        });
        builder.Services.AddQuartzHostedService(opt => opt.WaitForJobsToComplete = true);
        builder.Services.AddTransient<IssueVoucherJob>();
        builder.Services.AddScoped<IAccountRepository, AccountRepository>(); 
        builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
        builder.Services.AddScoped<IShopRepository, ShopRepository>();
        builder.Services.AddScoped<ICommentRepository, CommentRepository>();
        builder.Services.AddScoped<ICartRepository, CartRepository>();
        builder.Services.AddScoped<IProductRepository, ProductRepository>();
        builder.Services.AddScoped<IBillRepository, BillRepository>();
        builder.Services.AddScoped<IVoucherRepository, VoucherRepository>();
        
        builder.Services.AddScoped<IAccountService, AccountService>();
        builder.Services.AddScoped<IProductService, ProductService>();
        builder.Services.AddScoped<ICommentService, CommentService>();
        builder.Services.AddScoped<ICartService, CartService>();
        builder.Services.AddScoped<IBillService, BillService>();
        builder.Services.AddScoped<IVoucherService, VoucherService>();

        builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = false,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidAudience = jwtSettings["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };
            });

        builder.Services.AddAuthorization();
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