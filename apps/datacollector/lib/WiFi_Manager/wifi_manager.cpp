#include "wifi_manager.h"

AsyncWebServer server(80);

WifiManager *WifiManager::instance = nullptr;

char const *CONFIG_PATH = NETWORK_CONFIG;
unsigned long previousMillis = 0;
const long interval = TIMEOUT_MS;

WifiManager *WifiManager::getInstance()
{
    if (instance == nullptr)
    {
        instance = new WifiManager();
    }
    return instance;
}

WifiManager::WifiManager()
{
    this->fh = FileHandler::getInstance();
    setup();
}

int WifiManager::initWifi()
{
    if (networkConfig.ssid == "" || networkConfig.password)
    {
        Serial.println("Undefined SSID or password.");
        return 1;
    }

    IPAddress localIP;
    IPAddress localGateway;
    IPAddress subnet;

    WiFi.mode(WIFI_STA);

    subnet.fromString(networkConfig.subnet);
    localGateway.fromString(networkConfig.gateway);

    if (networkConfig.isDynamicAddress)
    {
        localIP.fromString(networkConfig.staticAddress);
        if (!WiFi.config(localIP, localGateway, subnet))
        {
            Serial.println("STA Failed to configure");
            return 1;
        }
    }

    WiFi.begin(networkConfig.ssid, networkConfig.password);
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
    removeNetworkConfig();
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

    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(SPIFFS, "/index.html", "text/html"); });

    server.serveStatic("/", SPIFFS, "/");

    server.on("/", HTTP_POST, [](AsyncWebServerRequest *request)
              {
        NetworkConfig sessionConfig = {"", "", "", "", false, ""};
        int i;
        int params = request->params();
        for (i = 0; i < params; i++)
        {
            AsyncWebParameter *p = request->getParam(i);
            if (p->isPost())
            {
            if (p->name() == WEB_INPUT_SSID)
            {
                Serial.print("SSID set to: ");
                Serial.println(p->value().c_str());
                strcpy(sessionConfig.ssid, p->value().c_str());
            }
            if (p->name() == WEB_INPUT_PASSWORD)
            {
                Serial.print("Password set to: ");
                Serial.println(p->value());
                strcpy(sessionConfig.password, p->value().c_str());
            }
            if (p->name() == WEB_INPUT_STATIC_IP)
            {
                Serial.print("IP Address set to: ");
                Serial.println(p->value());
                sessionConfig.isDynamicAddress = true;
                strcpy(sessionConfig.staticAddress, p->value().c_str());
            }
            if (p->name() == WEB_INPUT_GATEWAY)
            {
                Serial.print("Gateway set to: ");
                Serial.println(p->value().c_str());
                strcpy(sessionConfig.gateway, p->value().c_str());
            }
            if (p->name() == WEB_INPUT_SUBNET)
            {
                Serial.print("subnet set to: ");
                Serial.println(p->value().c_str());
                strcpy(sessionConfig.subnet, p->value().c_str());
            }
        }
        Serial.println("Writing Data...");
        if(i == params-1){
            WifiManager * instance = WifiManager::getInstance();
            instance->writeNetworkConfig(sessionConfig);
        }
    } 
    request->send(200, "text/plain", "Done. ESP will restart, connect to your router and go to IP address: ");
    delay(3000);
    ESP.restart(); });
}

void WifiManager::setup()
{
    initSPIFFS();

    if (!(checkNetworkConfig()))
    {
        Serial.println("Opening access point...");
        WiFi.softAP(WIFI_HOSTNAME, WIFI_PASSWORD);

        IPAddress IP = WiFi.softAPIP();
        Serial.println(IP);

        httpListener();
        server.begin();
    }
    else
    {
        readNetworkConfig();
        Serial.println("Network Config Found");
        initWifi();
    }
}

int WifiManager::writeNetworkConfig(NetworkConfig configPtr)
{
    int status = fh->write((char *)CONFIG_PATH, (byte *)&configPtr, sizeof(networkConfig));
    return status;
}

int WifiManager::readNetworkConfig()
{
    return fh->read((char *)CONFIG_PATH, (byte *)&networkConfig, sizeof(networkConfig));
}

int WifiManager::removeNetworkConfig()
{
    return fh->remove((char *)CONFIG_PATH);
}

int WifiManager::checkNetworkConfig()
{
    return fh->exists((char *)CONFIG_PATH);
}