-- ================================================
-- Digital Twin System – Sensor Data Schema
-- ================================================
-- Schema for storing IoT sensor data that feeds
-- the real-time 3D visualization layers.
-- ================================================

CREATE DATABASE IF NOT EXISTS digital_twin;
USE digital_twin;

-- ------------------------------------------------
-- Sensor Locations
-- ------------------------------------------------
CREATE TABLE SensorLocation (
    LocationID      INT AUTO_INCREMENT PRIMARY KEY,
    LocationName    VARCHAR(100) NOT NULL,
    Latitude        DECIMAL(10, 7) NOT NULL,
    Longitude       DECIMAL(10, 7) NOT NULL,
    ZoneType        ENUM('residential', 'commercial', 'industrial', 'mixed') DEFAULT 'mixed',
    CreatedAt       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------
-- Traffic Congestion Data
-- ------------------------------------------------
CREATE TABLE TrafficData (
    TrafficID       INT AUTO_INCREMENT PRIMARY KEY,
    LocationID      INT NOT NULL,
    CongestionLevel INT CHECK (CongestionLevel BETWEEN 0 AND 100),
    VehicleCount    INT DEFAULT 0,
    RecordedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (LocationID) REFERENCES SensorLocation(LocationID)
);

-- ------------------------------------------------
-- Energy Consumption Data
-- ------------------------------------------------
CREATE TABLE EnergyData (
    EnergyID        INT AUTO_INCREMENT PRIMARY KEY,
    LocationID      INT NOT NULL,
    ConsumptionKWH  DECIMAL(10, 2) NOT NULL,
    BuildingName    VARCHAR(100),
    RecordedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (LocationID) REFERENCES SensorLocation(LocationID)
);

-- ------------------------------------------------
-- Air Quality Index (AQI) Data
-- ------------------------------------------------
CREATE TABLE AQIData (
    AQIID           INT AUTO_INCREMENT PRIMARY KEY,
    LocationID      INT NOT NULL,
    AQIValue        INT CHECK (AQIValue BETWEEN 0 AND 500),
    PollutantType   ENUM('PM2.5', 'PM10', 'O3', 'NO2', 'CO', 'SO2') DEFAULT 'PM2.5',
    RecordedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (LocationID) REFERENCES SensorLocation(LocationID)
);

-- ------------------------------------------------
-- Waste Bin Status Data
-- ------------------------------------------------
CREATE TABLE WasteData (
    WasteID         INT AUTO_INCREMENT PRIMARY KEY,
    LocationID      INT NOT NULL,
    BinStatus       ENUM('Empty', 'Half', 'Full') DEFAULT 'Empty',
    FillPercentage  INT CHECK (FillPercentage BETWEEN 0 AND 100),
    RecordedAt      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (LocationID) REFERENCES SensorLocation(LocationID)
);

-- ------------------------------------------------
-- Sample Data
-- ------------------------------------------------
INSERT INTO SensorLocation (LocationName, Latitude, Longitude, ZoneType) VALUES
('Manhattan Downtown',  40.7128000, -74.0060000, 'commercial'),
('Brooklyn Center',     40.7306000, -73.9352000, 'mixed'),
('Empire State Area',   40.7488170, -73.9854280, 'commercial'),
('Times Square',        40.7580000, -73.9855000, 'commercial'),
('Flatiron District',   40.7410000, -73.9897000, 'mixed'),
('Central Park South',  40.7614000, -73.9776000, 'residential');

INSERT INTO TrafficData (LocationID, CongestionLevel, VehicleCount) VALUES
(1, 80, 1200), (2, 50, 600), (3, 90, 1500),
(4, 70, 900),  (5, 60, 750), (6, 85, 1100);

INSERT INTO EnergyData (LocationID, ConsumptionKWH, BuildingName) VALUES
(3, 2000.00, 'Empire State Building'),
(4, 1500.00, 'Times Square Complex');

INSERT INTO AQIData (LocationID, AQIValue, PollutantType) VALUES
(2, 120, 'PM2.5'), (1, 60, 'PM10');

INSERT INTO WasteData (LocationID, BinStatus, FillPercentage) VALUES
(5, 'Full', 95), (6, 'Empty', 10);
