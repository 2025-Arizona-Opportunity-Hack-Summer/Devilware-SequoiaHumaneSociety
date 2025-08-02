# Dockerfile

FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8080
ENV PORT 8080
CMD ["gunicorn", "--bind", ":8080", "main:app"]