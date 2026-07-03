using System.Text.Json;
using WeatherApi.Models;

namespace WeatherApi.Services;

public interface IGeocodingService
{
    Task<List<LocationDto>> SearchLocationsAsync(string query);
}

public class GeocodingService : IGeocodingService
{
    private readonly HttpClient _httpClient;

    public GeocodingService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<LocationDto>> SearchLocationsAsync(string query)
    {
        var response = await _httpClient.GetAsync($"https://geocoding-api.open-meteo.com/v1/search?name={Uri.EscapeDataString(query)}&count=5&language=en&format=json");
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var document = JsonDocument.Parse(content);
        
        var results = new List<LocationDto>();
        
        if (document.RootElement.TryGetProperty("results", out var resultsElement))
        {
            results = JsonSerializer.Deserialize<List<LocationDto>>(resultsElement.GetRawText(), new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
        }
        
        return results ?? new List<LocationDto>();
    }
}
