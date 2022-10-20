#pragma once
#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <AsyncTCP.h>
#include <string>
#include <HTTPClient.h>
#include <map>
#include "Interface.h"
#include "SPIFFS.h"
#include "../utils/FileHandler.h"

class WifiController
{
    public:
        NetworkConfig g_network_config;

        ~WifiController();
        static WifiController *getInstance();
        int debugSetNetworkConfig();
        wl_status_t status();
        bool isNetworkConfigAvailable();
        int connect();
        int disconnect();
        int openAccessPoint();
        void printNetworkConfig();
        const char * getMacAddress();
        int readNetworkConfig();
        int removeNetworkConfig();
        int writeNetworkConfig(NetworkConfig config_ptr);
        int postRequest(const char *url, String request_body, char *& response_ptr);
        int getRequest(const char *url, String request_body);

    private:
        static WifiController *_instance;
        FileHandler *_file_handler;
        unsigned long _previous_millis;
        HTTPClient _http;
        WiFiClient _client;

        WifiController();
        void setup();
        void initSPIFFS();
        void httpListener();
        int initializeTask();
        static void task(void * parameters);

    protected:
};