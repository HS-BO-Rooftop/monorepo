#include "FileHandler.h"

FileHandler *FileHandler::_instance = nullptr;

FileHandler::FileHandler(){
    initSPIFFS();
}

FileHandler::~FileHandler(){
    delete _instance;
}

FileHandler *FileHandler::getInstance(){
    if (_instance == nullptr)
    {
        _instance = new FileHandler();
    }
    return _instance;
}

int FileHandler::read(char *file_path, byte *buffer, size_t size){
    if (exists(file_path)){
        File m_file = SPIFFS.open(file_path, FILE_READ);
        log_i("filesize: %i Byte", m_file.size());

        if (m_file){
            m_file.read(buffer, size);
            m_file.close();
        }else{
            log_i("failed to open file.");
            return 1;
        }
        return 0;
    }
    return 1;
}

int FileHandler::remove(char *file_path){
    if (exists(file_path)){
        SPIFFS.remove(file_path);

        return 0;
    }

    return 1;
}

int FileHandler::exists(char *file_path){
    return SPIFFS.exists(file_path);
}

int FileHandler::write(char *file_path, byte *data, size_t size){
    File m_file = SPIFFS.open(file_path, FILE_WRITE);

    /* for (int i = 0; i < size; i++)
    {
        Serial.print(data[i], HEX);
    } */

    if (m_file){
        m_file.write(data, size);
        m_file.close();
        return 0;
    }else{
        log_i("failed to open file.");
        return 1;
    }
}

void FileHandler::initSPIFFS(){
    if (!SPIFFS.begin(true)){
        log_i("an error has occurred while mounting SPIFFS");
    }

    log_i("SPIFFS mounted successfully");
}