from datetime import datetime as dt
import os
import json

LOG_INFO = "INFO"
LOG_ERROR = "ERROR"


class Utils:
    def __init__(self):
        self._configPath = "config"

    def logMessage(self, msg, type=LOG_INFO):
        print(f"[{self.getTimestamp()}][{type}]: {msg}")

    def getTimestamp(self, format="%d/%m/%y-%H:%M:%S"):
        now = dt.now()
        return now.strftime(format)

    def getJsonFromFile(self, file, path=None):
        try:
            dirName = os.path.dirname(__file__)
            filePath = f"{self._configPath}/{file}"

            if path != None:
                f"{path}/{file}"

            systemPath = os.path.join(dirName, filePath)
            file = open(systemPath)
            json_data = json.load(file)
            file.close()

            return json_data
        except Exception as e:
            self.logMessage(
                f"Error while reading from file: {e}", LOG_ERROR)
            return False

    def validateJsonEntry(self, data, key):
        try:
            if isinstance(data[key], str):
                if len(data[key]) == 0 or data[key] == None:
                    self.logMessage(
                        f"Found unsupported length or Null in '{key}'", LOG_ERROR)
                    return False
            return data[key]
        except Exception as e:
            self.logMessage(
                f"Error while validating json data: {e}", LOG_ERROR)
            return False
