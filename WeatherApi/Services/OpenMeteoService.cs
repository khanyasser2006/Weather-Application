using System.Text.Json;
using WeatherApi.Models;

namespace WeatherApi.Services;

public interface IOpenMeteoService
{
    Task<WeatherDashboardDto> GetWeatherDashboardAsync(double lat, double lon);
}

public class OpenMeteoService : IOpenMeteoService
{
    private readonly HttpClient _httpClient;

    public OpenMeteoService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<WeatherDashboardDto> GetWeatherDashboardAsync(double lat, double lon)
    {
        var weatherUrl = $"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,visibility&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,uv_index_max,wind_speed_10m_max,daylight_duration&forecast_days=10&timezone=auto";
        var aqiUrl = $"https://air-quality-api.open-meteo.com/v1/air-quality?latitude={lat}&longitude={lon}&current=pm10,pm2_5,nitrogen_dioxide,ozone,carbon_monoxide,sulphur_dioxide,us_aqi&timezone=auto";

        var weatherTask = _httpClient.GetAsync(weatherUrl);
        var aqiTask = _httpClient.GetAsync(aqiUrl);

        await Task.WhenAll(weatherTask, aqiTask);

        var weatherResponse = await weatherTask;
        var aqiResponse = await aqiTask;

        weatherResponse.EnsureSuccessStatusCode();
        aqiResponse.EnsureSuccessStatusCode();

        var weatherContent = await weatherResponse.Content.ReadAsStringAsync();
        var aqiContent = await aqiResponse.Content.ReadAsStringAsync();

        var weatherDoc = JsonDocument.Parse(weatherContent);
        var aqiDoc = JsonDocument.Parse(aqiContent);

        var dashboard = new WeatherDashboardDto();

        // Map Current Weather
        if (weatherDoc.RootElement.TryGetProperty("current", out var currentEl))
        {
            dashboard.Current = new CurrentWeatherDto
            {
                Temp = currentEl.GetProperty("temperature_2m").GetDouble(),
                FeelsLike = currentEl.GetProperty("apparent_temperature").GetDouble(),
                Humidity = currentEl.GetProperty("relative_humidity_2m").GetDouble(),
                Pressure = currentEl.GetProperty("surface_pressure").GetDouble(),
                WindSpeed = currentEl.GetProperty("wind_speed_10m").GetDouble(),
                WindDirection = currentEl.TryGetProperty("wind_direction_10m", out var wDir) ? wDir.GetDouble() : 0,
                Visibility = currentEl.TryGetProperty("visibility", out var vis) ? vis.GetDouble() : 10000,
                WeatherCode = currentEl.GetProperty("weather_code").GetInt32()
            };
        }

        // Map AQI
        if (aqiDoc.RootElement.TryGetProperty("current", out var aqiCurrentEl))
        {
            dashboard.Aqi = new AqiDto
            {
                Score = aqiCurrentEl.GetProperty("us_aqi").GetInt32(),
                Pm10 = aqiCurrentEl.TryGetProperty("pm10", out var pm10) ? pm10.GetDouble() : 0,
                Pm25 = aqiCurrentEl.TryGetProperty("pm2_5", out var pm25) ? pm25.GetDouble() : 0,
                O3 = aqiCurrentEl.TryGetProperty("ozone", out var o3) ? o3.GetDouble() : 0,
                No2 = aqiCurrentEl.TryGetProperty("nitrogen_dioxide", out var no2) ? no2.GetDouble() : 0,
                Co = aqiCurrentEl.TryGetProperty("carbon_monoxide", out var co) ? co.GetDouble() : 0,
                So2 = aqiCurrentEl.TryGetProperty("sulphur_dioxide", out var so2) ? so2.GetDouble() : 0
            };
        }

        // Map Hourly
        if (weatherDoc.RootElement.TryGetProperty("hourly", out var hourlyEl))
        {
            var times = hourlyEl.GetProperty("time").EnumerateArray().ToList();
            var temps = hourlyEl.GetProperty("temperature_2m").EnumerateArray().ToList();
            var feelsLikes = hourlyEl.GetProperty("apparent_temperature").EnumerateArray().ToList();
            var humidities = hourlyEl.GetProperty("relative_humidity_2m").EnumerateArray().ToList();
            var uvs = hourlyEl.GetProperty("uv_index").EnumerateArray().ToList();
            var codes = hourlyEl.GetProperty("weather_code").EnumerateArray().ToList();
            var winds = hourlyEl.GetProperty("wind_speed_10m").EnumerateArray().ToList();
            var precip = hourlyEl.GetProperty("precipitation_probability").EnumerateArray().ToList();

            for (int i = 0; i < Math.Min(72, times.Count); i++) // Take next 72 hours
            {
                dashboard.Hourly.Add(new HourlyForecastDto
                {
                    Time = times[i].GetString() ?? "",
                    Temp = temps[i].GetDouble(),
                    FeelsLike = feelsLikes[i].GetDouble(),
                    Humidity = humidities[i].GetDouble(),
                    UvIndex = uvs[i].GetDouble(),
                    WeatherCode = codes[i].GetInt32(),
                    WindSpeed = winds[i].GetDouble(),
                    PrecipitationProbability = precip[i].GetDouble()
                });
            }
        }

        // Map Daily & Sun/Moon
        if (weatherDoc.RootElement.TryGetProperty("daily", out var dailyEl))
        {
            var dates = dailyEl.GetProperty("time").EnumerateArray().ToList();
            var maxTemps = dailyEl.GetProperty("temperature_2m_max").EnumerateArray().ToList();
            var minTemps = dailyEl.GetProperty("temperature_2m_min").EnumerateArray().ToList();
            var dailyCodes = dailyEl.GetProperty("weather_code").EnumerateArray().ToList();
            var precipMax = dailyEl.GetProperty("precipitation_probability_max").EnumerateArray().ToList();
            var uvMax = dailyEl.GetProperty("uv_index_max").EnumerateArray().ToList();
            var windMax = dailyEl.GetProperty("wind_speed_10m_max").EnumerateArray().ToList();
            
            var sunrises = dailyEl.GetProperty("sunrise").EnumerateArray().ToList();
            var sunsets = dailyEl.GetProperty("sunset").EnumerateArray().ToList();
            var daylightDurations = dailyEl.GetProperty("daylight_duration").EnumerateArray().ToList();

            if (sunrises.Count > 0 && sunsets.Count > 0)
            {
                dashboard.SunMoon = new SunMoonDto
                {
                    Sunrise = sunrises[0].GetString() ?? "",
                    Sunset = sunsets[0].GetString() ?? "",
                    DaylightDuration = daylightDurations.Count > 0 ? daylightDurations[0].GetDouble() : 0
                };
            }

            for (int i = 0; i < dates.Count; i++) // Usually 7-10 days
            {
                dashboard.Daily.Add(new DailyForecastDto
                {
                    Date = dates[i].GetString() ?? "",
                    TempMax = maxTemps[i].GetDouble(),
                    TempMin = minTemps[i].GetDouble(),
                    WeatherCode = dailyCodes[i].GetInt32(),
                    PrecipitationProbability = precipMax[i].GetDouble(),
                    UvIndexMax = uvMax[i].GetDouble(),
                    WindSpeedMax = windMax[i].GetDouble(),
                    Sunrise = sunrises[i].GetString() ?? "",
                    Sunset = sunsets[i].GetString() ?? ""
                });
            }
        }

        // Mocking alerts for now as Open-Meteo does not provide text alerts out of the box
        // in their free tier easily without specialized endpoints.
        dashboard.Alerts = new List<AlertDto>();

        return dashboard;
    }
}
