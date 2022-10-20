#pragma once
#include <ArduinoJson.h>
#include "SPIFFS.h"

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
        FileHandler *fh;
        FileHandler();
        void initSPIFFS();

    protected:
};