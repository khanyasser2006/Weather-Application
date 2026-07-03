export function getMoonPhase(date) {
  const LUNAR_MONTH = 29.53058867;
  // A known new moon date: Jan 6, 2000
  const NEW_MOON = new Date(Date.UTC(2000, 0, 6, 18, 14, 0)).getTime();
  
  const phase = ((date.getTime() - NEW_MOON) / 1000 / 60 / 60 / 24) % LUNAR_MONTH;
  const age = phase < 0 ? phase + LUNAR_MONTH : phase;
  
  // Illumination percentage
  const illumination = Math.round((1 - Math.cos((age / LUNAR_MONTH) * 2 * Math.PI)) * 50);

  let phaseName = "";
  if (age < 1.84566) phaseName = "New Moon";
  else if (age < 5.53699) phaseName = "Waxing Crescent";
  else if (age < 9.22831) phaseName = "First Quarter";
  else if (age < 12.91963) phaseName = "Waxing Gibbous";
  else if (age < 16.61096) phaseName = "Full Moon";
  else if (age < 20.30228) phaseName = "Waning Gibbous";
  else if (age < 23.99361) phaseName = "Last Quarter";
  else if (age < 27.68493) phaseName = "Waning Crescent";
  else phaseName = "New Moon";

  return { phaseName, illumination, age };
}

export function formatDaylightDuration(seconds) {
  if (!seconds) return "0h 0m";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

export function getSolarNoon(sunriseDate, daylightSeconds) {
  if (!sunriseDate || !daylightSeconds) return "12:00 PM";
  const noon = new Date(sunriseDate.getTime() + (daylightSeconds / 2) * 1000);
  return noon.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}
