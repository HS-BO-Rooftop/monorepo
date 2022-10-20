#pragma once
#include <Arduino.h>
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Fonts/FreeMonoBold12pt7b.h>
#include <Fonts/FreeMono9pt7b.h>
#include <map>
#include "Interface.h"
#include "./View/Home/HomeView.h"
#include "../utils/Observer.h"
#include "../input/InputController.h"

class DisplayController : public Observer
{
    public:
        ~DisplayController();
        static DisplayController *getInstance();
        void update() override;
        Adafruit_SSD1306 getDisplay();
        int drawMenu();
        int drawHome();

    private:
        Adafruit_SSD1306 _display;
        static DisplayController *_instance;

        DisplayController();
        int init();
        static void task(void * parameters);

    protected:
};