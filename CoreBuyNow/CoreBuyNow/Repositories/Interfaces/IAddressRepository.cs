using CoreBuyNow.Models.DTOs;
using CoreBuyNow.Models.Entities;

namespace CoreBuyNow.Repositories.Interfaces;

public interface IAddressRepository
{
    Task AddAddress(Address address);
    Task UpdateAddress(Address address);
    Task DeleteAddress(Guid addressId);
    Task<List<Ward>> GetWardsByDistrictId(Guid districtId);
    Task<List<District>> GetDistrictsByProvinceId(Guid provinceId);
    Task<List<Province>> GetProvinces();
    Task<List<AddressResponseDto>> GetAddressesByUserId(Guid districtId);
}