using Microsoft.AspNetCore.Mvc;
using WeatherApi.Models;
using WeatherApi.Services;

namespace WeatherApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly IOpenMeteoService _weatherService;

    public WeatherController(IOpenMeteoService weatherService)
    {
        _weatherService = weatherService;
    }

    [HttpGet("dashboard")]
    public async Task<ActionResult<WeatherDashboardDto>> GetDashboard([FromQuery] double lat, [FromQuery] double lon)
    {
        try
        {
            var result = await _weatherService.GetWeatherDashboardAsync(lat, lon);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while fetching weather data.", details = ex.Message });
        }
    }
}
