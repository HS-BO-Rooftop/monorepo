#include "JSN-SR04T.h"

#if BOARD_TYPE == 0
  #define trigPin GPIO_NUM_16
  #define echoPin GPIO_NUM_17
#elif BOARD_TYPE == 1
  #define trigPin GPIO_NUM_32
  #define echoPin GPIO_NUM_35
#elif BOARD_TYPE == 2
  #define trigPin GPIO_NUM_32
  #define echoPin GPIO_NUM_35
#endif

JSNSR04T *JSNSR04T::instance = nullptr;

JSNSR04T::JSNSR04T() {
  log_i("setting up JSN-SR04T Sensor.");
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

JSNSR04T *JSNSR04T::getInstance() {
    if (instance == nullptr) {
        instance = new JSNSR04T();
    }
    return instance;
}

int JSNSR04T::getValue() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);

  distance = duration*0.034/2;
  
  log_i("distance: %i cm", distance);

  return distance;
}