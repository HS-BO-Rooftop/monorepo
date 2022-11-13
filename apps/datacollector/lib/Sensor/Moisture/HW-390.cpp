#include "HW-390.h"

HW390::HW390(gpio_num_t pin) {
#if BOARD_TYPE == 0
  Serial.println("[HW390] Setting up \"Capacitive Soil Moisture Sensor v2.0\"");
  _pin = pin;
#else
  Serial.println("[HW390] This sensor has been implemented for NodeMCU Devkits only.")
#endif
}

bool HW390::measure() {
#if BOARD_TYPE == 0
  int adcraw;
  double adcval;
  
  Serial.println("[HW390] Measuring");
  adcraw = analogRead(_pin);
  adcval = (double) adcraw / ADC_RESOLUTION * 100; // auf 100 normieren (aber nicht Prozent, nur unbewertete Rohdaten)
  
  Serial.println("[HW390] ADC-Value raw: ");
  Serial.print(adcraw);
  Serial.println("");
  Serial.println("[HW390] ADC-Value: ");
  Serial.print(adcval);
  Serial.println("");
  
  if(adcraw == 0) {
    Serial.println("[HW390] ADC returns 0, which is very unlikely. Is the sensor connected correctly?");
    return false;
  }
  else if(adcraw > ADC_RESOLUTION - 50) {
    Serial.println("[HW390] ADC value is almost at maximum, which is very unlikely. Is the sensor connected correctly?");
    return false;
  }
  else {
    value = adcval;
    return true;
  }
#else
  return false;
#endif
}

int HW390::getValue() {
  if(measure())
    return value;
  else 
    return 999.99;
}