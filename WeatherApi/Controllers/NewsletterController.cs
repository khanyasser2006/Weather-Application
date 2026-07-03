using Microsoft.AspNetCore.Mvc;

namespace WeatherApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NewsletterController : ControllerBase
{
    public class SubscribeRequest
    {
        public string Email { get; set; } = string.Empty;
    }

    [HttpPost("subscribe")]
    public IActionResult Subscribe([FromBody] SubscribeRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || !request.Email.Contains("@"))
        {
            return BadRequest(new { message = "Invalid email address." });
        }

        // Mock saving to Supabase for now
        return Ok(new { message = "Successfully subscribed to the newsletter!" });
    }
}
