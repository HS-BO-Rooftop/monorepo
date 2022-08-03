#include "display.h"

#define LED_BUILTIN GPIO_NUM_25
#define PIN_35 GPIO_NUM_35

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
#define SCREEN_H_CENTER SCREEN_WIDTH / 2
#define SCREEN_V_CENTER SCREEN_HEIGHT / 2

#define SCREEN_PADDING 7
#define SCREEN_TOP_PADDING SCREEN_PADDING
#define SCREEN_BOTTOM_PADDING SCREEN_HEIGHT - SCREEN_PADDING
#define SCREEN_TOP_RIGHT_CURSOR_POSITION SCREEN_WIDTH
#define SCREEN_BOTTOM_RIGHT_CURSOR_POSITION SCREEN_WIDTH
#define SCREEN_TOP_LEFT_CURSOR_POSITION 0
#define SCREEN_BOTTOM_LEFT_CURSOR_POSITION 0

#define TEXT_START_LINE 2
#define TEXT_END_LINE 7

#define VIEW_TYPE_MENU 0
#define VIEW_TYPE_CUSTOM 1

#define BTN_SHORT_PRESS 1
#define BTN_LONG_PRESS 2

#define OLED_RESET -1       // Reset pin # (or -1 if sharing Arduino reset pin)
#define SCREEN_ADDRESS 0x3D ///< See datasheet for Address; 0x3D for 128x64, 0x3C for 128x32

Adafruit_SSD1306 display(SCREEN_HEIGHT, SCREEN_WIDTH, &Wire, OLED_RESET);
Display *Display::instance = nullptr;

Display *Display::getInstance()
{
    if (instance == nullptr)
    {
        instance = new Display();
    }
    return instance;
}

Display::Display()
{
    pinMode(LED_BUILTIN, OUTPUT);
    pinMode(PIN_35, INPUT);

    if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C))
    { // Address 0x3D for 128x64
        Serial.println(F("SSD1306 allocation failed"));
        for (;;)
            ;
    }

    delay(2000);
    loop();
}

void Display::viewController()
{
    Serial.println(">viewController()");
    int inputType = BTN_SHORT_PRESS;
    if (btnPressTime > 800)
    {
        inputType = BTN_LONG_PRESS;
    }

    switch (inputType)
    {
    case BTN_SHORT_PRESS:
    {
        break;
    }
    case BTN_LONG_PRESS:
    {
        break;
    }
    }

    reqUpdate = 1;
    btnPressTime = 0;
}

uint8_t Display::checkScreenState()
{
    if (reqUpdate == 0)
    {
        return -1;
    }

    display.stopscroll();
    display.clearDisplay();
    display.setTextSize(0);
    display.setTextColor(WHITE);
    reqUpdate = 0;

    return 0;
}