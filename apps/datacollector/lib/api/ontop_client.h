#pragma once
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <string>
#include "api_interface.h"
#include "wifi_controller.h"
#include "../utils/file_handler.h"

class OnTopClient
{
    public:
        DatacollectorConfig datacollectorConfig;
        static OnTopClient *getInstance();
        WifiController * wifiController;
        int initDevice();
        int syncDevice();


        OnTopClient();
        ~OnTopClient();
    private:
        static OnTopClient * _instance;
        FileHandler *fh;
        HTTPClient _http;

    protected:
};