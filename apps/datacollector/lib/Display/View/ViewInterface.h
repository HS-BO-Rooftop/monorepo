#pragma once
#include <Arduino.h>
#include "../Definition.h"
#include "../../utils/Observer.h"
#include "../DisplayController.h"

class DisplayController;

class ViewInterface {
    public:
        virtual int render() = 0;
        virtual void onClick(uint8_t) = 0;
        
    private:
        DisplayController *_display_controller;
    protected:

};