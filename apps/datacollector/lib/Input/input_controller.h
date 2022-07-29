#pragma once
#include <Arduino.h>

class InputController
{
public:
    static InputController *getInstance();

protected:
    int btnConfirm = 0;
    int isBtnConfirmPressed = 0;
    int btnPressStartTime;
    int btnPressTime = 0;

private:
    static InputController *instance;
    InputController();
    int setup();
};
