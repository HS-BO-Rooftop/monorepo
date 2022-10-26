#pragma once
#include <memory>
#include <Arduino.h>

class jsnsr04t
{
    public:
        static jsnsr04t *getInstance();
        int getValue();
    private:
        static jsnsr04t *instance;
        jsnsr04t();

        long duration;
        int distance;

        int init();
    protected:
};