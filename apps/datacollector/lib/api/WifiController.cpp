#include "WifiController.h"

WifiController *WifiController::_instance = nullptr;
AsyncWebServer _server(80);

WifiController::WifiController(){
    _file_handler = FileHandler::getInstance();
    _previous_millis = 0;
    setup();
}

WifiController::~WifiController(){}

WifiController *WifiController::getInstance(){
    if (_instance == nullptr)
    {
        _instance = new WifiController();
    }
    return _instance;
}

void WifiController::initSPIFFS()
{
    if (!SPIFFS.begin(true))
    {
        Serial.println("An error has occurred while mounting SPIFFS");
    }
    Serial.println("SPIFFS mounted successfully");
}

void WifiController::httpListener(){
    _server.onNotFound([](AsyncWebServerRequest *request)
                      { request->send(404); });

    _server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
              { request->send(SPIFFS, "/index.html", "text/html"); });

    _server.serveStatic("/", SPIFFS, "/");

    _server.on("/", HTTP_POST, [](AsyncWebServerRequest *request)
              {
        NetworkConfig m_session_config = {"", "", "", "", false, ""};
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
                strcpy(m_session_config.ssid, p->value().c_str());
            }
            if (p->name() == WEB_INPUT_PASSWORD)
            {
                Serial.print("Password set to: ");
                Serial.println(p->value());
                strcpy(m_session_config.password, p->value().c_str());
            }
            if (p->name() == WEB_INPUT_STATIC_IP)
            {
                Serial.print("IP Address set to: ");
                Serial.println(p->value());
                m_session_config.is_dynamic_address = true;
                strcpy(m_session_config.static_address, p->value().c_str());
            }
            if (p->name() == WEB_INPUT_GATEWAY)
            {
                Serial.print("Gateway set to: ");
                Serial.println(p->value().c_str());
                strcpy(m_session_config.gateway, p->value().c_str());
            }
            if (p->name() == WEB_INPUT_SUBNET)
            {
                Serial.print("subnet set to: ");
                Serial.println(p->value().c_str());
                strcpy(m_session_config.subnet, p->value().c_str());
            }
        }
        Serial.println("Writing Data...");
        if(i == params-1) WifiController::getInstance()->writeNetworkConfig(m_session_config);
    }

    request->send(200, "text/plain", "Datacollector startet jetzt neu und ist im Netzwerk verfügbar");
    delay(3000);
    ESP.restart(); });
}

void WifiController::setup(){
    initSPIFFS();

    if (!(isNetworkConfigAvailable())){
        openAccessPoint();
    }else{
        connect();
    }
}

int WifiController::writeNetworkConfig(NetworkConfig config_ptr){
    int m_status = _file_handler->write((char *)NETWORK_CONFIG_PATH, (byte *)&config_ptr, sizeof(g_network_config));

    return m_status;
}

int WifiController::readNetworkConfig(){
    return _file_handler->read((char *)NETWORK_CONFIG_PATH, (byte *)&g_network_config, sizeof(g_network_config));
}

int WifiController::removeNetworkConfig(){
    return _file_handler->remove((char *)NETWORK_CONFIG_PATH);
}

bool WifiController::isNetworkConfigAvailable(){
    if(_file_handler->exists((char *)NETWORK_CONFIG_PATH) == 1) return true;

    return false;
}

void WifiController::printNetworkConfig(){
    if(isNetworkConfigAvailable()){
        Serial.println("=== NETWORK CONFIG ===");
        Serial.print("ssid: ");
        Serial.println(g_network_config.ssid);
        Serial.print("password: ");
        Serial.println(g_network_config.password);
        Serial.print("gateway: ");
        Serial.println(g_network_config.gateway);
        Serial.print("subnet: ");
        Serial.println(g_network_config.subnet);
        Serial.print("isDynamicAddress: ");
        Serial.println(g_network_config.is_dynamic_address);
        Serial.print("staticAddress: ");
        Serial.println(g_network_config.static_address);
        Serial.println("======================");
    }
}

