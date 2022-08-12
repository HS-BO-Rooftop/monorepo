#pragma once
#include <Arduino.h>
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Fonts/FreeMonoBold12pt7b.h>
#include <Fonts/FreeMono9pt7b.h>
#include <map>

class Display
{

public:
    static Display *getInstance();

protected:
    int time = 0;
    int menuCursor = 0;

    int btnConfirm = 0;
    int isBtnConfirmPressed = 0;
    int btnPressStartTime;
    int btnPressTime = 0;

private:
    void renderView();
    void viewController();
    void renderHomeScreen();
    void renderMenuScreen();
    Display();
    uint8_t checkScreenState();

    static Display *instance;

    Adafruit_SSD1306 display;
    // Utils *util = Utils::getInstance();

    uint8_t SCREEN_TEXT_LINE[8] = {0, 8, 16, 24, 32, 40, 48, 56};

    int16_t text_x_position, text_y_position;
    uint16_t text_width, text_height;
    int8_t reqUpdate = 1;
};