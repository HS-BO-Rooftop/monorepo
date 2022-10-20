#include <Arduino.h>
#include <map>
#include <string>
#include "DisplayController.h"
#include "InputController.h"
#include "SensorController.h"
#include "WifiController.h"
#include "OnTopClient.h"

int incomingByte = 0;
std::string userInput = "";
InputController *inputController;
DisplayController *displayController;
SensorController *sensorController;
WifiController *wifiController;
OnTopClient *otc;


void setup()
{
    Serial.begin(115200);
    inputController = InputController::getInstance();
    displayController = DisplayController::getInstance();
    sensorController = SensorController::getInstance();
    wifiController = WifiController::getInstance();
    inputController->registerObserver(displayController);
    otc = new OnTopClient();

    //display->test();
    //ViewController *viewController = ViewController::getInstance();
    //WifiManager *WifiManager = WifiManager::getInstance();
}

void loop()
{
    if (Serial.available() > 0) {
    // read the incoming byte:
        incomingByte = Serial.read();
        if(incomingByte != 10){
            userInput = userInput + (char) incomingByte;
            Serial.print("$ ");
            Serial.println(userInput.c_str());
        }else {
            if(userInput.c_str() != ""){
                Serial.println("==================");

                switch (std::stoi(userInput))
                {
                    case 1:
                        Serial.println("Cleaning wifi config...");
                        wifiController->removeNetworkConfig();
                        break;
                    case 2:
                        Serial.println("Check if wifi config exists...");
                        Serial.println(wifiController->isNetworkConfigAvailable());
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
                        Serial.println(wifiController->getMacAddress());
                        break;
                    case 9:
                        Serial.println(otc->initDevice());
                        break;
                    default:
                        Serial.println("Command nout found.");
                        break;
                }

                userInput = "";
            }
        }
    }
}