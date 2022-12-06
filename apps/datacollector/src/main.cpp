#include <Arduino.h>
#include <map>
#include <string>
#include "esp_system.h"
#include "esp_event.h"
#include "esp_log.h"
#include "esp_ota_ops.h"
#include "esp_http_client.h"
#include "esp_flash_partitions.h"
#include "esp_partition.h"
#include "DisplayController.h"
#include "InputController.h"
#include "SensorController.h"
#include "WifiController.h"
#include "OtaController.h"
#include "OnTopClient.h"
#include "MqttClient.h"
#include "Distance/JSN-SR04T.h"
#include "Temperature/DS-18B20.h"
#include "Moisture/HW-390.h"

int incomingByte = 0;
std::string userInput = "";
InputController *inputController;
DisplayController *displayController;
SensorController *sensorController;
WifiController *wifiController;
OtaController *OtaController;
OnTopClient *otc;
MqttClient *mqtt;
DS18B20 *tempsens;
HW390 *moistsens;
HW390 *moistsens2;
JSNSR04T *_jsnsr04t;

static const char *TAG = "main";

void measure() {
    log_i("reading and sending");
    mqtt->sendMeasurement("boards/dfc62898-b14e-4238-a936-09d43cd15c18/sensors/91160541-8d00-458e-9155-56af1220d45c/data", moistsens->getValue());
    //mqtt->sendMeasurement("boards/dfc62898-b14e-4238-a936-09d43cd15c18/sensors/58fd9a14-a299-4ac1-90fd-d852e623c454/data", moistsens2->getValue());
    mqtt->sendMeasurement("boards/dfc62898-b14e-4238-a936-09d43cd15c18/sensors/2c5039be-2922-41c0-8a90-59748fffed6c/data", tempsens->getValue());
    mqtt->sendMeasurement("boards/dfc62898-b14e-4238-a936-09d43cd15c18/sensors/98e1ece0-e262-4c3b-a8b7-25a4d02ccc15/data", _jsnsr04t->getValue());
}

void setup() {
    Serial.begin(115200);
    inputController = InputController::getInstance();
    displayController = DisplayController::getInstance();
    sensorController = SensorController::getInstance();
    wifiController = WifiController::getInstance();
    OtaController = OtaController::getInstance();
    
    inputController->registerObserver(displayController);
    otc = new OnTopClient();
    mqtt = new MqttClient();

    mqtt->connectMqtt();

    moistsens = new HW390(GPIO_NUM_36);
    //moistsens2 = new HW390(GPIO_NUM_39);
    tempsens = new DS18B20(GPIO_NUM_21);
    _jsnsr04t = JSNSR04T::getInstance();

    measure();
    /* if(OtaController->getUpdateAvailable()) {
        Serial.println("There is an update available.");
        OtaController->doOta();
    } */
}

bool firstLoop = true;
int count = 1;
void loop()
{
    if (firstLoop) {
        firstLoop = false;
        Serial.println("==================");
        Serial.println("Serial command-line available.");
    }
    
    if (Serial.available() > 0) {
        // read the incoming byte:
        incomingByte = Serial.read();
        Serial.print(incomingByte);
        Serial.print(" ");

        if(incomingByte != 13){
            userInput = userInput + (char) incomingByte;
            //Serial.println(userInput.c_str());
        } else {
            if(userInput.c_str() != "") {
                Serial.println("==================");

                switch (std::stoi(userInput))
                {
                    case 1:
                        Serial.println("Cleaning wifi config...");
                        wifiController->removeNetworkConfig();
                        break;
                    case 2:
                        Serial.println("Check if wifi config exists...");
                        Serial.println(wifiController->isNetworkConfigAvailable() ? "yes" : "no");
                        break;
                    case 3:
                        wifiController->printNetworkConfig();
                        break;
                    case 4:
                        Serial.println("Writing debug network config...");
                        wifiController->debugSetNetworkConfig();
                        break;
                    case 5:
                        Serial.println("Init Wifi...");
                        wifiController->connect();
                        break;
                    case 6:
                        Serial.println("Status...");
                        Serial.println(wifiController->status(), DEC);
                        break;
                    case 7:
                        Serial.println("Disconnect...");
                        Serial.println(wifiController->disconnect());
                        break;
                    case 8:
                        Serial.println("Mac-Address: ");
                        Serial.println(wifiController->getMacAddress());
                        break;
                    case 9:
                        Serial.println(otc->initDevice());
                        break;
                    default:
                        Serial.println("Command not found.");
                        break;
                }

                userInput = "";
            } else {
                Serial.println("no input");
            }
        }
    }
    else {
        delay(1000);
        count++;
        if (count == 10) {
            count = 1;
            measure();
        };
    }
}