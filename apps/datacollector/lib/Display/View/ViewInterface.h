#pragma once
#include <Arduino.h>
#include "../../utils/Observer.h"
#include "../Definiton.h"
//#include "../DisplayController.h"

class ViewInterface{
    public:
        virtual int render() = 0;
        virtual void onClick(uint8_t) = 0;

    private:
        //DisplayController *_display_controller;

    protected:
};