FROM python:3.11-slim

# Install system dependencies required for OpenCV (cv2) and AI processing pipelines
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory inside container
WORKDIR /app

# Copy dependency requirements file
COPY requirements.txt .

# Upgrade pip and install required packages without caching
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy entire application source code (backend + frontend)
COPY . .

# Expose HTTP port for standard container routers
EXPOSE 8000

# Set required environment variables for unbuffered Python logs
ENV PYTHONUNBUFFERED=1
ENV PORT=8000

# Start FastAPI server via Uvicorn listening on all network interfaces
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
