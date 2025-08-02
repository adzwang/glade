from .base import Widget

class HelloWorldWidget(Widget):
  """
  A simple Hello World widget, to test the modularity of our widgets.
  """
  name: str = "Hello, World!"
  desc: str = "A sample API router"
  endpoint: str = "helloworld"

  @staticmethod
  async def fetch_data() -> str:
    return "Hello from my first widget!"
