#pragma once
#include "wifi_controller.h"
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <string>
#include "../Utils/file_handler.h"

#define DATACOLLECTOR_CONFIG_PATH "/config/datacollector.txt"

struct DatacollectorConfig
{
        uint16_t initialized;
        char deviceId[37];
        char deviceName[51];
        uint32_t registrationDate;
};

class OnTopClient
{
    public:
        DatacollectorConfig datacollectorConfig;
        static OnTopClient *getInstance();
        WifiController * wifiController;
        int initDevice();


        OnTopClient();
        ~OnTopClient();
    private:
        static OnTopClient * _instance;
        FileHandler *fh;
        HTTPClient _http;

    protected:
};