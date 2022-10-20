#include "display_controller.h"

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
DisplayController *DisplayController::instance = nullptr;

std::map<char, char> my_map = {
    { 'A', '1' },
    { 'B', '2' },
    { 'C', '3' }
};

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

Adafruit_SSD1306 DisplayController::getDisplay()
{
    return display;
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

    if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        Serial.println(F("SSD1306 allocation failed"));
        for(;;);
    }

    xTaskCreate(
        this->task,
        "DISPLAY_CONTROLLER_TASK",
        5000,
        NULL,
        1,
        NULL
    );

    return 0;
}

int DisplayController::drawMenu()
{
    display.clearDisplay();
    return 0;
}

int DisplayController::drawHome()
{
    display.clearDisplay();

    display.setTextSize(1);
    display.setTextColor(WHITE);
    display.setCursor(0,0);
    display.println("00:00");
    display.drawLine(0, 9, SCREEN_WIDTH, 9, WHITE);

    display.display();
    return 0;
}

void DisplayController::update()
{
    InputController * i = InputController::getInstance();
    Serial.println(i->getBtnConfirmPressTime());
    drawHome();
}
