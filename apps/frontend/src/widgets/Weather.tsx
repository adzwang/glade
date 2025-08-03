import React from "react";

const data = {
  location: "Fleet, UK",
  condition: "Cloudy",
  currentTemp: 17,
  hourly: [
    { time: "13:00", temp: 17 },
    { time: "14:00", temp: 17 },
    { time: "15:00", temp: 16 },
    { time: "16:00", temp: 16 },
    { time: "17:00", temp: 15 },
    { time: "18:00", temp: 14 },
  ],
};

const conditionGradients: Record<string, string> = {
  Sunny: "from-yellow-300 via-orange-300 to-yellow-400",
  Cloudy: "from-slate-400 via-slate-500 to-slate-600",
  Rainy: "from-sky-500 via-blue-600 to-blue-800",
};

const adviceFor = (c: string) => {
  switch (c) {
    case "Rainy": return "Bring a raincoat!";
    case "Cloudy": return "A light jacket should do.";
    case "Sunny": return "Don’t forget sunscreen!";
    default: return "Stay comfy!";
  }
};

function WeatherWidget() {
  const gradient = conditionGradients[data.condition] || conditionGradients.Sunny;
  const advice = adviceFor(data.condition);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative text-white">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-70`} />

      <div className="relative z-10 flex flex-col h-full p-4 justify-between">
        <h3 className="text-xs font-semibold text-center">{meta.name}</h3>

        <div className="flex-1 flex flex-col items-center justify-center space-y-1">
          <p className="text-[11px] leading-none">
            The temperature in {data.location} is
          </p>
          <p
            className="font-bold leading-none"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            {data.currentTemp}°C
          </p>
          <p className="text-xs opacity-90">{advice}</p>
        </div>

        <div className="grid grid-cols-6 gap-1 text-[10px]">
          {data.hourly.map((h) => (
            <div key={h.time} className="flex flex-col items-center">
              <span>{h.time}</span>
              <span className="font-semibold">{h.temp}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const meta = {
  name: "Weather",
  desc: "Current weather at a glance",
  fullBleed: true,
  endpoint: "weather",
  refresh: 30 * 60 // 30 mins
} as const;

export const Component = WeatherWidget;
