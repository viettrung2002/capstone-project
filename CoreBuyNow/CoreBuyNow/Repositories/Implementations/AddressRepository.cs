﻿using CoreBuyNow.Models;
using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoreBuyNow.Repositories.Implementations;

public class AddressRepository (AppDbContext dbContext, ILogger<AddressRepository> logger) : IAddressRepository
{
    public async Task AddAddress(Address address)
    {
        if (address.AddressId == Guid.Empty) address.AddressId = Guid.NewGuid();
        dbContext.Addresses.Add(address);
        await dbContext.SaveChangesAsync();
    }

    public Task UpdateAddress(Address address)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteAddress(Guid addressId)
    {
        var address = dbContext.Addresses.FirstOrDefault(x => x.AddressId == addressId);
        if (address != null) dbContext.Addresses.Remove(address); else throw new Exception("Address not found.");
        await dbContext.SaveChangesAsync();
    }

    public async Task<List<Ward>> GetWardsByDistrictId(Guid districtId)
    {
        return await dbContext.Wards.Where(x => x.DistrictId == districtId).ToListAsync();
    }

    public async Task<List<District>> GetDistrictsByProvinceId(Guid provinceId)
    {
        return await dbContext.Districts.Where(x => x.ProvinceId == provinceId).ToListAsync();
    }

    public async Task<List<Province>> GetProvinces()
    {
        return await dbContext.Provinces.ToListAsync();
    }

    public async Task<List<AddressResponseDto>> GetAddressesByUserId(Guid userId)
    {
        var defaultId = dbContext.Customers.Where(c => c.CustomerId == userId).Select(c => c.DefaultAddressId).FirstOrDefault();
        return await dbContext.Addresses
            .Include(a=>a.Province)
            .Include(a=>a.District)
            .Include(a=>a.Ward)
            .Where(x => x.UserId == userId)
            .Select(x=> new AddressResponseDto
            {
                AddressId = x.AddressId,
                StreetAddress = x.StreetAddress,
                Name = x.Name,
                PhoneNumber = x.PhoneNumber,
                Province = x.Province,
                District = x.District,
                Ward = x.Ward,
                IsDefault = x.AddressId == defaultId
            })
            .ToListAsync();
    }
}