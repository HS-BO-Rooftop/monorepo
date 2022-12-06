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
  log_i("new message:");
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
    WifiController *wifi = WifiController::getInstance();
    
    if(wifi->status() != WL_CONNECTED) {
        delay(500);
        return false;
    } else {
        while (!mqttClient.connected()) {
            log_i("connecting to broker");

            String mac = WiFi.macAddress();
            String clientId = "Datacollector-" + mac;

            mqttClient.connect(clientId.c_str(), MQTT_USERNAME, MQTT_PASSWORD);

            if (mqttClient.connected()) {
                log_i("connected.");
            }
            else {
                log_i("connect failed, sleeping 5 seconds");
                delay(5000);
            }
        }
        //log_i(uxTaskGetStackHighWaterMark (NULL));
        return true;
    }
}

void MqttClient::sendMeasurement(const char *sensor, int measurement) {
    if(mqttClient.connected()) {
        std::string measurement_s = std::to_string(measurement);
        const char *payload = measurement_s.c_str();
        log_i("publishing %s to topic \"%s\"\n", payload, sensor);
        mqttClient.publish(sensor, payload);
    } else {
        log_i("not connected");
    }
}

void MqttClient::sendMeasurement(const char *sensor, double measurement) {
     if(mqttClient.connected()) {
        std::string measurement_s = std::to_string(measurement);
        const char *payload = measurement_s.c_str();
        log_i("publishing %s to topic \"%s\"\n", payload, sensor);
        mqttClient.publish(sensor, payload);
    } else {
        log_i("not connected");
    }
}

void MqttClient::sendMeasurement(const char *sensor, String measurement) {
    if(mqttClient.connected()) {
        const char *payload = measurement.c_str();
        log_i("publishing %s to topic \"%s\"\n", payload, sensor);
        mqttClient.publish(sensor, payload);
    } else {
        log_i("not connected");
    }
}

void MqttClient::loop() {
    for(;;) {
        mqttClient.loop();
        delay(250);
    }
}

bool MqttClient::getConnected() {
    return mqttClient.connected();
}