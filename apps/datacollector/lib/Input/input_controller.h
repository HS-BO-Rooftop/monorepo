#pragma once
#include <Arduino.h>
#include <vector>
#include "input_interface.h"
#include "../utils/subject.h"
#include "../utils/observer.h"

class InputController : public Subject
{
    std::vector<Observer *> observerList;

    public:
        static InputController *getInstance();
        void registerObserver(Observer *observer) override;
        void removeObserver(Observer *observer) override;
        void notifyObservers() override;
        int getBtnConfirmPressTime();

    protected:
        inline static int btnConfirm = 0;
        inline static int btnConfirmIsPressed = 0;
        inline static int btnConfirmPressTime = 0 ;
        inline static int btnConfirmPressStartTime = 0;

    private:
        static InputController *instance;
        InputController();

        int init();
        static void task(void * parameters);
};
