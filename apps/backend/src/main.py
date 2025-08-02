from fastapi import FastAPI

from src.widgets import register as register_widgets

app = FastAPI(title="Glade")
register_widgets(app)
