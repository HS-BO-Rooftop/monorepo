#include "DisplayController.h"

Adafruit_SSD1306 _display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
DisplayController *DisplayController::_instance = nullptr;

DisplayController::DisplayController(){
    Serial.println("[Info]:Initilizing display_controller...");

    if(!_display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        Serial.println(F("SSD1306 allocation failed"));
        for(;;);
    }

    xTaskCreate(
        task,
        "DISPLAY_CONTROLLER_TASK",
        5000,
        NULL,
        1,
        NULL
    );
}

DisplayController::~DisplayController(){
    delete _instance;
}

DisplayController *DisplayController::getInstance(){
    if (_instance == nullptr)
    {
        _instance = new DisplayController();
    }
    return _instance;
}

Adafruit_SSD1306 DisplayController::getDisplay(){
    return _display;
}


void DisplayController::task(void *parameters){
    for(;;){
        vTaskDelay(500 / portTICK_PERIOD_MS);
    };
}

int DisplayController::drawMenu(){
    _display.clearDisplay();
    return 0;
}

int DisplayController::drawHome(){
    _display.clearDisplay();

    _display.setTextSize(1);
    _display.setTextColor(WHITE);
    _display.setCursor(0,0);
    _display.println("00:00");
    _display.drawLine(0, 9, SCREEN_WIDTH, 9, WHITE);

    _display.display();
    return 0;
}

void DisplayController::update()
{
    InputController * m_input_controller = InputController::getInstance();

    Serial.println(m_input_controller->getBtnConfirmPressTime());
    drawHome();
}
