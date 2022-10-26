#include "OtaController.h"

OtaController *OtaController::instance = nullptr;

bool updateAvailable = false;
bool updateChecked = false;
static const char *url = "https://ontop.hs-bochum.de/update/firmware.bin";
static const char *server_certificate = "-----BEGIN CERTIFICATE-----\n"
                                        "MIIEKTCCAxGgAwIBAgIUP4sRxAYtFj9xUf9eyKjdVTJNavIwDQYJKoZIhvcNAQEL\n"
                                        "BQAwgaMxCzAJBgNVBAYTAkRFMRMwEQYDVQQIDApTb21lLVN0YXRlMQ8wDQYDVQQH\n"
                                        "DAZCb2NodW0xGjAYBgNVBAoMEUhvY2hzY2h1bGUgQm9jaHVtMQ4wDAYDVQQLDAVG\n"
                                        "QiBFSTEaMBgGA1UEAwwRT25Ub3AgQ2VydC1TZXJ2ZXIxJjAkBgkqhkiG9w0BCQEW\n"
                                        "F0l0LXN1cHBvcnRAaHMtYm9jaHVtLmRlMB4XDTIyMTAyNDA5NTY1N1oXDTI1MTAy\n"
                                        "MzA5NTY1N1owgaMxCzAJBgNVBAYTAkRFMRMwEQYDVQQIDApTb21lLVN0YXRlMQ8w\n"
                                        "DQYDVQQHDAZCb2NodW0xGjAYBgNVBAoMEUhvY2hzY2h1bGUgQm9jaHVtMQ4wDAYD\n"
                                        "VQQLDAVGQiBFSTEaMBgGA1UEAwwRT25Ub3AgQ2VydC1TZXJ2ZXIxJjAkBgkqhkiG\n"
                                        "9w0BCQEWF0l0LXN1cHBvcnRAaHMtYm9jaHVtLmRlMIIBIjANBgkqhkiG9w0BAQEF\n"
                                        "AAOCAQ8AMIIBCgKCAQEAqINFpsKJPsQ/1rqdEGCCWZIveZQHFBJBqlszqt0bwT2K\n"
                                        "mKjsTfHvNU9KSlurPwlju5ctMuId424iau1fouxdAyHVox01Uz+byvzWq1sJHnfY\n"
                                        "83UDhce3hmyINbIVHBggsHaPdRplPXuDF6SUM/Fg0svTQ2BcWNRf/IUU+MOu0GYG\n"
                                        "v29Jd0kHF0OkvF5ZLw5ACYMez9EgV24mGTS9zGPvImc5eGa46VgMzLJYXuktTTfV\n"
                                        "RxYD4t1uUIizdt3CVFatEwzGwfCdUB+IL1aEWt4F2hJQw6CbRqt860YT60MzZVEi\n"
                                        "XZwWRF4QN+kfv7l8SH5uwhQqO7I19zMuhslQp68+VwIDAQABo1MwUTAdBgNVHQ4E\n"
                                        "FgQUGk+ypjN1o9Fb/RWCMDbfgD8OJeQwHwYDVR0jBBgwFoAUGk+ypjN1o9Fb/RWC\n"
                                        "MDbfgD8OJeQwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEADpTX\n"
                                        "s/AyFBKzpfm6LjBxkjYyYzz/0tusGDKLPIAKviW6fbO6ZheISDTHNFQlcYh+fK+i\n"
                                        "kkfLCrTzEct8wR0rDeqpQjg8JXu0TEYVB20rfFqnlTysnj1seSDjmFpKMNNHtmx8\n"
                                        "4rAohmNFxTTrFt3x9Z9VeJKD+42c4qtjNsOn7XUhskYJD99S+qH3/Xpe/WC01Fpe\n"
                                        "7oye6va5hGdWcyfDlCr9DoTgiezgpRklGhPbf8W+E+t8C3PDiKez7h/KyguSOgDi\n"
                                        "12w1v+T+UNChh4bI8Narflbkerl6oCX8ARoPmU4K6EquXfanF/HwqH6Z93MsdwBp\n"
                                        "+gOdJlzKd7xC9tqsCQ==\n"
                                        "-----END CERTIFICATE-----";
static HttpsOTAStatus_t otastatus;

OtaController::OtaController()
{
    Serial.println("OtaController initializing.");
}

OtaController *OtaController::getInstance()
{
    if (instance == nullptr)
    {
        instance = new OtaController();
    }
    return instance;
}

void OtaController::HttpEvent(HttpEvent_t *event)
{
    switch (event->event_id)
    {
    case HTTP_EVENT_ERROR:
        Serial.println("Http Event Error");
        break;
    case HTTP_EVENT_ON_CONNECTED:
        Serial.println("Http Event On Connected");
        break;
    case HTTP_EVENT_HEADER_SENT:
        Serial.println("Http Event Header Sent");
        break;
    case HTTP_EVENT_ON_HEADER:
        Serial.printf("Http Event On Header, key=%s, value=%s\n", event->header_key, event->header_value);
        break;
    case HTTP_EVENT_ON_DATA:
        break;
    case HTTP_EVENT_ON_FINISH:
        Serial.println("Http Event On Finish");
        break;
    case HTTP_EVENT_DISCONNECTED:
        Serial.println("Http Event Disconnected");
        break;
    }
}

bool OtaController::getUpdateAvailable()
{
    OtaController::checkUpdate();
    return updateAvailable;
}

void OtaController::checkUpdate()
{
    updateChecked = true;

    // Debug. To be replaced by version check
    updateAvailable = true;
}

void OtaController::doOta()
{
    // Check for updates if not done by user before
    if (!updateChecked)
    {
        OtaController::checkUpdate();
    }

    // Only start OTA if update is possible
    if (updateAvailable)
    {
        double otaStart;
        double otaTimeElapsed = 0;

        HttpsOTA.onHttpEvent(OtaController::HttpEvent);
        
        otaStart = millis();
        HttpsOTA.begin(url, server_certificate);
        Serial.println("Starting OTA");

        for (;;)
        { // shit code: build thread
            otastatus = HttpsOTA.status();

            switch (otastatus)
            {
            case HTTPS_OTA_UPDATING:
                Serial.println("OTA is currently running.");
                delay(1000);
                continue;
            case HTTPS_OTA_FAIL:
                Serial.println("OTA failed!");
                delay(1000);
                continue;
            case HTTPS_OTA_SUCCESS:
                otaTimeElapsed = millis() - otaStart;
                Serial.print("OTA did complete in ");
                Serial.print(otaTimeElapsed / 1000);
                Serial.println(" s. Reboot device to apply.");
                break;
            }
            break;
        }
    }
    else
    {
        Serial.println("No update available.");
    }
}