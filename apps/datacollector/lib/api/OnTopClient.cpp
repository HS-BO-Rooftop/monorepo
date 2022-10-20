#include "OnTopClient.h"

OnTopClient * OnTopClient::_instance = nullptr;

OnTopClient::OnTopClient(){
    _wifi_controller = WifiController::getInstance();
    _file_handler = FileHandler::getInstance();
}

OnTopClient::~OnTopClient(){
    delete _wifi_controller;
    delete _instance;
}

OnTopClient * OnTopClient::getInstance(){
    if (_instance == nullptr)
    {
        _instance = new OnTopClient();
    }

    return _instance;
}

int OnTopClient::initDevice(){
    const char * m_url = API_SERVER API_REGISTER;
    char * m_request_result = nullptr;
    bool m_is_config_available = false;
    StaticJsonDocument<64> m_request_body_doc;
    StaticJsonDocument<32> m_response_doc;
    String m_serialized_body;

    if(_file_handler->exists((char *)DATACOLLECTOR_CONFIG_PATH) == 1)
    {
        m_is_config_available = true;
        _file_handler->read((char *)DATACOLLECTOR_CONFIG_PATH, (byte *)&g_datacollector_config, sizeof(g_datacollector_config));
        m_request_body_doc["id"] = g_datacollector_config.device_id;

        Serial.println("Found Config");
        Serial.println(g_datacollector_config.device_id);
    }else{
        m_request_body_doc["id"] = nullptr;
    }

    serializeJson(m_request_body_doc, m_serialized_body);
    int m_status_code = _wifi_controller->postRequest(m_url, m_serialized_body, m_request_result);
    DeserializationError error = deserializeJson(m_response_doc, m_request_result);

    if (error)
    {
        Serial.print("deserializeJson() failed: ");
        Serial.println(error.c_str());
        return 0;
    }

    const char * m_device_id  = m_response_doc["id"]; // "2820c7d8-858b-4afc-9004-cb15db1f746f"
    uint32_t m_timestamp = m_response_doc["timestamp"]; // 1666205789702

    if(!m_is_config_available)
    {
        g_datacollector_config.initialized = 0x65;
        strcpy(g_datacollector_config.device_name, "");
        strcpy(g_datacollector_config.device_id, m_device_id);
        g_datacollector_config.registration_date = m_timestamp;
        _file_handler->write((char *)DATACOLLECTOR_CONFIG_PATH, (byte *)&g_datacollector_config, sizeof(g_datacollector_config));
    }

    return m_status_code;
}

int OnTopClient::syncDevice(){
    return 0;
}