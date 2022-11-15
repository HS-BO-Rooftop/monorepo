#pragma once
#include <Arduino.h>
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Fonts/FreeMonoBold12pt7b.h>
#include <Fonts/FreeMono9pt7b.h>
#include <map>
#include "Definition.h"
#include "../utils/Observer.h"
#include "../input/InputController.h"
#include "./View/ViewInterface.h"
#include "./View/home/HomeView.h"

class ViewInterface;

class DisplayController : virtual public Observer
{
    public:
        ~DisplayController();
        static DisplayController *getInstance();
        Adafruit_SSD1306 getDisplay();

        void setCurrentViewPtr(ViewInterface *&view_ptr);
        ViewInterface * getCurrentViewPtr();
        void update() override;

        int drawMenu();
        int drawHome();
    private:
        Adafruit_SSD1306 _display;
        static DisplayController *_instance;
        ViewInterface *_current_view_ptr;

        DisplayController();
        void task();
        static void startTaskImpl(void *caller);
        void startTask();

    protected:
};