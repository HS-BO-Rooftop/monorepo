#pragma once
#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <AsyncTCP.h>
#include <string>
#include "SPIFFS.h"
#include "../Utils/file_handler.h"

#define NETWORK_CONFIG "/config/network.txt"
#define TIMEOUT_MS 10000

struct NetworkConfig
{
    char ssid[33];
    char password[33];
    char gateway[16];
    bool isDynamicAddress;
    char staticAddress[16];
};

class WifiManager
{
public:
    static WifiManager *getInstance();

private:
    static WifiManager *instance;
    int connectionStatus;
    FileHandler *fh;
    NetworkConfig networkConfig;

    WifiManager();
    void setup();
    unsigned long previousMillis;
    void initSPIFFS();
    int initWifi();
    void httpListener();
    int checkNetworkConfig();
    int removeNetworkConfig();
    int writeNetworkConfig();

protected:
};