#include "jsnsr04t.h"

#if BOARD_TYPE == 0
  #define trigPin GPIO_NUM_22
  #define echoPin GPIO_NUM_23
#elif BOARD_TYPE == 1
  #define trigPin GPIO_NUM_32
  #define echoPin GPIO_NUM_35
#elif BOARD_TYPE == 2
  #define trigPin GPIO_NUM_32
  #define echoPin GPIO_NUM_35
#endif

jsnsr04t *jsnsr04t::instance = nullptr;

jsnsr04t::jsnsr04t() {
  Serial.println("[JSN-SR04T] Setting up JSN-SR04T Sensor.");
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

jsnsr04t *jsnsr04t::getInstance() {
    if (instance == nullptr) {
        instance = new jsnsr04t();
    }
    return instance;
}

int jsnsr04t::getValue() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);

  distance = duration*0.034/2;
  
  Serial.print("[JSN-SR04T] Distance measured: ");
  Serial.print(distance);
  Serial.println(" cm");

  return distance;
}