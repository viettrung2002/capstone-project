using CoreBuyNow.Models;
using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using Quartz; 
using Quartz.Impl;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Quartz;
using System;
using System.Threading.Tasks;
using VoucherWallet = CoreBuyNow.Models.Entities.VoucherWallet;

namespace CoreBuyNow.Repositories.Implementations;

public class VoucherRepository ( IScheduler scheduler ,AppDbContext dbContext, ILogger<VoucherRepository> logger) : IVoucherRepository
{
    // public async Task CreateVoucher(Voucher voucher)
    // {
    //     if (voucher.VoucherId == Guid.Empty) voucher.VoucherId = Guid.NewGuid();
    //     if (DateTime.SpecifyKind(voucher.StatTime, DateTimeKind.Utc) <= DateTime.UtcNow) throw new Exception("Voucher Stat Time is in the future");
    //     
    //     var hasShop = voucher.ShopId != null && voucher.ShopId != Guid.Empty;
    //     var hasAdmin = voucher.AdminId != null && voucher.AdminId != Guid.Empty;
    //     if (hasShop && hasAdmin) throw new Exception("Chi chon 1 trong 2 ");
    //     voucher.IsIssued = false;
    //     dbContext.Vouchers.Add(voucher);
    //     logger.LogInformation("StartTime: {time}", voucher.StatTime);
    //     var startTimeUtc = DateTime.UtcNow.AddMinutes(1);
    //     // var startTimeUtc = voucher.StatTime.ToUniversalTime();
    //     logger.LogInformation("StartTimeUTC: {time}", startTimeUtc);
    //     var timeZone = TimeZoneInfo.FindSystemTimeZoneById("UTC");
    //     await dbContext.SaveChangesAsync();
    //     var jobDetail = JobBuilder.Create<IssueVoucherJob>()
    //         .UsingJobData("VoucherId", voucher.VoucherId)
    //         .Build();
    //
    //     var trigger = TriggerBuilder.Create()
    //         .WithIdentity("VoucherTrigger_" + voucher.VoucherId)
    //         .StartAt(startTimeUtc)
    //         .Build();
    //     logger.LogInformation("Trigger created: Key={key}, StartTime={startTime}, NextFireTime={nextFireTime}",
    //         trigger.Key, trigger.StartTimeUtc, trigger.GetNextFireTimeUtc());
    //     await scheduler.ScheduleJob(jobDetail, trigger);
    //     logger.LogInformation("Trigger scheduled: Key={key}, StartTime={startTime}, NextFireTime={nextFireTime}, State={state}", 
    //         trigger.Key, trigger.StartTimeUtc, trigger.GetNextFireTimeUtc(), await scheduler.GetTriggerState(trigger.Key));
    //     
    // }
    public async Task CreateVoucher(Voucher voucher)
    {
        if (voucher.VoucherId == Guid.Empty)
            voucher.VoucherId = Guid.NewGuid();

        logger.LogInformation("Start Time : {time}", DateTime.SpecifyKind(voucher.StartTime, DateTimeKind.Utc));
        logger.LogInformation("Now : {time}", DateTime.UtcNow);
        // Kiểm tra thời gian
        if (DateTime.SpecifyKind(voucher.StartTime, DateTimeKind.Utc) <= DateTime.UtcNow)
            throw new Exception("Voucher Start Time must be in the future");

        var hasShop = voucher.ShopId != null && voucher.ShopId != Guid.Empty;
        var hasAdmin = voucher.AdminId != null && voucher.AdminId != Guid.Empty;
        if (hasShop && hasAdmin)
            throw new Exception("Chỉ chọn 1 trong 2: ShopId hoặc AdminId");

        voucher.IsIssued = false;
        dbContext.Vouchers.Add(voucher);

        logger.LogInformation("StartTime: {time}", voucher.StartTime);
        // var startTimeUtc = DateTime.UtcNow.AddMinutes(1);
        var startTimeUtc = voucher.StartTime.ToUniversalTime();// Chạy sau 1 phút
        logger.LogInformation("Current UTC time: {utcNow}, StartTimeUTC: {time}", DateTime.UtcNow, startTimeUtc);

        // Kiểm tra startTimeUtc
        if (startTimeUtc <= DateTime.UtcNow)
            throw new Exception($"Invalid StartTimeUtc: {startTimeUtc} is not in the future");

        await dbContext.SaveChangesAsync();

        // Tạo job và trigger
        var jobDetail = JobBuilder.Create<IssueVoucherJob>()
            .UsingJobData("VoucherId", voucher.VoucherId.ToString())
            .Build();

        var trigger = TriggerBuilder.Create()
            .WithIdentity("VoucherTrigger_" + voucher.VoucherId)
            .StartAt(startTimeUtc)
            .WithSimpleSchedule(x => x
                .WithRepeatCount(0) // Chỉ chạy 1 lần
                .WithMisfireHandlingInstructionFireNow())
            .Build();

        logger.LogInformation("Trigger created: Key={key}, StartTime={startTime}, NextFireTime={nextFireTime}",
            trigger.Key, trigger.StartTimeUtc, trigger.GetNextFireTimeUtc());
        await scheduler.ScheduleJob(jobDetail, trigger);
        logger.LogInformation("Trigger scheduled: Key={key}, StartTime={startTime}, NextFireTime={nextFireTime}, State={state}",
            trigger.Key, trigger.StartTimeUtc, trigger.GetNextFireTimeUtc(), await scheduler.GetTriggerState(trigger.Key));

        // Kiểm tra trigger
        var triggerState = await scheduler.GetTriggerState(trigger.Key);
        logger.LogInformation("Trigger {key} state after scheduling: {state}", trigger.Key, triggerState);
    }
    public async Task<VoucherDto> GetVoucher(Guid voucherId)
    {
        var voucher = await dbContext.Vouchers.FindAsync(voucherId);
        if (voucher.AdminId != Guid.Empty)
        {
            return await dbContext.Vouchers
                .Include(v => v.Admin)
                .Where(v => v.VoucherId == voucherId)
                .Select(v => new VoucherDto
                {
                    VoucherId = voucherId,
                    VoucherName = v.VoucherName,
                    StartTime = v.StartTime,
                    EndTime = v.EndTime,
                    Value = v.Value,
                    Quantity = v.Quantity,
                    MinPrice = v.MinPrice,
                    ShopId = null,
                    ShopName = null,
                    AdminId = v.AdminId,
                    AdminName = v.Admin.Name,
                    Role = v.Role
                })
                .FirstOrDefaultAsync();
        }
        return await dbContext.Vouchers
            .Include(v => v.Shop)
            .Where(v => v.VoucherId == voucherId)
            .Select(v => new VoucherDto
            {
                VoucherId = voucherId,
                VoucherName = v.VoucherName,
                StartTime = v.StartTime,
                EndTime = v.EndTime,
                Value = v.Value,
                Quantity = v.Quantity,
                MinPrice = v.MinPrice,
                ShopId = v.ShopId,
                ShopName = v.Shop.ShopName,
                AdminId = null,
                AdminName = null,
                Role = v.Role
            })
            .FirstOrDefaultAsync();
        
            
    }

