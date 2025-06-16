using CoreBuyNow.Models.Entities;
using CoreBuyNow.Repositories;
using CoreBuyNow.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;
[ApiController]
[Route("api/address")]
public class AddressController (AddressImporter addressImporter, IAddressRepository addressRepository) : ControllerBase
{
    [HttpGet("import")]
    public async Task<IActionResult> ImportAllAsync()
    {
        var basePath = Path.Combine(Directory.GetCurrentDirectory(), "Data");
        await addressImporter.ImportAllAsync(Path.Combine(basePath, "cities.json"),
            Path.Combine(basePath, "districts.json"),
            Path.Combine(basePath, "wards.json"));
        return Ok();
    }
    
    [HttpPost]
    [Authorize(Roles = "Customer, Shop")]
    public async Task<IActionResult> AddAddress(Address address)
    {
        try
        {
            var id = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(id)) return Unauthorized();
            address.UserId = Guid.Parse(id);
            await addressRepository.AddAddress(address);
            return Ok(new { message = "Address imported successfully" });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpPut("default")]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> SetDefaultAddress(Guid addressId)
    {
        try
        {
            var id = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(id)) return Unauthorized();
            await addressRepository.SetDefaultAddressId(addressId, Guid.Parse(id));
            return Ok(new { message = "Address imported successfully" });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [HttpPut]
    public async Task<IActionResult> UpdateAddress([FromBody] Address address)
    {
        try
        {
            await addressRepository.UpdateAddress(address);
            return Ok(new { message = "Address updated successfully" });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAddress(Guid addressId)
    {
        try
        {
            await addressRepository.DeleteAddress(addressId);
            return Ok(new { message = "Address deleted successfully" });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("wards/{districtId:guid}")]
    public async Task<IActionResult> GetWardsByDistrictId(Guid districtId)
    {
        try
        {
            var wards = await addressRepository.GetWardsByDistrictId(districtId);
            return Ok(new {data = wards });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("districts/{provinceId:guid}")]
    public async Task<IActionResult> GetDistrictsByProvinceId(Guid provinceId)
    {
        try
        {
            var districts = await addressRepository.GetDistrictsByProvinceId(provinceId);
            return Ok(new {data = districts });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("provinces")]
    public async Task<IActionResult> GetProvinces()
    {
        try
        {
            var provinces = await addressRepository.GetProvinces();
            return Ok(new {data = provinces });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("user")]
    [Authorize(Roles = "Customer, Shop")]
    public async Task<IActionResult> GetAddressesByUserId()
    {
        try
        {
            var id = User.FindFirst("id")?.Value;
            if (id == null) return Unauthorized();
            var addresses = await addressRepository.GetAddressesByUserId(Guid.Parse(id));
            return Ok(new
            {
                data = addresses
            });

        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}