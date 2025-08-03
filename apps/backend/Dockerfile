FROM python:3.12-slim

# get uv
RUN pip install --no-cache-dir uv

# copy project metadata
COPY pyproject.toml uv.lock* ./

# install deps
RUN uv sync --locked --no-build-isolation

# copy source
COPY src ./src
ENV PYTHONPATH=/app/src

# run
EXPOSE 8000
CMD ["uv", "run", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
