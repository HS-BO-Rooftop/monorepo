#pragma once

// ** WIFI_CONTROLLER **
#define DEBUG_SSID ""
#define DEBUG_PASSWORD ""
#define DEBUG_GATEWAY "192.168.0.1"
#define DEBUG_SUBNET "255.255.255.0"
#define DEBUG_IS_DYNAMIC_ADDRESS false
#define DEBUG_STATIC_ADDRESS "192.168.0.2"

#define WIFI_HOSTNAME "Datacollector"
#define WIFI_PASSWORD "123454321"

#define WEB_INPUT_SSID "ssid"
#define WEB_INPUT_PASSWORD "password"
#define WEB_INPUT_GATEWAY "gateway"
#define WEB_INPUT_SUBNET "subnet"
#define WEB_INPUT_STATIC_IP "static-ip"

#define NETWORK_CONFIG "/config/network.txt"
#define TIMEOUT_MS 10000

// ** ONTOP__CLIENT **
#define DATACOLLECTOR_CONFIG_PATH "/config/datacollector.txt"

struct NetworkConfig
{
    char ssid[33];
    char password[33];
    char gateway[16];
    char subnet[16];
    bool isDynamicAddress;
    char staticAddress[16];
};

struct DatacollectorConfig
{
        uint16_t initialized;
        char deviceId[37];
        char deviceName[51];
        uint32_t registrationDate;
};