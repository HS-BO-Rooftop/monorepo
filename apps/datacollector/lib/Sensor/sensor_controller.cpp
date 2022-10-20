#include <sensor_controller.h>

SensorController *SensorController::instance = nullptr;

SensorController::SensorController(){
    head = NULL;
    tail = NULL;
    init();
}

SensorController * SensorController::getInstance()
{
    if (instance == nullptr)
    {
        instance = new SensorController();
    }

    return instance;
}

void SensorController::task(void *parameters)
{
    for(;;){
        vTaskDelay(100 / portTICK_PERIOD_MS);
    };
}

int SensorController::init()
{
    Serial.println("[Info]:Initilizing sensor_controller...");

    xTaskCreate(
        this->task,
        "SENSOR_CONTROLLER_TASK",
        2000,
        NULL,
        1,
        NULL
    );

    return 0;
}

int SensorController::enqueue(int sensorId, float value, long timestamp)
{
    Serial.println("<== SensorController::enqueue()");

    SensorData * nodePtr = new SensorData{sensorId, value, timestamp, NULL};

    if(this->head == NULL)
    {
        this->head = nodePtr;
        this->tail = nodePtr;
    }
    else
    {
        tail->next = nodePtr;
        tail = tail->next;
    }

    return true;
}

int SensorController::dequeue(SensorData *& nodePtr)
{
    Serial.println("<== SensorController::dequeue()");

    if(this->head == NULL) return 1;
    nodePtr = this->head;
    this->head = this->head->next;

    return 0;
}

int SensorController::clear()
{
    Serial.println("<== SensorController::clear()");
    SensorData * currentPtr = NULL;

    while(this->head != NULL)
    {
        currentPtr = this->head;
        this->head = currentPtr->next;
        delete currentPtr;
    }

    return 0;
}

void SensorController::display()
{
    Serial.println("<== SensorController::display()");

    SensorData * currentPtr = this->head;

    int index = 0;
    while(currentPtr != NULL) {
        Serial.println("--------------------------");
        Serial.println("Index: " + index++);
        Serial.println("SensorId: " + currentPtr->sensorId);
        //Serial.println("Value: " + currentPtr->value);
        Serial.println("Timestamp: " + currentPtr->timestamp);
        currentPtr = currentPtr->next;
    }
}

SensorController::~SensorController()
{
    clear();
}