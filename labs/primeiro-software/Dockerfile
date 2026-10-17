FROM python:3.13-slim
WORKDIR /app
COPY app.py .
USER 10001:10001
EXPOSE 8000
CMD ["python", "app.py", "--host", "0.0.0.0"]
