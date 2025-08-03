from abc import ABC, abstractmethod
from fastapi import APIRouter

from typing import ClassVar, Any

class Widget(ABC):
  """
  The interface for each of our widgets that we want to include.

  A widget must EITHER provide an implementation of fetch_data, or a custom
  router.
  """

  # static metadata
  name: ClassVar[str]
  desc: ClassVar[str]
  endpoint: ClassVar[str]

  @staticmethod
  @abstractmethod
  async def fetch_data() -> Any:
    return None
