#include "wifi_manager.h"

AsyncWebServer server(80);

IPAddress localIP;
IPAddress localGateway;
IPAddress subnet(255, 255, 0, 0);

const char *ssid_buffer;
const char *password;
const char *ip;
const char *gateway;

unsigned long previousMillis = 0;
const long interval = TIMEOUT_MS;

const char *SSID_PATH = "/ssid.txt";
const char *PASSWORD_PATH = "/password.txt";
const char *IP_PATH = "/ip.txt";
const char *GATEWAY_PATH = "/gateway.txt";

const char *WEB_INPUT_SSID = "ssid";
const char *WEB_INPUT_PASSWORD = "password";
const char *WEB_INPUT_GATEWAY = "gateway";
const char *WEB_INPUT_STATIC_IP = "static-ip";
const char *WEB_CHECKBOX_STATIC_IP = "cb-static-ip";

WifiManager::WifiManager()
{
}

int WifiManager::initWifi()
{
    if (ssid_buffer == "" || ip == "")
    {
        Serial.println("Undefined SSID or IP address.");
        return 1;
    }

    WiFi.mode(WIFI_STA);
    localIP.fromString(ip);
    localGateway.fromString(gateway);

    if (!WiFi.config(localIP, localGateway, subnet))
    {
        Serial.println("STA Failed to configure");
        return 1;
    }

    WiFi.begin("231313", "123");
    Serial.println("Connecting to WiFi...");

    unsigned long currentMillis = millis();
    previousMillis = currentMillis;

    while (WiFi.status() != WL_CONNECTED)
    {
        currentMillis = millis();
        if (currentMillis - previousMillis >= TIMEOUT_MS)
        {
            Serial.println("Failed to connect.");
            return 1;
        }
    }

    Serial.println(WiFi.localIP());
    return 0;
}

void WifiManager::initSPIFFS()
{
    if (!SPIFFS.begin(true))
    {
        Serial.println("An error has occurred while mounting SPIFFS");
    }
    Serial.println("SPIFFS mounted successfully");
}

void WifiManager::httpListener()
{
    server.onNotFound([](AsyncWebServerRequest *request)
                      { request->send(404); });
    server.on("/test", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(SPIFFS, "/index.html", "text/html"); });

    server.serveStatic("/", SPIFFS, "/");
    Serial.println(SPIFFS.exists("/index.html"));

    server.on("/", HTTP_POST, [](AsyncWebServerRequest *request)
              {
        int params = request->params();
        Serial.println(params);
        for(int i=0;i<params;i++){
            Serial.println(i);
            AsyncWebParameter* p = request->getParam(i);
            if(p->isPost()){
            // HTTP POST ssid value
            if (p->name() == WEB_INPUT_SSID) {
                ssid_buffer = p->value().c_str();
                Serial.print("SSID set to: ");
                Serial.println(ssid_buffer);
                // Write file to save value
                //writeFile(SPIFFS, ssidPath, ssid.c_str());
            }
            // HTTP POST pass value
            if (p->name() == WEB_INPUT_PASSWORD) {
                password = p->value().c_str();
                Serial.print("Password set to: ");
                Serial.println(password);
                // Write file to save value
                //writeFile(SPIFFS, passPath, pass.c_str());
            }
            // HTTP POST ip value
            if (p->name() == WEB_INPUT_IP) {
                ip = p->value().c_str();
                Serial.print("IP Address set to: ");
                Serial.println(ip);
                // Write file to save value
                //writeFile(SPIFFS, ipPath, ip.c_str());
            }
            // HTTP POST gateway value
            if (p->name() == WEB_INPUT_GATEWAY) {
                gateway = p->value().c_str();
                Serial.print("Gateway set to: ");
                Serial.println(gateway);
                // Write file to save value
                //writeFile(SPIFFS, gatewayPath, gateway.c_str());
            }
          //Serial.printf("POST[%s]: %s\n", p->name().c_str(), p->value().c_str());
        }
    } 
    request->send(200, "text/plain", "Done. ESP will restart, connect to your router and go to IP address: ");
    delay(3000);
    ESP.restart(); });
}

void WifiManager::setup()
{
    Serial.begin(115200);

    initSPIFFS();

    IPAddress localIP;
    IPAddress localGateway;
    IPAddress subnet(255, 255, 0, 0);

    // Load values saved in SPIFFS

    if (true) //! initWifi()
    {
        // Connect to Wi-Fi network with SSID and password
        Serial.println("Setting AP (Access Point)");

        WiFi.softAP("ESP-WIFI-MANAGER", "12345");
        IPAddress IP = WiFi.softAPIP();
        Serial.print("AP IP address: ");
        Serial.println(IP);

        // Web Server Root URL

        server.on("/hello", HTTP_GET, [](AsyncWebServerRequest *request)
                  { request->send(200, "text/plain", "Hello World"); });

        httpListener();
        server.begin();
    }
    Serial.println("DONE");
}