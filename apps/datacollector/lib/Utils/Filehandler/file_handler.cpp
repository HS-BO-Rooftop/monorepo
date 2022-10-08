#include "file_handler.h"

FileHandler *FileHandler::instance = nullptr;

FileHandler *FileHandler::getInstance()
{
    if (instance == nullptr)
    {
        instance = new FileHandler();
    }
    return instance;
}

FileHandler::FileHandler()
{
    initSPIFFS();
}

int FileHandler::read(char *filePath, byte *buffer, size_t size)
{
    if (exists(filePath))
    {
        File file = SPIFFS.open(filePath, FILE_READ);
        Serial.println(file.size());
        if (file)
        {
            file.read(buffer, size);
            file.close();
        }
        else
        {
            Serial.println("[FileHandler::read - Failed to open file.");
            return 1;
        }
        return 0;
    }
    return 1;
}

int FileHandler::remove(char *filePath)
{
    if (exists(filePath))
    {
        SPIFFS.remove(filePath);
        return 0;
    }
    return 1;
}

int FileHandler::exists(char *filePath)
{
    return SPIFFS.exists(filePath);
}

int FileHandler::write(char *filePath, byte *data, size_t size)
{
    File file = SPIFFS.open(filePath, FILE_WRITE);

    /* for (int i = 0; i < size; i++)
    {
        Serial.print(data[i], HEX);
    } */

    if (file)
    {
        file.write(data, size);
        file.close();
        return 0;
    }
    else
    {
        Serial.println("FileHandler::write - Failed to open file.");
        return 1;
    }
}

void FileHandler::initSPIFFS()
{
    if (!SPIFFS.begin(true))
    {
        Serial.println("An error has occurred while mounting SPIFFS");
    }
    Serial.println("SPIFFS mounted successfully");
}