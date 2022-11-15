#include "HomeView.h"

HomeView::HomeView(){}
HomeView::~HomeView(){}

int HomeView::render()
{
    Serial.println("[HomeView] Rendering");
    
    Adafruit_SSD1306 m_display = DisplayController::getInstance()->getDisplay();

    m_display.clearDisplay();

    m_display.setTextSize(1);
    m_display.setTextColor(WHITE);
    m_display.setCursor(0,0);
    m_display.println("00:00");
    m_display.drawLine(0, 9, SCREEN_WIDTH, 9, WHITE);

    m_display.display();

    return 0;
}

void HomeView::onClick(uint8_t press_type){
    Serial.println("[HomeView] Button has been pressed");
}