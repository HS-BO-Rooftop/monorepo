#pragma once
#include <memory>
#include <Arduino.h>
#include "OneWire.h"
#include "DallasTemperature.h"

class ds18b20
{
    public:
        ds18b20(gpio_num_t pin);
        int getValue();
    private:
        double value;
        bool measure();
        DallasTemperature _ds18b20;
        OneWire oneWireBus;
        DeviceAddress bus_address;
    protected:
};