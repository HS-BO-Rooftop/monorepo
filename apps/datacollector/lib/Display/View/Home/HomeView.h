#pragma once
#include <Arduino.h>
#include "../View.h"
#include "../Display/DisplayController.h"

class HomeView : public View
{
    public:
        int render() override;
        HomeView();

    protected:
    private:
};