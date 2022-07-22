#include <inputController.h>

#define LED_BUILTIN GPIO_NUM_25
#define PIN_35 GPIO_NUM_35

InputController *InputController::instance = nullptr;

InputController::InputController()
{
}

InputController *InputController::getInstance()
{
    if (instance == nullptr)
    {
        instance = new InputController();
    }

    return instance;
}

int InputController::setup()
{
    btnConfirm = digitalRead(PIN_35);

    if (btnConfirm == HIGH && isBtnConfirmPressed == 0)
    {
        btnPressStartTime = millis();
        isBtnConfirmPressed = 1;
        digitalWrite(LED_BUILTIN, HIGH);
    }
    if (btnConfirm == LOW && isBtnConfirmPressed == 1)
    {
        btnPressTime = millis() - btnPressStartTime;
        isBtnConfirmPressed = 0;
        digitalWrite(LED_BUILTIN, LOW);
    }

    if (btnPressTime > 0)
    {
        //  viewController();
    }
}