const char * WifiController::getMacAddress(){
    return WiFi.macAddress().c_str();
}

int WifiController::debugSetNetworkConfig(){
    NetworkConfig m_session_config = {"", "", "", "", false, ""};

    strcpy(m_session_config.ssid, DEBUG_GATEWAY);
    strcpy(m_session_config.password, DEBUG_PASSWORD);
    strcpy(m_session_config.gateway, DEBUG_GATEWAY);
    strcpy(m_session_config.subnet, DEBUG_SUBNET);
    m_session_config.is_dynamic_address = DEBUG_IS_DYNAMIC_ADDRESS;
    strcpy(m_session_config.static_address, DEBUG_STATIC_ADDRESS);

    writeNetworkConfig(m_session_config);

    return 0;
}

wl_status_t WifiController::status(){
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

int WifiController::connect(){
    readNetworkConfig();

    if (g_network_config.ssid == "" || g_network_config.password == "")
    {
        Serial.println("No valid SSID and/or password given.");
        return 1;
    }

    IPAddress m_local_ip;
    IPAddress m_local_gateway;
    IPAddress m_subnet;

    WiFi.mode(WIFI_STA);

    m_subnet.fromString(g_network_config.subnet);
    m_local_gateway.fromString(g_network_config.gateway);

    if (g_network_config.is_dynamic_address){
        m_local_ip.fromString(g_network_config.static_address);
        if (!WiFi.config(m_local_ip, m_local_gateway, m_subnet))
        {
            Serial.println("STA Failed to configure");
            return 10;
        }
    }

    unsigned long m_current_millis = millis();
    _previous_millis = m_current_millis;

    WiFi.setHostname(WIFI_HOSTNAME);
    WiFi.begin(g_network_config.ssid, g_network_config.password);

    while (WiFi.status() != WL_CONNECTED){
        m_current_millis = millis();
        if (m_current_millis - _previous_millis >= TIMEOUT_MS)
        {
            Serial.println("Failed to connect.");
            return 1;
        }
    }
    Serial.println(WiFi.localIP());

    return 0;
}

int WifiController::disconnect(){
    if(status() == WL_CONNECTED){
        WiFi.disconnect();

        return 0;
    }

    return 1;
}

int WifiController::openAccessPoint(){
    WiFi.softAP(WIFI_HOSTNAME, WIFI_PASSWORD);

    IPAddress IP = WiFi.softAPIP();
    httpListener();

    _server.begin();

    return 0;
}

int WifiController::initializeTask(){
    Serial.println("[Info]: Initializing wifi_controller...");

    xTaskCreate(
        task,
        "WIFI_CONTROLLER_TASK",
        2000,
        NULL,
        1,
        NULL
    );

    return 0;
}

void WifiController::task(void * parameters){
     for(;;){
        vTaskDelay(100 / portTICK_PERIOD_MS);
    };
}

int WifiController::postRequest(const char *url, String request_body, char *& response_ptr){
    uint8_t m_http_code = 0;

    if(WiFi.status() == WL_CONNECTED)
    {
        _http.begin(_client, url);
        _http.addHeader("Content-Type", "application/json");

        m_http_code = _http.POST(request_body);
        response_ptr = const_cast<char*>(_http.getString().c_str());

        _http.end();
    }
    return m_http_code;
}

int WifiController::getRequest(const char *endpoint, String request_body){
    if(WiFi.status() == WL_CONNECTED)
    {
        _http.begin(endpoint);
        _http.GET();

        //String for storing server response
        String m_response = "";
        //JSON document
        DynamicJsonDocument m_doc(2048);

        //Response from server
        m_response = _http.getString();
        //Parse JSON, read error if any
        DeserializationError error = deserializeJson(m_doc, m_response);
        if(error) {
            Serial.print(F("deserializeJson() failed: "));
            Serial.println(error.f_str());
            return 1;
        }
        //Print parsed value on Serial Monitor
        Serial.println(m_doc["name"].as<char*>());
        //Close connection
        _http.end();
    }
    return 0;
}