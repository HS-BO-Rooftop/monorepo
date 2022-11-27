#include "DisplayController.h"

Adafruit_SSD1306 _display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
DisplayController *DisplayController::_instance = nullptr;

DisplayController::DisplayController(){
    log_d("initializing");
    _current_view_ptr = new HomeView();

    if(!_display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        log_i("SSD1306 allocation failed, looping");
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
    
    uint8_t m_press_type;
    if(m_input_controller->getBtnConfirmPressTime() >= INPUT_LONG_PRESS_THRESHOLD)
        m_press_type == INPUT_LONG_PRESS;
    else
        m_press_type = INPUT_SHORT_PRESS;

    _current_view_ptr->onClick(m_press_type);
}

void DisplayController::task(){
    _current_view_ptr->render();
    vTaskSuspend(NULL);
    /* 
    for(;;){
        
        vTaskDelay(2000 / portTICK_PERIOD_MS);
    };*/
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
    _current_view_ptr = view_ptr;
}

ViewInterface * DisplayController::getCurrentViewPtr(){
    return nullptr;
}