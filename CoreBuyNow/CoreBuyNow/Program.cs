using CoreBuyNow.Bootstraping;
using Quartz;

namespace CoreBuyNow;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        // Add services to the container.

        builder.AddApplicationServices();

        var app = builder.Build();
        
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        var scheduler = app.Services.GetRequiredService<IScheduler>();
        scheduler.Start();
        
        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseCors("AllowFrontend");
        app.UseAuthorization();
        
        
        app.MapControllers();

        app.Run();
    }
}