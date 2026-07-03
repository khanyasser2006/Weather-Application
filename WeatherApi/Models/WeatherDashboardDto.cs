using System.Text.Json.Serialization;

namespace WeatherApi.Models;

public class WeatherDashboardDto
{
    [JsonPropertyName("current")]
    public CurrentWeatherDto Current { get; set; } = new();

    [JsonPropertyName("hourly")]
    public List<HourlyForecastDto> Hourly { get; set; } = new();

    [JsonPropertyName("daily")]
    public List<DailyForecastDto> Daily { get; set; } = new();

    [JsonPropertyName("aqi")]
    public AqiDto Aqi { get; set; } = new();

    [JsonPropertyName("sunMoon")]
    public SunMoonDto SunMoon { get; set; } = new();

    [JsonPropertyName("alerts")]
    public List<AlertDto> Alerts { get; set; } = new();
}

public class CurrentWeatherDto
{
    public double Temp { get; set; }
    public double FeelsLike { get; set; }
    public double Humidity { get; set; }
    public double Pressure { get; set; }
    public double WindSpeed { get; set; }
    public double Visibility { get; set; }
    public double UvIndex { get; set; }
    public double WindDirection { get; set; }
    public int WeatherCode { get; set; }
}

public class HourlyForecastDto
{
    public string Time { get; set; } = string.Empty;
    public double Temp { get; set; }
    public double FeelsLike { get; set; }
    public double Humidity { get; set; }
    public double UvIndex { get; set; }
    public int WeatherCode { get; set; }
    public double WindSpeed { get; set; }
    public double PrecipitationProbability { get; set; }
}

public class DailyForecastDto
{
    public string Date { get; set; } = string.Empty;
    public double TempMax { get; set; }
    public double TempMin { get; set; }
    public int WeatherCode { get; set; }
    public double PrecipitationProbability { get; set; }
    public double UvIndexMax { get; set; }
    public double WindSpeedMax { get; set; }
    public string Sunrise { get; set; } = string.Empty;
    public string Sunset { get; set; } = string.Empty;
}

public class AqiDto
{
    public int Score { get; set; }
    public double Pm25 { get; set; }
    public double Pm10 { get; set; }
    public double O3 { get; set; }
    public double No2 { get; set; }
    public double Co { get; set; }
    public double So2 { get; set; }
}

public class SunMoonDto
{
    public string Sunrise { get; set; } = string.Empty;
    public string Sunset { get; set; } = string.Empty;
    public double DaylightDuration { get; set; }
}

public class AlertDto
{
    public string Event { get; set; } = string.Empty;
    public string Headline { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Severity { get; set; } = string.Empty;
}
