"use client";

import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL, LOCATION } from "@/lib/config";

interface RawWeatherResponse {
  location: { name: string; region: string; country: string; tz_id: string; localtime: string };
  current: { temp_c: number; condition_text: string; is_day: number };
  forecast: Array<{ time: string; temp_c: number; condition_text: string; is_day: number }>;
}

const normalizeCondition = (text: string, isDay: number): string => {
  const t = text.toLowerCase();
  if (t.includes("rain")) return "Rainy";
  if (t.includes("snow")) return "Snowy";
  if (t.includes("cloud")) return "Cloudy";
  if (t.includes("clear") || t.includes("sunny")) return isDay ? "Sunny" : "ClearNight";
  return isDay ? "Sunny" : "ClearNight";
};

const conditionGradients: Record<string, string> = {
  Sunny: "from-yellow-300 via-orange-300 to-yellow-400",
  ClearNight: "from-gray-700 via-gray-800 to-black",
  Cloudy: "from-slate-400 via-slate-500 to-slate-600",
  Rainy: "from-sky-500 via-blue-600 to-blue-800",
  Snowy: "from-blue-100 via-white to-blue-200",
};

const conditionAdvice: Record<string,string> = {
  Rainy: "Bring a raincoat!",
  Snowy: "Wrap up warm!",
  Cloudy: "Sweater Weather?",
  ClearNight: "Clear skies tonight.",
  Sunny: "Don't forget sunscreen!",
};

const adviceFor = (c: string): string => conditionAdvice[c] || "Dress for the day!";

export const meta = {
  name: "Weather",
  desc: "Current weather at a glance",
  fullBleed: true,
  endpoint: "weather",
  refresh: 30 * 60, // 30 mins
} as const;

export function WeatherWidget() {
  const [weather, setWeather] = useState<RawWeatherResponse | null>(null);
  useEffect(() => {
    fetch(`${BACKEND_BASE_URL}/api/widgets/${meta.endpoint}/?location=${LOCATION}`)
      .then(res => res.json())
      .then(json => setWeather(json.data))
      .catch(console.error);
  }, []);

  if (!weather) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-2xl overflow-hidden relative text-white">
        Loading...
      </div>
    );
  }

  const { current, forecast } = weather;
  const key = normalizeCondition(current.condition_text, current.is_day);
  const gradient = conditionGradients[key] || conditionGradients.Sunny;
  const advice = adviceFor(key);
  const hourly = forecast.slice(0,6);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative text-white">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-70`} />

      <div className="relative z-10 flex flex-col h-full p-4 justify-between">
        <h3 className="text-xs font-semibold text-center">{meta.name}</h3>

        <div className="flex-1 flex flex-col items-center justify-center space-y-1">
          <p className="text-[11px] leading-none">
            The temperature in {LOCATION} is
          </p>
          <p
            className="font-bold leading-none"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            {current.temp_c.toFixed(0)}°C
          </p>
          <p className="text-xs opacity-90">{advice}</p>
        </div>

        <div className="grid grid-cols-6 gap-1 text-[10px]">
          {hourly.map((h) => (
            <div key={h.time} className="flex flex-col items-center">
              <span>{h.time.split(" ")[1]}</span>
              <span className="font-semibold">{h.temp_c.toFixed(0)}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Component = WeatherWidget;
