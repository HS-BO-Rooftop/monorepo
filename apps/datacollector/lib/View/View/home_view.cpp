#include "home_view.h"

Display *display = Display::getInstance();

void HomeView::render()
{
    /*
    Serial.println(">renderHomeScreen()");

    // Draw Header
    display.getTextBounds("00:00", 0, SCREEN_TEXT_LINE[0], &text_x_position, &text_y_position, &text_width, &text_height);
    display.setCursor(0, SCREEN_TEXT_LINE[0]);
    display.println("00:00");

    display.drawRect(SCREEN_WIDTH - 16, SCREEN_TEXT_LINE[0], 16, 8, WHITE);
    display.drawFastHLine(0, SCREEN_TEXT_LINE[1] + 2, SCREEN_WIDTH, WHITE);

    // Draw Footer
    display.getTextBounds("v0.1-2a43c", SCREEN_WIDTH, SCREEN_TEXT_LINE[7], &text_x_position, &text_y_position, &text_width, &text_height);
    display.setCursor(SCREEN_WIDTH - text_width, SCREEN_TEXT_LINE[7]);
    display.println("v0.1-2a43c");

    display.display();
    */
}