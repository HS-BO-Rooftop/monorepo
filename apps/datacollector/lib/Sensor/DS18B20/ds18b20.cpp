#include "ds18b20.h"

ds18b20::ds18b20(gpio_num_t pin) {
  Serial.print("Setting up DS18B20 Temperature Sensor on GPIO ");
  Serial.print(pin);
  Serial.print("\n");
  
  oneWireBus = OneWire(pin);
  _ds18b20 = DallasTemperature(&oneWireBus);
  DeviceAddress bus_address;

  _ds18b20.begin();
  int count = _ds18b20.getDeviceCount();
  Serial.print("[DS18B20] Sensors count on GPIO: ");
  Serial.print(pin);
  Serial.print(" : ");
  Serial.println(count);

  if (count == 1) {
    _ds18b20.getAddress(bus_address, 0);
    _ds18b20.setResolution(bus_address, 12);
  } else {
    Serial.println("[DS18B20] Not exactly 1 device on bus! Check connections");
  }
}

bool ds18b20::measure() {
  Serial.println("[DS18B20] Measuring");

  _ds18b20.requestTemperatures();
  delayMicroseconds(100);
  value = _ds18b20.getTempCByIndex(0);

  if (value == DEVICE_DISCONNECTED_C) {
    Serial.println("[DS18B20] Error on DS18B20 measurement.");
    return false;
  }
  else {
    Serial.print("[DS18B20] Result:");
    Serial.print(value);
    Serial.println(" °C");
    return true;
  }
}

int ds18b20::getValue() {
  if(measure())
    return value;
  else 
    return 999.99;
}