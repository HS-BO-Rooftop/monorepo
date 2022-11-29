#include <SensorController.h>

SensorController *SensorController::_instance = nullptr;

SensorController::SensorController(){
        log_d("initializing");

    _head = NULL;
    _tail = NULL;

    xTaskCreate(
        task,
        "SENSOR_CONTROLLER_TASK",
        2000,
        NULL,
        1,
        NULL
    );
}

SensorController::~SensorController(){
    delete _head;
    delete _tail;
    delete _instance;

    clear();
}

SensorController * SensorController::getInstance(){
    if (_instance == nullptr)
    {
        _instance = new SensorController();
    }

    return _instance;
}

void SensorController::task(void *parameters){
    for(;;){
        vTaskDelay(100 / portTICK_PERIOD_MS);
    };
}

int SensorController::enqueue(int sensor_Id, float value, long timestamp){
    log_i("got called");

    SensorData * m_node_ptr = new SensorData{sensor_Id, value, timestamp, NULL};

    if(this->_head == NULL)
    {
        this->_head = m_node_ptr;
        this->_tail = m_node_ptr;
    }
    else
    {
        _tail->next = m_node_ptr;
        _tail = _tail->next;
    }

    return true;
}

int SensorController::dequeue(SensorData *& node_ptr){
    log_i("got called");

    if(this->_head == NULL) return 1;
    node_ptr = this->_head;
    this->_head = this->_head->next;

    return 0;
}

int SensorController::clear(){
    log_i("got called");
    SensorData * m_current_node_ptr = NULL;

    while(this->_head != NULL)
    {
        m_current_node_ptr = this->_head;
        this->_head = m_current_node_ptr->next;

        delete m_current_node_ptr;
    }

    return 0;
}

void SensorController::display() {
    log_i("got called");

    SensorData * m_current_node_ptr = this->_head;

    int index = 0;
    while(m_current_node_ptr != NULL) {
        log_i("--------------------------");
        log_i("Index: %i", index++);
        log_i("SensorId: %i", m_current_node_ptr->sensorId);
        //log_i("Value: %p", currentPtr->value);
        log_i("Timestamp: %l", m_current_node_ptr->timestamp);
        m_current_node_ptr = m_current_node_ptr->next;
    }
}