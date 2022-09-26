#pragma once
#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <AsyncTCP.h>
#include <string>
#include "SPIFFS.h"
#include "../Utils/Filehandler/file_handler.h"

#define WIFI_HOSTNAME "Datacollector"
#define WIFI_PASSWORD "123454321"

#define WEB_INPUT_SSID "ssid"
#define WEB_INPUT_PASSWORD "password"
#define WEB_INPUT_GATEWAY "gateway"
#define WEB_INPUT_SUBNET "subnet"
#define WEB_INPUT_STATIC_IP "static-ip"

#define NETWORK_CONFIG "/config/network.txt"
#define TIMEOUT_MS 10000

struct NetworkConfig
{
    char ssid[33];
    char password[33];
    char gateway[16];
    char subnet[16];
    bool isDynamicAddress;
    char staticAddress[16];
};

class WifiManager
{
    public:
        static WifiManager *getInstance();
        NetworkConfig networkConfig;

    private:
        static WifiManager *instance;
        FileHandler *fh;

        WifiManager();
        void setup();
        unsigned long previousMillis;
        void initSPIFFS();
        int initWifi();
        void httpListener();
        int checkNetworkConfig();
        int removeNetworkConfig();
        int writeNetworkConfig(NetworkConfig configPtr);
        int readNetworkConfig();

    protected:
};