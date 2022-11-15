#pragma once
#include <memory>
#include <Arduino.h>
#include "HttpsOTAUpdate.h"

class OtaController
{
    public:
        static OtaController *getInstance();
        bool getUpdateAvailable();
        void doOta();
    private:
        static OtaController *instance;
        OtaController();
        void checkUpdate();
        static void HttpEvent(HttpEvent_t *event);
    protected:
};