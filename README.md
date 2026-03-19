# Digital Twin System: Smart City Visualization

A real-time 3D digital twin platform that simulates urban infrastructure using CesiumJS and Flask. It takes large datasets (traffic, energy use, air quality, waste management) and renders them as interactive overlays on a photorealistic 3D city model.

![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-2.x-000000?style=flat&logo=flask)
![CesiumJS](https://img.shields.io/badge/CesiumJS-3D%20Globe-6CADDF?style=flat)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Features

*   **3D City Rendering:** Photorealistic buildings using OpenStreetMap data via Cesium Ion
*   **Traffic Heatmaps:** Congestion levels shown as color-coded ellipses. High-traffic zones get a red glow
*   **Energy Consumption:** Vertical cylinders representing per-building energy usage in kWh
*   **Air Quality Index (AQI):** Color-graded zones from green (good) to red (hazardous)
*   **Waste Bin Monitoring:** Point markers showing whether a bin is full or empty
*   **Fly-to Navigation:** Automated camera transitions to specific areas of the city

## Project Structure

```
digital-twin-3d/
├── app.py                  # Flask backend, serves pages, injects API tokens
├── templates/
│   └── index.html          # Main page with Cesium viewer
├── static/
│   ├── script.js           # All the CesiumJS visualization logic
│   ├── style.css           # Layout styles
│   └── Cesium/             # CesiumJS library files
├── .env                    # Environment variables (Cesium Ion token)
├── requirements.txt        # Python dependencies
└── schema.sql              # Database schema for sensor data
```

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, Flask |
| 3D Engine | CesiumJS, Cesium Ion |
| Data Source | OpenStreetMap 3D tiles |
| Frontend | HTML5, CSS3, JavaScript (ES6) |
| Environment | python-dotenv |

## Getting Started

### What You Need
*   Python 3.9+
*   A [Cesium Ion](https://cesium.com/ion/) account (free tier works fine)

### Setup

```bash
# Clone the repo
git clone https://github.com/amayIIp/digital-twin-3d.git
cd digital-twin-3d

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Open .env and paste your Cesium Ion access token
```

### Run

```bash
python app.py
```

Go to `http://localhost:5000` and the viewer will fly to New York City and render all data layers.

## Data Layers

| Layer | Visualization | Example Data |
|---|---|---|
| Traffic | Red ellipses (opacity based on congestion %) | Manhattan 80%, Times Square 70% |
| Energy | Yellow cylinders (height based on kWh) | Empire State 2000 kWh |
| AQI | Green/Red ellipses | Brooklyn AQI 120 (Poor) |
| Waste | Point markers (green/red) | Bin Full / Empty status |

## What's Next

*   Real-time data ingestion via IoT sensors and WebSocket streams
*   Database-backed sensor storage (see `schema.sql`)
*   Time-series playback for historical analysis
*   Multi-city support with a city selector

## License

This project is for educational and demonstration purposes.
