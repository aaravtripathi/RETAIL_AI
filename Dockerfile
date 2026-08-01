FROM python:3.11-slim

WORKDIR /app

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy entire application source code
COPY . .

EXPOSE 8000

ENV PYTHONUNBUFFERED=1

# Run from inside backend/ so relative imports (services.*) and paths (../frontend) resolve correctly
WORKDIR /app/backend
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
