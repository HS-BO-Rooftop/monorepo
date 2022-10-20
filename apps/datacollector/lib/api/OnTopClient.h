#pragma once
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <string>
#include "Interface.h"
#include "WifiController.h"
#include "../utils/FileHandler.h"

class OnTopClient
{
    public:
        DatacollectorConfig g_datacollector_config;

        OnTopClient();
        ~OnTopClient();
        static OnTopClient *getInstance();
        int initDevice();
        int syncDevice();

    private:
        static OnTopClient *_instance;
        FileHandler *_file_handler;
        HTTPClient _http;
        WifiController *_wifi_controller;

    protected:
};