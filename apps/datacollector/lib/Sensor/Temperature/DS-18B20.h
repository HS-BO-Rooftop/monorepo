#pragma once
#include <memory>
#include <Arduino.h>
#include "OneWire.h"
#include "DallasTemperature.h"

class DS18B20
{
    public:
        DS18B20(gpio_num_t pin);
        double getValue();
    private:
        double value;
        bool measure();
        DallasTemperature _ds18b20;
        OneWire oneWireBus;
        DeviceAddress bus_address;
    protected:
};