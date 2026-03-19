// Set Cesium Ion access token
Cesium.Ion.defaultAccessToken = cesiumToken;

// Initialize Cesium Viewer
async function initializeCesium() {
    try {
        const worldTerrain = await Cesium.createWorldTerrainAsync();
        const viewer = new Cesium.Viewer('cesiumContainer', {
            terrainProvider: worldTerrain,
            infoBox: false,
            selectionIndicator: false,
            shouldAnimate: true,
        });
        console.log('Cesium Viewer initialized successfully');
        return viewer;
    } catch (error) {
        console.error('Error initializing Cesium Viewer:', error);
        throw error;
    }
}

// Load OSM Buildings
async function loadOSMBuildings(viewer) {
    try {
        const osmBuildings = new Cesium.Cesium3DTileset({
            url: Cesium.IonResource.fromAssetId(96188), // OSM Buildings Asset ID
        });
        viewer.scene.primitives.add(osmBuildings);

        await osmBuildings.readyPromise;
        console.log('OSM Buildings loaded successfully');
    } catch (error) {
        console.error('Error loading OSM Buildings:', error);
        throw error;
    }
}

// Add Traffic Heatmap with Enhanced Visualization
function addTrafficData(viewer) {
    const trafficData = [
        { lat: 40.7128, lon: -74.006, congestion: 80 }, // High Congestion (Manhattan)
        { lat: 40.7306, lon: -73.9352, congestion: 50 }, // Medium Congestion (Brooklyn)
        { lat: 40.748817, lon: -73.985428, congestion: 90 }, // Empire State Building
        { lat: 40.758, lon: -73.9855, congestion: 70 }, // Times Square
        { lat: 40.741, lon: -73.9897, congestion: 60 }, // Flatiron District
        { lat: 40.7614, lon: -73.9776, congestion: 85 }, // Central Park South
    ];

    trafficData.forEach((point) => {
        // Add a large circle for traffic congestion
        viewer.entities.add({
            name: `Traffic Congestion: ${point.congestion}%`,
            position: Cesium.Cartesian3.fromDegrees(point.lon, point.lat, 10), // Slightly above ground
            ellipse: {
                semiMinorAxis: 500, // Increase the size of the circle
                semiMajorAxis: 500,
                material: Cesium.Color.RED.withAlpha(point.congestion / 100),
                outline: true,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2,
            },
        });

        // Add a glowing effect for high congestion areas
        if (point.congestion > 70) {
            viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(point.lon, point.lat, 10),
                ellipse: {
                    semiMinorAxis: 600, // Larger glow effect
                    semiMajorAxis: 600,
                    material: new Cesium.ImageMaterialProperty({
                        image: '/static/images/glow.png', // Glow effect image
                        transparent: true,
                        color: Cesium.Color.RED.withAlpha(0.5),
                    }),
                },
            });
        }
    });

    console.log('Traffic data added successfully');
}

// Add Energy Consumption Visualization
function addEnergyData(viewer) {
    const energyData = [
        { lat: 40.748817, lon: -73.985428, consumption: 2000 }, // Empire State
        { lat: 40.758, lon: -73.9855, consumption: 1500 }, // Times Square
    ];

    energyData.forEach((point) => {
        viewer.entities.add({
            name: `Energy Usage: ${point.consumption} kWh`,
            position: Cesium.Cartesian3.fromDegrees(point.lon, point.lat, 100),
            cylinder: {
                length: point.consumption / 10,
                topRadius: 30,
                bottomRadius: 30,
                material: Cesium.Color.YELLOW.withAlpha(0.7),
            },
        });
    });
    console.log('Energy data added successfully');
}

// Add AQI Visualization
function addAQIData(viewer) {
    const aqiData = [
        { lat: 40.7306, lon: -73.9352, aqi: 120 }, // Poor AQI
        { lat: 40.7128, lon: -74.006, aqi: 60 }, // Moderate AQI
    ];

    aqiData.forEach((point) => {
        viewer.entities.add({
            name: `AQI: ${point.aqi}`,
            position: Cesium.Cartesian3.fromDegrees(point.lon, point.lat, 100),
            ellipse: {
                semiMinorAxis: 500, // Increase the size of the circle
                semiMajorAxis: 500,
                material: point.aqi > 100 ? Cesium.Color.RED.withAlpha(0.5) : Cesium.Color.GREEN.withAlpha(0.5),
            },
        });
    });
    console.log('AQI data added successfully');
}

// Add Waste Bin Status
function addWasteData(viewer) {
    const wasteData = [
        { lat: 40.745, lon: -74.0347, status: 'Full' }, // Waste Bin Full
        { lat: 40.7219, lon: -74.0074, status: 'Empty' }, // Waste Bin Empty
    ];

    wasteData.forEach((point) => {
        viewer.entities.add({
            name: `Bin Status: ${point.status}`,
            position: Cesium.Cartesian3.fromDegrees(point.lon, point.lat, 100),
            point: {
                pixelSize: 12,
                color: point.status === 'Full' ? Cesium.Color.RED : Cesium.Color.GREEN,
            },
        });
    });
    console.log('Waste data added successfully');
}

// Fly to New York
function flyToNewYork(viewer) {
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-74.006, 40.7128, 5000), // Longitude, Latitude, Altitude
        duration: 5,
    });
    console.log('Flying to New York');
}

// Main Function to Initialize and Load Data
async function main() {
    try {
        const viewer = await initializeCesium();
        await loadOSMBuildings(viewer);
        addTrafficData(viewer);
        addEnergyData(viewer);
        addAQIData(viewer);
        addWasteData(viewer);
        flyToNewYork(viewer);
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

// Run the Main Function
main();