    public async Task<PageResponseDto<VoucherDto>> GetAllVoucher(Role role, int pageIndex = 1, int pageSize = 10)
    {
        return new PageResponseDto<VoucherDto>(
            pageIndex,
            pageSize,
            await dbContext.Vouchers.CountAsync(v=>v.Role == role),
            await dbContext.Vouchers
                .Include(v => v.Admin)
                .Include(v => v.Shop)
                .Where(v=>v.EndTime >= DateTime.Now && v.StartTime<=DateTime.Now && v.Role == role)
                .OrderByDescending(b => b.Value)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .Select(v=>new VoucherDto
                {
                    VoucherId = v.VoucherId,
                    VoucherName = v.VoucherName,
                    StartTime = v.StartTime,
                    EndTime = v.EndTime,
                    Value = v.Value,
                    Quantity = v.Quantity,
                    MinPrice = v.MinPrice,
                    ShopId = v.ShopId,
                    ShopName = v.Shop.ShopName,
                    AdminId = v.AdminId,
                    AdminName = v.Admin.Name,
                    Role = v.Role
                })
                .ToListAsync()
            
        );
    }
    
    
    public async Task<PageResponseDto<VoucherDto>> GetAllVoucher(int pageIndex = 1, int pageSize = 10)
    {
        return new PageResponseDto<VoucherDto>(
            pageIndex,
            pageSize,
            await dbContext.Vouchers.CountAsync(),
            await dbContext.Vouchers
                .Include(v => v.Admin)
                .Include(v => v.Shop)
                // .Where(v=>v.EndTime >= DateTime.Now && v.StatTime<=DateTime.Now)
                .OrderByDescending(b => b.Value)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .Select(v=>new VoucherDto
                {
                    VoucherId = v.VoucherId,
                    VoucherName = v.VoucherName,
                    StartTime = v.StartTime,
                    EndTime = v.EndTime,
                    Value = v.Value,
                    Quantity = v.Quantity,
                    MinPrice = v.MinPrice,
                    ShopId = v.ShopId,
                    ShopName = v.Shop.ShopName,
                    AdminId = v.AdminId,
                    AdminName = v.Admin.Name,
                    Role = v.Role
                })
                .ToListAsync()
            
            );
    }

