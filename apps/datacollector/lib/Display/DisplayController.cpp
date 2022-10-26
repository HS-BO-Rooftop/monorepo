#include "DisplayController.h"

Adafruit_SSD1306 _display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
DisplayController *DisplayController::_instance = nullptr;

DisplayController::DisplayController(){
    Serial.println("[Info]:Initilizing display_controller...");
    _current_view_ptr = new HomeView();

    if(!_display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        Serial.println(F("SSD1306 allocation failed"));
        for(;;);
    }

    startTask();
}

DisplayController::~DisplayController(){
    delete _instance;
    delete _current_view_ptr;
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


void DisplayController::update(){
    InputController * m_input_controller = InputController::getInstance();
    uint8_t m_press_type = INPUT_SHORT_PRESS;

    if(m_input_controller->getBtnConfirmPressTime() >= INPUT_LONG_PRESS_THRESHOLD) m_press_type == INPUT_LONG_PRESS;
    _current_view_ptr->onClick(m_press_type);
}

void DisplayController::task(){
    for(;;){
        _current_view_ptr->render();
        vTaskDelay(500 / portTICK_PERIOD_MS);
    };
}

void DisplayController::startTaskImpl(void* caller){
    static_cast<DisplayController*>(caller)->task();
}

void DisplayController::startTask(){
    xTaskCreate(
        this->startTaskImpl,
        "DISPLAY_CONTROLLER_TASK",
        7000,
        this,
        1,
        NULL
    );
}

void DisplayController::setCurrentViewPtr(ViewInterface *& view_ptr){

}

ViewInterface * DisplayController::getCurrentViewPtr(){
    return nullptr;
}