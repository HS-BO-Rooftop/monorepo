#include "ontop_client.h"

OnTopClient * OnTopClient::_instance = nullptr;

OnTopClient::OnTopClient(){
    wifiController = WifiController::getInstance();
    this->fh = FileHandler::getInstance();
}

OnTopClient::~OnTopClient(){
    delete wifiController;
    delete _instance;
}

OnTopClient * OnTopClient::getInstance()
{
    if (_instance == nullptr)
    {
        _instance = new OnTopClient();
    }
    return _instance;
}

int OnTopClient::initDevice(){
    char * endpoint = "http://192.168.0.158:3000/api/register";
    char * requestResult = nullptr;
    bool isConfigAvailable = false;
    StaticJsonDocument<64> requestBodyDoc;
    StaticJsonDocument<32> responseDoc;
    String serializedBody;

    if(fh->exists((char *)DATACOLLECTOR_CONFIG_PATH) == 1)
    {
        isConfigAvailable = true;
        fh->read((char *)DATACOLLECTOR_CONFIG_PATH, (byte *)&datacollectorConfig, sizeof(datacollectorConfig));
        requestBodyDoc["id"] = datacollectorConfig.deviceId;
        Serial.println("Found Config");
        Serial.println(datacollectorConfig.deviceId);
    }else{
        requestBodyDoc["id"] = nullptr;
    }

    serializeJson(requestBodyDoc, serializedBody);
    int statusCode = wifiController->postRequest(endpoint, serializedBody, requestResult);
    DeserializationError error = deserializeJson(responseDoc, requestResult);

    if (error)
    {
        Serial.print("deserializeJson() failed: ");
        Serial.println(error.c_str());
        return 0;
    }

    const char * deviceId  = responseDoc["id"]; // "2820c7d8-858b-4afc-9004-cb15db1f746f"
    uint32_t timestamp = responseDoc["timestamp"]; // 1666205789702

    if(!isConfigAvailable)
    {
        datacollectorConfig.initialized = 0x65;
        strcpy(datacollectorConfig.deviceName, "");
        strcpy(datacollectorConfig.deviceId, deviceId);
        datacollectorConfig.registrationDate = timestamp;
        fh->write((char *)DATACOLLECTOR_CONFIG_PATH, (byte *)&datacollectorConfig, sizeof(datacollectorConfig));
    }

    return statusCode;
}