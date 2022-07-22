#pragma once
#include "../Model/view.h"
#include <Adafruit_SSD1306.h>
#include <display.h>

class HomeView : public View
{
public:
    void render();

private:
protected:
    Display *display;
};