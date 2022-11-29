#pragma once
#include <Arduino.h>
#include "../ViewInterface.h"

class HomeView : virtual public ViewInterface
{
    public:
        HomeView();
        ~HomeView();
        int render() override;
        void onClick(uint8_t) override;

    private:

    protected:

};