    public async Task UpdateVoucher(Voucher voucher, Guid voucherId)
    {
        var existingVoucher = await dbContext.Vouchers.FindAsync(voucherId);
        if (existingVoucher == null) throw new Exception("Voucher not found");
        existingVoucher.VoucherName = voucher.VoucherName;
        existingVoucher.Quantity = voucher.Quantity;
        existingVoucher.MinPrice = voucher.MinPrice;
        existingVoucher.EndTime = voucher.EndTime;
        existingVoucher.Value = voucher.Value;
        dbContext.Vouchers.Update(existingVoucher);
        await dbContext.SaveChangesAsync();
    }

    public async Task DeleteVoucher(Guid voucherId)
    {
        var voucher = await dbContext.Vouchers.FindAsync(voucherId);
        if (voucher == null) throw new Exception("Voucher not found");
        dbContext.Vouchers.Remove(voucher);
        await dbContext.SaveChangesAsync();
    }
    
    public async Task<List<Voucher>> GetVoucherAdmin()
    {
        return await dbContext.Vouchers
            .ToListAsync();
    }
    
    public async Task<List<Voucher>> GetVoucherShop(Guid shopId)
    {
        return await dbContext.Vouchers
            .Where(v => v.ShopId == shopId)
            .ToListAsync();
    }

    public async Task<List<VoucherWallet>> GetVoucherAdminWallet(Guid customerId)
    {
        return await dbContext.VoucherWallets
            .Include(v=>v.Voucher)
            .Where(v=>v.CustomerId == customerId && (v.Voucher.AdminId != Guid.Empty && v.Voucher.AdminId != null) && v.Quantity>0)
            .ToListAsync();
    }
    public async Task<List<VoucherWallet>> GetVoucherShopWallet(Guid customerId, Guid shopId)
    {
        return await dbContext.VoucherWallets
            .Include(v=>v.Voucher)
            .Where(v=>v.CustomerId == customerId && v.Voucher.ShopId == shopId )
            .ToListAsync();
    }

    public async Task IssueVoucher(Guid voucherId)
    {
        var voucher = await dbContext.Vouchers.FindAsync(voucherId);
        if (voucher == null || voucher.IsIssued) return;
        var customerIds = await dbContext.Customers.Select(c=>c.CustomerId).ToListAsync();

        foreach (var id in customerIds)
        {
            dbContext.VoucherWallets.Add(new VoucherWallet
            {
                VoucherWalletId = Guid.NewGuid(),
                CustomerId = id,
                VoucherId = voucherId,
                Quantity = 1,
                Voucher = voucher
            });
        }
        voucher.IsIssued = true;
        await dbContext.SaveChangesAsync();
    }
}




public class IssueVoucherJob : IJob
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<IssueVoucherJob> _logger;

    public IssueVoucherJob(IServiceScopeFactory scopeFactory, ILogger<IssueVoucherJob> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    public async Task Execute(IJobExecutionContext context)
    {
        _logger.LogDebug("Attempting to execute IssueVoucherJob for trigger {triggerKey}", context.Trigger.Key);
        using var scope = _scopeFactory.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        try
        {
            _logger.LogInformation("Starting IssueVoucherJob at {time}", DateTime.UtcNow);
            if (dbContext.Database.CanConnect())
            {
                _logger.LogInformation("Database connection successful");
            }
            else
            {
                _logger.LogError("Failed to connect to database");
                return;
            }

            var voucherIdString = context.MergedJobDataMap.GetString("VoucherId");
            _logger.LogInformation("Received VoucherId string: {voucherIdString}", voucherIdString);
            if (!Guid.TryParse(voucherIdString, out var voucherId))
            {
                _logger.LogError("Invalid VoucherId format: {voucherId}", voucherIdString);
                return;
            }

            _logger.LogInformation("Executing job for VoucherId: {voucherId}", voucherId);
            var voucher = await dbContext.Vouchers.FindAsync(voucherId);
            if (voucher == null)
            {
                _logger.LogWarning("Voucher not found for VoucherId: {voucherId}. Check if voucher was created correctly.", voucherId);
                return;
            }

            var customers = await dbContext.Customers.ToListAsync();
            foreach (var c in customers)
            {
                dbContext.VoucherWallets.Add(new VoucherWallet
                {
                    VoucherWalletId = Guid.NewGuid(),
                    CustomerId = c.CustomerId,
                    Quantity = voucher.PerUserQuantity,
                    VoucherId = voucher.VoucherId,
                });
            }
            if (voucher.IsIssued)
            {
                _logger.LogInformation("Voucher {voucherId} already issued, skipping", voucherId);
                return;
            }
            
            voucher.IsIssued = true;
            var changes = await dbContext.SaveChangesAsync();
            _logger.LogInformation("Saved {changes} changes for VoucherId: {voucherId}", changes, voucherId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error executing job for VoucherId: {voucherId}. StackTrace: {stackTrace}",
                context.MergedJobDataMap.GetString("VoucherId"), ex.StackTrace);
        }
    }
}

    