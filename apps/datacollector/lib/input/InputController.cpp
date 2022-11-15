#include "InputController.h"

InputController *InputController::_instance = nullptr;

InputController::InputController(){
    Serial.println("[Info]: Initializing input_controller...");

    _s_btn_confirm = 0;
    _s_btn_confirm_is_pressed = 0;
    _s_btn_confirm_press_time = 0;
    _s_btn_confirm_press_start_time = 0;

    pinMode(BTN_CONFIRM, INPUT);
    pinMode(LED_BUILTIN, OUTPUT);

    xTaskCreate(
        task,
        "INPUT_CONTROLLER_TASK",
        2000,
        NULL,
        1,
        NULL
    );
}

InputController::~InputController(){
    delete _instance;
}

InputController *InputController::getInstance(){
    if (_instance == nullptr)
    {
        _instance = new InputController();
    }

    return _instance;
}

void InputController::task(void *parameters){
    for(;;){
        _s_btn_confirm = digitalRead(BTN_CONFIRM);

        if (_s_btn_confirm == HIGH && _s_btn_confirm_is_pressed == 0)
        {
            _s_btn_confirm_press_start_time = millis();
            _s_btn_confirm_is_pressed = 1;
            digitalWrite(LED_BUILTIN, HIGH);
        }
        if (_s_btn_confirm == LOW && _s_btn_confirm_is_pressed == 1)
        {
            _s_btn_confirm_press_time = millis() - _s_btn_confirm_press_start_time;
            _s_btn_confirm_is_pressed = 0;
            digitalWrite(LED_BUILTIN, LOW);
            _instance->notifyObservers();
        }
        vTaskDelay(100 / portTICK_PERIOD_MS);
    };
}

void InputController::notifyObservers(){
    for(Observer *observer : _observer_list){
        observer->update();
    }
}

void InputController::registerObserver(Observer *observer){
    _observer_list.push_back(observer);
}

void InputController::removeObserver(Observer *observer){
    auto iterator = std::find(_observer_list.begin(), _observer_list.end(), observer);

    if (iterator != _observer_list.end())
    {
        _observer_list.erase(iterator);
    }
}

int InputController::getBtnConfirmPressTime(){
    return _s_btn_confirm_press_time;
}
