#pragma once
#include "SPIFFS.h"
#include <ArduinoJson.h>

class FileHandler
{
    public:
        static FileHandler *getInstance();
        int read(char *filePath, byte *buffer, size_t size);
        int write(char *filePath, byte *data, size_t size);
        int exists(char *filePath);
        int remove(char *filePath);

    private:
        static FileHandler *instance;
        FileHandler();
        void initSPIFFS();

    protected:
};