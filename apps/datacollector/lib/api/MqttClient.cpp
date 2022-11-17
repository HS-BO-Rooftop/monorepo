#include "MqttClient.h"

static WiFiClient wifiClient;
static PubSubClient mqttClient(wifiClient);

MqttClient *MqttClient::_instance = nullptr;

MqttClient::MqttClient() {
    mqttClient.setServer(MQTT_SERVER_ADDRESS, MQTT_SERVER_PORT);
    mqttClient.setCallback(MqttClient::callback);
}

MqttClient::~MqttClient() {
    delete _instance;
}

void MqttClient::callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("[MqttClient] Callback - ");
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
}

MqttClient * MqttClient::getInstance(){
    if (_instance == nullptr) {
        _instance = new MqttClient();
    }

    return _instance;
}

bool MqttClient::connectMqtt() {
    while (!mqttClient.connected()) {
        Serial.println("[MqttClient] connecting to broker");

        /* String clientId = "Datacollector-";
        String mac = WiFi.macAddress().c_str();
        clientId += mac; */

        mqttClient.connect("test", MQTT_USERNAME, MQTT_PASSWORD);

        if (mqttClient.connected()) {
            Serial.println("[MqttClient] connected.");
        }
        else {
            Serial.println("[MqttClient] connect failed, looping");
            delayMicroseconds(500 * 1000);
        }
    }
    Serial.println(uxTaskGetStackHighWaterMark (NULL));
    return true;
}

bool MqttClient::getConnected() {
    return mqttClient.connected();
}