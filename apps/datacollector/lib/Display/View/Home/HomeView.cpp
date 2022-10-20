#include "HomeView.h"

HomeView::HomeView(){}

int HomeView::render()
{
    Serial.println("render home");
    //display = displayController::display();
    DisplayController *displayController = DisplayController::getInstance();
    Adafruit_SSD1306 display = displayController->getDisplay();

    display.clearDisplay();
    display.display();


    return 0;
}