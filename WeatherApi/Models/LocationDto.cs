using System.Text.Json.Serialization;

namespace WeatherApi.Models;

public class LocationDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Country { get; set; } = string.Empty;
    
    [JsonPropertyName("admin1")]
    public string Admin1 { get; set; } = string.Empty; // State/Province
}
