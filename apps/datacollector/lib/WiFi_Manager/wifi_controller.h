#pragma once
#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <AsyncTCP.h>
#include <string>
#include <HTTPClient.h>
#include <map>
#include "SPIFFS.h"
#include "../Utils/file_handler.h"

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

class WifiController
{
    public:
        static WifiController *getInstance();
        NetworkConfig networkConfig;

        int debugSetNetworkConfig();

        wl_status_t status();
        bool isNetworkConfigAvailable();
        int connect();
        int disconnect();
        int openAccessPoint();

        void printNetworkConfig();
        String getMacAddress();
        int readNetworkConfig();
        int removeNetworkConfig();
        int writeNetworkConfig(NetworkConfig configPtr);
        int postRequest(char *endpoint, String requestBody, char *& resultPtr);
        int getRequest(char *endpoint, String requestBody);

    private:
        static WifiController *instance;
        FileHandler *fh;

        WifiController();
        void setup();
        unsigned long previousMillis;
        void initSPIFFS();
        void httpListener();
        int initializeTask();
        static void task(void * parameters);
        HTTPClient _http;
        WiFiClient _client;

    protected:
};