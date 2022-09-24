#include <input_controller.h>

#define LED_BUILTIN GPIO_NUM_25
#define BTN_CONFIRM GPIO_NUM_35

InputController *InputController::instance = nullptr;

InputController::InputController()
{
    setup();
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
        }
        vTaskDelay(100 / portTICK_PERIOD_MS);
    };
}

int InputController::setup()
{
    pinMode(BTN_CONFIRM, INPUT);
    pinMode(LED_BUILTIN, OUTPUT);

    xTaskCreate(
        this->task,
        "INPUT_CONTROLLER_TASK",
        1000,
        NULL,
        1,
        NULL
    );

    return 0;
}
