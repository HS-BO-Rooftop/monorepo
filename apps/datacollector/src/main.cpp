#include <Arduino.h>
#include "display.h"
#include "input_controller.h"
#include "Model/view_controller.h"
#include "wifi_manager.h"

void setup()
{
    Serial.begin(115200);
    InputController *inputController = InputController::getInstance();
    //Display *display = Display::getInstance();

    //display->test();
    //ViewController *viewController = ViewController::getInstance();
    //WifiManager *WifiManager = WifiManager::getInstance();
}

void loop()
{
}