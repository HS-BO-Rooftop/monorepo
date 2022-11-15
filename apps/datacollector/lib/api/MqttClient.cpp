#include "MqttClient.h"

MqttClient *MqttClient::_instance = nullptr;

MqttClient::MqttClient() {
    
}

MqttClient::~MqttClient() {
    delete _instance;
}

MqttClient * MqttClient::getInstance(){
    if (_instance == nullptr) {
        _instance = new MqttClient();
    }

    return _instance;
}

bool MqttClient::connectMqtt() {
    return false;
}

bool MqttClient::getConnected() {
    return false;
}