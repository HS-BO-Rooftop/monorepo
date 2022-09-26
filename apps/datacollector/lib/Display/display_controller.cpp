#include "display_controller.h"

#define LED_BUILTIN GPIO_NUM_25
#define PIN_35 GPIO_NUM_35

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
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

#define OLED_RESET -1
#define SCREEN_ADDRESS 0x3D

Adafruit_SSD1306 display(SCREEN_HEIGHT, SCREEN_WIDTH, &Wire, OLED_RESET);
DisplayController *DisplayController::instance = nullptr;

DisplayController *DisplayController::getInstance()
{
    if (instance == nullptr)
    {
        instance = new DisplayController();
    }
    return instance;
}

DisplayController::DisplayController()
{
    init();
}


void DisplayController::task(void *parameters)
{
    for(;;){
        vTaskDelay(500 / portTICK_PERIOD_MS);
    };
}


int DisplayController::init()
{
    Serial.println("[Info]:Initilizing display_controller...");

    xTaskCreate(
        this->task,
        "DISPLAY_CONTROLLER_TASK",
        1000,
        NULL,
        1,
        NULL
    );

    return 0;
}

void DisplayController::update()
{
    Serial.println("Looking for update now...");
}
