using System.Text.Json;
using CoreBuyNow.Models;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Repositories;

public class AddressImporter(AppDbContext db, ILogger<AddressImporter> logger)
{
    public async Task ImportAllAsync(string provincePath, string districtPath, string wardPath)
    {
        var provinces = JsonSerializer.Deserialize<List<ProvinceDto>>(await File.ReadAllTextAsync(provincePath));
        var districts = JsonSerializer.Deserialize<List<DistrictDto>>(await File.ReadAllTextAsync(districtPath));
        var wards = JsonSerializer.Deserialize<List<WardDto>>(await File.ReadAllTextAsync(wardPath));

        var provinceMap = new Dictionary<string, Guid>();
        var districtMap = new Dictionary<string, Guid>();

        foreach (var p in provinces)
        {
            logger.LogInformation(p.Code);
            var id = Guid.NewGuid();
            db.Provinces.Add(new Province
            {
                ProvinceId = id,
                ProvinceName = p.Name
            });
            provinceMap[p.Code] = id;
        }

        await db.SaveChangesAsync();

        foreach (var d in districts)
        {
            if (!provinceMap.TryGetValue(d.ParentCode, out var provinceId)) continue;

            var id = Guid.NewGuid();
            db.Districts.Add(new District
            {
                DistrictId = id,
                DistrictName = d.Name,
                ProvinceId = provinceId
            });
            districtMap[d.Code] = id;
        }

        await db.SaveChangesAsync();

        foreach (var w in wards)
        {
            if (!districtMap.TryGetValue(w.ParentCode, out var districtId)) continue;

            db.Wards.Add(new Ward
            {
                WardId = Guid.NewGuid(),
                WardName = w.Name,
                DistrictId = districtId
            });
        }

        await db.SaveChangesAsync();
    }
}