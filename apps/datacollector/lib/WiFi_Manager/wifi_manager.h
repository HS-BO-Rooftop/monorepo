#pragma once
#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <AsyncTCP.h>
#include <string>
#include "SPIFFS.h"

#define TIMEOUT_MS 10000

class WifiManager
{
public:
    void setup();
    WifiManager();

private:
    unsigned long previousMillis;

    void initSPIFFS();
    int initWifi();
    void httpListener();

protected:
};