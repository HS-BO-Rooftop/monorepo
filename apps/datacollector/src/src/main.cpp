#include <Arduino.h>
#include "display.h"
#include "inputController.h"
#include "Model/viewController.h"

void setup()
{
  Serial.begin(115200);
  Display *display = Display::getInstance();
  ViewController *viewController = ViewController::getInstance();
  InputController *inputController = InputController::getInstance();

  Serial.print((int)&viewController);
  Serial.print((int)&inputController);
}

void loop()
{
}