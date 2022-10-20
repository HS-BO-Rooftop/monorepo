#include "input_controller.h"

InputController *InputController::instance = nullptr;

InputController::InputController()
{
    init();
}

InputController *InputController::getInstance()
{
    if (instance == nullptr)
    {
        instance = new InputController();
    }

    return instance;
}

void InputController::task(void *parameters)
{
    for(;;){
        btnConfirm = digitalRead(BTN_CONFIRM);

        if (btnConfirm == HIGH && btnConfirmIsPressed == 0)
        {
            btnConfirmPressStartTime = millis();
            btnConfirmIsPressed = 1;
            digitalWrite(LED_BUILTIN, HIGH);
        }
        if (btnConfirm == LOW && btnConfirmIsPressed == 1)
        {
            btnConfirmPressTime = millis() - btnConfirmPressStartTime;
            btnConfirmIsPressed = 0;
            digitalWrite(LED_BUILTIN, LOW);
            instance->notifyObservers();
        }
        vTaskDelay(100 / portTICK_PERIOD_MS);
    };
}

int InputController::init()
{
    Serial.println("[Info]:Initilizing input_controller...");
    pinMode(BTN_CONFIRM, INPUT);
    pinMode(LED_BUILTIN, OUTPUT);

    xTaskCreate(
        this->task,
        "INPUT_CONTROLLER_TASK",
        2000,
        NULL,
        1,
        NULL
    );

    return 0;
}

void InputController::notifyObservers()
{
    for(Observer *observer : observerList)
    {
        observer->update();
    }
}

void InputController::registerObserver(Observer *observer)
{
    observerList.push_back(observer);
}

void InputController::removeObserver(Observer *observer)
{
    auto iterator = std::find(observerList.begin(), observerList.end(), observer);

    if (iterator != observerList.end())
    {
        observerList.erase(iterator);
    }
}

int InputController::getBtnConfirmPressTime()
{
    return btnConfirmPressTime;
}
