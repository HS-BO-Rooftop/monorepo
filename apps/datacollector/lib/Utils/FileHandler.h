#pragma once
#include <ArduinoJson.h>
#include "SPIFFS.h"

class FileHandler
{
    public:
        ~FileHandler();
        static FileHandler *getInstance();
        int read(char *file_path, byte *buffer, size_t size);
        int write(char *file_path, byte *data, size_t size);
        int exists(char *file_path);
        int remove(char *file_path);

    private:
        static FileHandler *_instance;
        FileHandler *_file_handler;

        FileHandler();
        void initSPIFFS();

    protected:
};