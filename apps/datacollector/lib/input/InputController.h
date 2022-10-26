#pragma once
#include <Arduino.h>
#include <vector>
#include "Definiton.h"
#include "../utils/Subject.h"
#include "../utils/Observer.h"

class InputController : public Subject
{
    public:
        ~InputController();
        static InputController *getInstance();
        void registerObserver(Observer *observer) override;
        void removeObserver(Observer *observer) override;
        void notifyObservers() override;
        int getBtnConfirmPressTime();

    private:
        std::vector<Observer *> _observer_list;
        static InputController *_instance;
        inline static int _s_btn_confirm;
        inline static int _s_btn_confirm_is_pressed;
        inline static int _s_btn_confirm_press_time;
        inline static int _s_btn_confirm_press_start_time;

        InputController();
        static void task(void * parameters);

    protected:
};
