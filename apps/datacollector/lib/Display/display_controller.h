#pragma once
#include <Arduino.h>
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Fonts/FreeMonoBold12pt7b.h>
#include <Fonts/FreeMono9pt7b.h>
#include "./View/Home/home_view.h"
#include "../Utils/Observer/observer.h"

class DisplayController : public Observer
{
    public:
        static DisplayController *getInstance();
        void update() override;

    protected:

    private:
        DisplayController();
        Adafruit_SSD1306 display;
        static DisplayController *instance;
        int init();
        static void task(void * parameters);
};