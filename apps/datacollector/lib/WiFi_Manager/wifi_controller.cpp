#include "wifi_controller.h"

AsyncWebServer server(80);

WifiController *WifiController::instance = nullptr;

const char *CONFIG_PATH = NETWORK_CONFIG;
unsigned long previousMillis = 0;
const long  interval = TIMEOUT_MS;

WifiController *WifiController::getInstance()
{
    if (instance == nullptr)
    {
        instance = new WifiController();
    }
    return instance;
}

WifiController::WifiController()
{
    this->fh = FileHandler::getInstance();
    setup();
}

void WifiController::initSPIFFS()
{
    if (!SPIFFS.begin(true))
    {
        Serial.println("An error has occurred while mounting SPIFFS");
    }
    Serial.println("SPIFFS mounted successfully");
}

void WifiController::httpListener()
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
            WifiController * instance = WifiController::getInstance();
            instance->writeNetworkConfig(sessionConfig);
        }
    }
    request->send(200, "text/plain", "Datacollector startet jetzt neu und ist im Netzwerk verfügbar");
    delay(3000);
    ESP.restart(); });
}

void WifiController::setup()
{
    initSPIFFS();

    if (!(isNetworkConfigAvailable()))
    {
        openAccessPoint();
    }
    else
    {
        connect();
    }
}

int WifiController::writeNetworkConfig(NetworkConfig configPtr)
{
    int status = fh->write((char *)CONFIG_PATH, (byte *)&configPtr, sizeof(networkConfig));
    return status;
}

int WifiController::readNetworkConfig()
{
    return fh->read((char *)CONFIG_PATH, (byte *)&networkConfig, sizeof(networkConfig));
}

int WifiController::removeNetworkConfig()
{
    return fh->remove((char *)CONFIG_PATH);
}

bool WifiController::isNetworkConfigAvailable()
{
    if(fh->exists((char *)CONFIG_PATH) == 1) return true;
    return false;
}

void WifiController::printNetworkConfig()
{
    if(isNetworkConfigAvailable()){
        Serial.println("=== NETWORK CONFIG ===");
        Serial.print("ssid: ");
        Serial.println(instance->networkConfig.ssid);
        Serial.print("password: ");
        Serial.println(instance->networkConfig.password);
        Serial.print("gateway: ");
        Serial.println(instance->networkConfig.gateway);
        Serial.print("subnet: ");
        Serial.println(instance->networkConfig.subnet);
        Serial.print("isDynamicAddress: ");
        Serial.println(networkConfig.isDynamicAddress);
        Serial.print("staticAddress: ");
        Serial.println(networkConfig.staticAddress);
        Serial.println("======================");
    }
}

String WifiController::getMacAddress()
{
    return WiFi.macAddress();
}

int WifiController::debugSetNetworkConfig()
{
    NetworkConfig sessionConfig = {"", "", "", "", false, ""};

    strcpy(sessionConfig.ssid, "");
    strcpy(sessionConfig.password, "");
    strcpy(sessionConfig.gateway, "192.168.0.1");
    strcpy(sessionConfig.subnet, "255.255.255.0");
    sessionConfig.isDynamicAddress = false;
    strcpy(sessionConfig.staticAddress, "");

    writeNetworkConfig(sessionConfig);
    return 0;
}

wl_status_t WifiController::status()
{
    /*
    WL_NO_SHIELD        = 255,   // for compatibility with WiFi Shield library
    WL_IDLE_STATUS      = 0,
    WL_NO_SSID_AVAIL    = 1,
    WL_SCAN_COMPLETED   = 2,
    WL_CONNECTED        = 3,
    WL_CONNECT_FAILED   = 4,
    WL_CONNECTION_LOST  = 5,
    WL_DISCONNECTED     = 6
    */
    return WiFi.status();
}

int WifiController::connect()
{
    readNetworkConfig();

    if (networkConfig.ssid == "" || networkConfig.password == "")
    {
        Serial.println("No valid SSID and/or password given.");
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
            return 10;
        }
    }

    unsigned long currentMillis = millis();
    previousMillis = currentMillis;

    WiFi.setHostname(WIFI_HOSTNAME);
    WiFi.begin(networkConfig.ssid, networkConfig.password);

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

int WifiController::disconnect()
{
    if(status() == WL_CONNECTED){
        WiFi.disconnect();

        return 0;
    }

    return 1;
}

int WifiController::openAccessPoint()
{
    WiFi.softAP(WIFI_HOSTNAME, WIFI_PASSWORD);

    IPAddress IP = WiFi.softAPIP();
    httpListener();

    server.begin();

    return 0;
}

int WifiController::initializeTask()
{
    Serial.println("[Info]:Initilizing wifi_controller...");

    xTaskCreate(
        this->task,
        "WIFI_CONTROLLER_TASK",
        2000,
        NULL,
        1,
        NULL
    );

    return 0;
}

void WifiController::task(void * parameters)
{
     for(;;){
        vTaskDelay(100 / portTICK_PERIOD_MS);
    };
}

int WifiController::postRequest(char *endpoint, String requestBody, char *& resultPtr)
{
    if(WiFi.status() == WL_CONNECTED)
    {
        _http.begin(_client, endpoint);
        _http.addHeader("Content-Type", "application/json");

        _http.POST(requestBody);

        //JSON document
        // DynamicJsonDocument doc(2048);

        //Response from server
        resultPtr = const_cast<char*>(_http.getString().c_str());
        //Parse JSON, read error if any
        /*
        DeserializationError error = deserializeJson(doc, response);
        if(error) {
            Serial.print(F("deserializeJson() failed: "));
            Serial.println(error.f_str());
            return 1;
        }
        //Print parsed value on Serial Monitor
        Serial.println(doc["id"].as<char*>());
        //Close connection
        */
        _http.end();
    }
    return 0;
}

int WifiController::getRequest(char *endpoint, String requestBody)
{
    if(WiFi.status() == WL_CONNECTED)
    {
        _http.begin(endpoint);
        _http.GET();

        //String for storing server response
        String response = "";
        //JSON document
        DynamicJsonDocument doc(2048);

        //Response from server
        response = _http.getString();
        //Parse JSON, read error if any
        DeserializationError error = deserializeJson(doc, response);
        if(error) {
            Serial.print(F("deserializeJson() failed: "));
            Serial.println(error.f_str());
            return 1;
        }
        //Print parsed value on Serial Monitor
        Serial.println(doc["name"].as<char*>());
        //Close connection
        _http.end();
    }
    return 0;
}