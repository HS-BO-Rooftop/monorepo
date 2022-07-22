from utils import Utils
import paho.mqtt.client as mqtt
import time
import asyncio

LOG_ERROR = "ERROR"
LOG_WARN = "WARN"


class Client:
    def __init__(self):
        self.utils = Utils()

        self.client = None
        self.connectionCode = 0

        self._topics = []
        self._host = None
        self._port = None
        self._username = None
        self._password = None
        self._client_id = None

    async def initMqttClient(self):
        self.utils.logMessage("Initilizing MQTT-Client...")

        try:
            if self.client != None:
                self.utils.logMessage(
                    "MQTT-Client already initilized!", LOG_WARN)
            else:
                self.client = mqtt.Client(self._client_id)

                self.client.username_pw_set(
                    self._username, self._password)

                self.client.on_connect = self.onConnect
                self.client.on_message = self.onMessage

                self.client.connect(self._host, self._port, 60)
                self.client.loop_start()
        except Exception as e:
            self.utils.logMessage(
                f"Error while initilizing MQTT-Client: {e}", LOG_ERROR)
            self.connectionCode = -1

    def loadConfiguration(self):
        self.utils.logMessage("Loading configuration...")

        try:
            settings = self.utils.getJsonFromFile("settings.json")

            self._host = self.utils.validateJsonEntry(settings, "host")
            self._port = self.utils.validateJsonEntry(settings, "port")
            self._username = self.utils.validateJsonEntry(settings, "username")
            self._password = self.utils.validateJsonEntry(settings, "password")
            self._client_id = self.utils.validateJsonEntry(
                settings, "client_id") or "master"
        except:
            self.utils.logMessage(
                f"Error while loading settings: {e}", LOG_ERROR)
            return

        try:
            self._topics = self.utils.getJsonFromFile("topics.json")
        except Exception as e:
            self.utils.logMessage(
                f"Error while loading topics: {e}", LOG_ERROR)
            return

    def subscribeTopics(self):
        for topic in self._topics["subscribed"]:
            self.client.subscribe(topic)
            self.utils.logMessage(
                f"Topic subscription: '{topic}'")

    def handleDatacollector(self):
        pass

    def handleSensor(self):
        pass

    def onConnect(self, client, userdata, flags, rc, properties=None):
        self.connectionCode = rc

    def onMessage(self, client, userdata, msg, properties=None):
        print(msg.topic, msg.payload)

    async def prepareClient(self):
        self.loadConfiguration()
        await asyncio.gather(self.initMqttClient())

    def main(self):
        asyncio.run(self.prepareClient())

        if self.connectionCode != 0:
            return

        self.utils.logMessage(
            f"Successfully connected on {self._host}:{self._port} as '{self._client_id}'")
        self.subscribeTopics()

        try:
            while True:
                time.sleep(1)
        except Exception as e:
            self.utils.logMessage(
                f"Error at runtime: {e}", LOG_ERROR)
            return
        except KeyboardInterrupt:
            return


if __name__ == '__main__':
    client = Client()
    client.main()
