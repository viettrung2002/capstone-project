
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;

namespace CoreBuyNow.Controllers;
[ApiController]
[Route("upload")]
public class UploadController (IConfiguration configuration, ILogger<UploadController> logger) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> UploadToCloudinary([FromForm] IFormFile image)
    {
        logger.LogInformation("Uploading image {link}", configuration.GetConnectionString("CLOUDINARY_URL"));
        var cloudinary = new Cloudinary(configuration.GetConnectionString("CLOUDINARY_URL"));
        
        var uploadParams = new ImageUploadParams()
        {
            File = new FileDescription(image.FileName, image.OpenReadStream()),
            PublicId = $"uploads/{Guid.NewGuid()}"
        };
    
        var uploadResult = await cloudinary.UploadAsync(uploadParams);
        return Ok(new { imageUrl = uploadResult.SecureUrl.ToString() });
    }
}