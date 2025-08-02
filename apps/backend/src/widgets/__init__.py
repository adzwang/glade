from importlib import import_module
from pkgutil import iter_modules
from fastapi import FastAPI, APIRouter
from .base import Widget

from typing import Dict, Type

# iterate through non-administrative modules in widgets/
def _iter_widget_modules():
  for _, name, is_pkg in iter_modules(__path__):
    if not is_pkg and name not in {"__init__", "base"}:
      yield import_module(f"{__name__}.{name}")

# discover all modules automatically
def discover() -> Dict[str, Type[Widget]]:
  registry: Dict[str, Type[Widget]] = {}

  for module in _iter_widget_modules():
    for obj in vars(module).values():
      if isinstance(obj, type) and issubclass(obj, Widget) and obj is not Widget:
        registry[obj.name] = obj

  return registry

def _build_router(widget: Type[Widget]) -> APIRouter:
  router = APIRouter(tags=["widgets", widget.name])

  @router.get("/", summary=widget.desc)
  async def _endpoint():
    return {
      "name": widget.name,
      "description": widget.desc,
      "data": await widget.fetch_data()
    }
  
  return router

def register(app: FastAPI) -> None:
  for widget in discover().values():
    # if the widget provides its own router, then use it
    # otherwise default to the normal wrapper
    router = getattr(widget, "router", _build_router(widget))
    app.include_router(router, prefix=f"/api/widgets/{widget.endpoint}")
