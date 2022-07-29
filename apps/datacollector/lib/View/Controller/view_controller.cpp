#include "../Model/view_controller.h"

ViewController *ViewController::instance = nullptr;

ViewController *ViewController::getInstance()
{
    if (instance == 0)
    {
        instance = new ViewController();
    }
    return instance;
}

ViewController::ViewController()
{
}