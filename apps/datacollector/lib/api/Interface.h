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

#define NETWORK_CONFIG_PATH "/config/network.txt"
#define NTP_SERVER "de.pool.ntp.org"
#define TIMEZONE 1 // 1 -> GMT + 1
#define TIMEOUT_MS 10000

// ** ONTOP__CLIENT **
#define DATACOLLECTOR_CONFIG_PATH "/config/datacollector.txt"
#define API_SERVER "http://192.168.0.158:3000"
#define API_REGISTER "/api/register"
#define API_HEARTBEAT "/api/heartbeat"

struct NetworkConfig
{
    char ssid[33];
    char password[33];
    char gateway[16];
    char subnet[16];
    bool is_dynamic_address;
    char static_address[16];
};

struct DatacollectorConfig
{
        uint16_t initialized;
        char device_id[37];
        char device_name[51];
        uint32_t registration_date;
};