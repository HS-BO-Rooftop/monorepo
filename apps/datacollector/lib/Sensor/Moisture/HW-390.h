#pragma once
#include <memory>
#include <Arduino.h>

class HW390
{
    public:
        HW390(gpio_num_t pin);
        double getValue();
    private:
        gpio_num_t _pin;
        double value;
        bool measure();
        const int ADC_RESOLUTION = 4095;
    protected:
};