using CoreBuyNow.Models.Entities;
using CoreBuyNow.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
[ApiController]
[Route("/api/customer")]
public class CustomerController (ICustomerService customerService, ILogger<CustomerController> logger) : ControllerBase 
{
    [HttpGet]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> GetCustomerById () {
        try
        {
            var id = User.FindFirst("id")?.Value;
            logger.LogInformation("id nhan duoc {id}",id);
            return Ok(new{
                data = await customerService.GetCustomerById(Guid.Parse(id))
            });
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut]
    [Authorize(Roles = "Customer")]
    public async Task<IActionResult> EditCustomer(Customer customer)
    {
        var id = User.FindFirst("id")?.Value;
        await customerService.EditCustomer(customer, Guid.Parse(id));
        return Ok(new
        {
            message = "Customer updated",
        });
    }
}