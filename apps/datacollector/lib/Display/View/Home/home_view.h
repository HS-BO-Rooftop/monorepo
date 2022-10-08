#pragma once
#include <Arduino.h>
#include "../view.h"
#include "../Display/display_controller.h"

class HomeView : public View
{
    public:
        int render() override;
        HomeView();

    protected:
    private:
};