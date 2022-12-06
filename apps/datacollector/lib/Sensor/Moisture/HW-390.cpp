#include "HW-390.h"

HW390::HW390(gpio_num_t pin) {
#if BOARD_TYPE == 0
  log_i("setting up \"Capacitive Soil Moisture Sensor v2.0\"");
  _pin = pin;
#else
  log_i("this sensor has been implemented for NodeMCU Devkits only.")
#endif
}

bool HW390::measure() {
#if BOARD_TYPE == 0
  int adcraw;
  double adcval;
  
  log_i("measuring");
  adcraw = analogRead(_pin);
  adcval = (double) adcraw / ADC_RESOLUTION * 100; // auf 100 normieren (aber nicht Prozent, nur unbewertete Rohdaten)
  
  log_i("ADC-Value raw: %i", adcraw);
  log_i("ADC-Value: %0.2f", adcval); 
  
  if(adcraw == 0) {
    log_i("ADC returns 0, which is very unlikely. Is the sensor connected correctly?");
    return false;
  }
  else if(adcraw > ADC_RESOLUTION - 50) {
    log_i("ADC value is almost at maximum, which is very unlikely. Is the sensor connected correctly?");
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

double HW390::getValue() {
  if(measure())
    return value;
  else 
    return 999.99;
}