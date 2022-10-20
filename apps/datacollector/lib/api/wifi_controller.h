#pragma once
#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <AsyncTCP.h>
#include <string>
#include <HTTPClient.h>
#include <map>
#include "api_interface.h"
#include "SPIFFS.h"
#include "../utils/file_handler.h"

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