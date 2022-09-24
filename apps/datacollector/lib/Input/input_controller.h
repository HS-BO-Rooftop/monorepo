#pragma once
#include <Arduino.h>

class InputController
{
public:
    static InputController *getInstance();

protected:
    inline static int btnConfirm = 0;
    inline static int btnConfirmIsPressed = 0;
    inline static int btnConfirmPressTime = 0 ;
    inline static int btnConfirmPressStartTime = 0;

private:
    static InputController *instance;
    InputController();
    int setup();
    static void task(void * parameters);
};
