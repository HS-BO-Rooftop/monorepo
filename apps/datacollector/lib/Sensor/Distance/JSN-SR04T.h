#pragma once
#include <memory>
#include <Arduino.h>

class JSNSR04T
{
    public:
        static JSNSR04T *getInstance();
        int getValue();
    private:
        static JSNSR04T *instance;
        JSNSR04T();

        long duration;
        int distance;

        int init();
    protected:
};