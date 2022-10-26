#pragma once

// ** SENSOR_CONTROLLER **
struct SensorData {
    int sensorId;
    float value;
    long timestamp;
    SensorData * next;
};