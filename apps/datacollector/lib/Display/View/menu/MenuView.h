#pragma once
#include "../ViewInterface.h"
#include "../Display/DisplayController.h"

class MenuView : virtual public View
{
    public:
        MenuView();
        ~MenuView();
        virtual int render() override;

    private:
        InputController *_input_controller;
    protected:
};