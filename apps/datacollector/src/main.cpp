#include <Arduino.h>
#include <map>
#include <string>
#include "display_controller.h"
#include "input_controller.h"
#include "sensor_controller.h"
#include "wifi_manager.h"

void setup()
{
    Serial.begin(115200);
    InputController *inputController = InputController::getInstance();
    DisplayController *displayController = DisplayController::getInstance();
    SensorController *sensorController = SensorController::getInstance();

    inputController->registerObserver(displayController);

    //display->test();
    //ViewController *viewController = ViewController::getInstance();
    //WifiManager *WifiManager = WifiManager::getInstance();
}

void loop()
{
}