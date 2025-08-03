import httpx
from typing import Any, Dict, List
from dateutil import parser, tz

location_mapping = {
  "london": "51.498972, -0.179071"
}

class WeatherAPIClient:
  """
  A simple client for accessing current weather and hourly forecast data from WeatherAPI.com.
  """

  BASE_URL = "http://api.weatherapi.com/v1"

  def __init__(self, api_key: str, location: str) -> None:
    self.api_key = api_key
    self.location = location_mapping[location.lower()]

  def _GET(self, endpoint: str, params: Dict[str, Any]) -> Dict[str, Any]:
    url = f"{self.BASE_URL}/{endpoint}.json"
    query = {"key": self.api_key, "q": self.location, **params}

    response = httpx.get(url, params=query)
    response.raise_for_status()

    return response.json()

  def get_current_and_forecast(self, hours: int = 6) -> Dict[str, Any]:
    """
    Fetch both current conditions and the next N hours forecast in one call.
    """
    params = {"days": 2, "aqi": "no", "alerts": "no"}
    data = self._GET("forecast", params)

    all_hours = [
      h
      for day in data["forecast"]["forecastday"]
      for h in day["hour"]
    ]
    tzinfo = tz.gettz(data["location"]["tz_id"])
    now = parser.parse(data["location"]["localtime"]).replace(tzinfo=tzinfo)

    next_hours = [
      h for h in all_hours
      if parser.parse(h["time"]).replace(tzinfo=tzinfo) >= now
    ][:hours]
    forecast = [
      {
        "time": h["time"],
        "temp_c": h["temp_c"],
        "condition_text": h["condition"]["text"],
        "condition_icon": h["condition"]["icon"],
        "is_day": h["is_day"],
      }
      for h in next_hours
    ]

    return {
      "location": data.get("location", {}),
      "current": {
        "temp_c": data["current"]["temp_c"],
        "condition_text": data["current"]["condition"]["text"],
        "condition_icon": data["current"]["condition"]["icon"],
        "is_day": data["current"]["is_day"],
      },
      "forecast": forecast
    }

if __name__ == "__main__":
  from dotenv import load_dotenv
  import os

  load_dotenv()

  client = WeatherAPIClient(api_key=os.getenv("WEATHERAPI_KEY"), location=location_mapping["london"])
  weather = client.get_current_and_forecast(hours=6)
  print(weather)
