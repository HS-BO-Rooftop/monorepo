#include "DS-18B20.h"

DS18B20::DS18B20(gpio_num_t pin) {
  log_i("setting up Temperature Sensor on GPIO %i", pin);
  
  oneWireBus = OneWire(pin);
  _ds18b20 = DallasTemperature(&oneWireBus);
  DeviceAddress bus_address;

  _ds18b20.begin();
  int count = _ds18b20.getDeviceCount();
  log_i("sensor count on GPIO %i: %i", pin, count);
  
    if (count == 1) {
    _ds18b20.getAddress(bus_address, 0);
    _ds18b20.setResolution(bus_address, 12);
  } else {
    log_i("not exactly 1 device on bus! Check connections");
  }
}

bool DS18B20::measure() {
  log_i("measuring");

  _ds18b20.requestTemperatures();
  delayMicroseconds(100);
  value = _ds18b20.getTempCByIndex(0);

  if (value == DEVICE_DISCONNECTED_C) {
    log_i("error on DS18B20 measurement.");
    return false;
  }
  else {
    log_i("result: %0.2f °C", value);
    return true;
  }
}

int DS18B20::getValue() {
  if(measure())
    return value;
  else 
    return 999.99;
}