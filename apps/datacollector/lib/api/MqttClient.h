#pragma once
#include <memory>
#include <Arduino.h>
#include <pubsubclient.h>
#include <WiFi.h>
#include "Interface.h"
#include "WifiController.h"

class MqttClient {
    private:
        static MqttClient *_instance;
        static void callback(char* topic, byte* payload, unsigned int length);
    public:
        MqttClient();
        ~MqttClient();
        static MqttClient *getInstance();
        bool connectMqtt();
        bool getConnected();
        void loop();
        void sendMeasurement(const char *sensor, int measurement);
        void sendMeasurement(const char *sensor, double measurement);
        void sendMeasurement(const char *sensor, String measurement);
};