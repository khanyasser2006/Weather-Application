export const getWeatherDescription = (code) => {
  switch (code) {
    case 0: return 'Clear Sky';
    case 1: return 'Mainly Clear';
    case 2: return 'Partly Cloudy';
    case 3: return 'Overcast';
    case 45: 
    case 48: return 'Fog';
    case 51:
    case 53:
    case 55: return 'Drizzle';
    case 56:
    case 57: return 'Freezing Drizzle';
    case 61:
    case 63:
    case 65: return 'Rain';
    case 66:
    case 67: return 'Freezing Rain';
    case 71:
    case 73:
    case 75: return 'Snow Fall';
    case 77: return 'Snow Grains';
    case 80:
    case 81:
    case 82: return 'Rain Showers';
    case 85:
    case 86: return 'Snow Showers';
    case 95: return 'Thunderstorm';
    case 96:
    case 99: return 'Thunderstorm with Hail';
    default: return 'Unknown';
  }
};

export const getWeatherIconProps = (code) => {
  // We can import Lucide icons directly in the component, so we just return strings identifying the type
  if (code === 0 || code === 1) return { iconName: 'Sun', color: 'text-yellow-400' };
  if (code === 2 || code === 3) return { iconName: 'CloudSun', color: 'text-white/80' };
  if (code >= 51 && code <= 67) return { iconName: 'CloudRain', color: 'text-blue-400' };
  if (code >= 71 && code <= 86) return { iconName: 'Snowflake', color: 'text-blue-300' };
  if (code >= 95) return { iconName: 'CloudLightning', color: 'text-purple-400' };
  return { iconName: 'Cloud', color: 'text-gray-400' };
};

export const getAqiData = (score) => {
  if (score <= 50) return { text: 'Good', color: 'text-[#10B981]', hex: '#10B981', description: 'Air quality is satisfactory<br/>and poses little or no risk.', dashOffset: 200 };
  if (score <= 100) return { text: 'Moderate', color: 'text-[#FBBF24]', hex: '#FBBF24', description: 'Air quality is acceptable;<br/>however, there may be a risk for some people.', dashOffset: 160 };
  if (score <= 150) return { text: 'Unhealthy SG', color: 'text-[#F97316]', hex: '#F97316', description: 'Members of sensitive groups<br/>may experience health effects.', dashOffset: 100 };
  if (score <= 200) return { text: 'Unhealthy', color: 'text-[#EF4444]', hex: '#EF4444', description: 'Some members of the general public<br/>may experience health effects.', dashOffset: 60 };
  return { text: 'Hazardous', color: 'text-[#991B1B]', hex: '#991B1B', description: 'Health warning of emergency conditions:<br/>everyone is more likely to be affected.', dashOffset: 10 };
};

export const getWindDirection = (degree) => {
  const directions = ['North', 'North East', 'East', 'South East', 'South', 'South West', 'West', 'North West'];
  const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
  return directions[index];
};

export const getAqiStatus = (score) => {
  if (score <= 50) return { label: 'Good', color: '#10B981' };
  if (score <= 100) return { label: 'Moderate', color: '#FBBF24' };
  if (score <= 150) return { label: 'Unhealthy SG', color: '#F97316' };
  if (score <= 200) return { label: 'Unhealthy', color: '#EF4444' };
  if (score <= 300) return { label: 'Very Unhealthy', color: '#991B1B' };
  return { label: 'Hazardous', color: '#7F1D1D' };
};

export const getShortDayName = (dayIndex) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[dayIndex];
};

