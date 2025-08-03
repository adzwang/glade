from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

from src.widgets import register as register_widgets

app = FastAPI(title="Glade")
register_widgets(app)
