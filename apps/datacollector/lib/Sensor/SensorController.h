#pragma once
#include <memory>
#include <Arduino.h>
#include "Definition.h"

class SensorController
{
    public:
        ~SensorController();
        static SensorController *getInstance();
        int enqueue(int sensor_id, float value, long timestamp);
        int dequeue(SensorData *& node_ptr);
        int clear();
        void display();

    private:
        static SensorController *_instance;
        SensorData * _head;
        SensorData * _tail;

        SensorController();
        static void task(void * parameters);

    protected:
};