from .base import Widget
from fastapi import APIRouter, Query

from ..services.weather import WeatherAPIClient
import os

class WeatherWidget(Widget):
  """
  A widget to get weather data
  """
  name: str = "Weather"
  desc: str = "Current weather at a glance"
  endpoint: str = "weather"
  router = APIRouter(tags=["widgets", name])

  @router.get("/", summary=desc)
  async def get_weather(location: str = Query("London", description="Target city")):
    client = WeatherAPIClient(api_key=os.getenv("WEATHERAPI_KEY"), location="london")

    return {
      "name": WeatherWidget.name,
      "description": WeatherWidget.desc,
      "data": client.get_current_and_forecast(hours=6)
    }
