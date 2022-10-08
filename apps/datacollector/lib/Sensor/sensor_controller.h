#pragma once
#include <memory>
#include <Arduino.h>

class SensorController
{
    public:
        struct SensorData {
            int sensorId;
            float value;
            long timestamp;
            SensorData * next;
        };

        static SensorController *getInstance();
        int enqueue(int sensorId, float value, long timestamp);
        int dequeue(SensorData *& nodePtr);
        int clear();
        void display();
    private:
        static SensorController *instance;
        SensorController();
        ~SensorController();

        int init();
        static void task(void * parameters);
        SensorData * head;
        SensorData * tail;
    protected:
};