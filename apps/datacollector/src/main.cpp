#include <Arduino.h>
#include "display.h"
#include "input_controller.h"
#include "Model/view_controller.h"
#include "wifi_manager.h"

void setup()
{
  Serial.begin(115200);
  Display *display = Display::getInstance();
  ViewController *viewController = ViewController::getInstance();
  InputController *inputController = InputController::getInstance();
  WifiManager *WifiManager = WifiManager::getInstance();

  Serial.println((int)&viewController);
  Serial.println((int)&inputController);
}

void loop()
{
}