#pragma once
#include <memory>
#include <Arduino.h>
#include <pubsubclient.h>

class MqttClient {
    private:
        static MqttClient *_instance;
    
    public:
        MqttClient();
        ~MqttClient();
        static MqttClient *getInstance();
        bool connectMqtt();
        bool getConnected();
};