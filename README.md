# Digital Twin System – Smart City Visualization

A real-time 3D digital twin platform that simulates urban infrastructure using **CesiumJS** and **Flask**. Visualize traffic congestion, energy consumption, air quality index (AQI), and waste management data overlaid on a photorealistic 3D city model.

![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-2.x-000000?style=flat&logo=flask)
![CesiumJS](https://img.shields.io/badge/CesiumJS-3D%20Globe-6CADDF?style=flat)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Features

- **3D City Rendering** — Photorealistic 3D buildings using OpenStreetMap (OSM) data via Cesium Ion
- **Traffic Heatmaps** — Congestion levels visualized as color-coded ellipses with glow effects for high-traffic zones
- **Energy Consumption** — Vertical cylinder overlays representing per-building energy usage (kWh)
- **Air Quality Index (AQI)** — Color-graded AQI zones (green = good, red = poor)
- **Waste Bin Monitoring** — Point markers showing bin fill status (Full / Empty)
- **Fly-to Navigation** — Automated camera transitions to target city areas

## Architecture

```
digital-twin-3d/
├── app.py                  # Flask backend – serves pages, injects API tokens
├── templates/
│   └── index.html          # Main page with Cesium viewer container
├── static/
│   ├── script.js           # CesiumJS visualization logic (all data layers)
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

### Prerequisites
- Python 3.9+
- A [Cesium Ion](https://cesium.com/ion/) account (free tier available)

### Installation

```bash
# Clone the repository
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
# Edit .env and add your Cesium Ion access token
```

### Run

```bash
python app.py
```

Open `http://localhost:5000` — the viewer will fly to New York City and render all data layers.

## Data Layers

| Layer | Visualization | Example Data Points |
|---|---|---|
| Traffic | Red ellipses (opacity ∝ congestion %) | Manhattan 80%, Times Square 70% |
| Energy | Yellow cylinders (height ∝ kWh) | Empire State 2000 kWh |
| AQI | Green/Red ellipses | Brooklyn AQI 120 (Poor) |
| Waste | Point markers (green/red) | Bin Full / Empty status |

## Future Scope

- Real-time data ingestion via IoT sensors and WebSocket streams
- Database-backed sensor storage (see `schema.sql`)
- Time-series playback for historical analysis
- Multi-city support with city selector

## License

This project is for educational and demonstration purposes.
