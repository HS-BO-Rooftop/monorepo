#pragma once
#include "../Display/display.h"

class ViewController
{
public:
    static ViewController *getInstance();

protected:
private:
    static ViewController *instance;
    ViewController();
};
