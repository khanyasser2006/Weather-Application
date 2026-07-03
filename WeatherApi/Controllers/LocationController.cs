using Microsoft.AspNetCore.Mvc;
using WeatherApi.Models;
using WeatherApi.Services;

namespace WeatherApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LocationController : ControllerBase
{
    private readonly IGeocodingService _geocodingService;

    public LocationController(IGeocodingService geocodingService)
    {
        _geocodingService = geocodingService;
    }

    [HttpGet("search")]
    public async Task<ActionResult<List<LocationDto>>> Search([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return BadRequest(new { message = "Query cannot be empty" });
        }

        try
        {
            var results = await _geocodingService.SearchLocationsAsync(query);
            return Ok(results);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while searching for locations.", details = ex.Message });
        }
    }
}
