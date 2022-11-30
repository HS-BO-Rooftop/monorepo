# Trigger: 
- Sensor Wert > oder < bestimmter Wert
  - SensorId
  - Wert
  - Operator 
- Uhrzeit =
  - Uhrzeit   
- Wasserstand >, <, >=, <=, = bestimmter Wert
  - Wert
  - Operator 

# Bedingungen:
- Sensor Wert >, <, >= , <=, = bestimmtert Wert
  - SensorId
  - Wert
  - Operator 
- Uhrzeit >, <, >=, <= , = bestimmte Uhrzeit
  - Wert
  - Operator 
- Wetter: 
  - Kein Regen aktuell
  - Kein Regen vorhergesagt für die nächsten x-Stunden
    - Wert 
- Wasserstand >, <, >=, <=, = bestimmter Wert
  - Wert
  - Operator 
- Zeitdifferenz seit letzer Ausführung: >, <, >=, <=.
  - Wert
  - Operator 

# Aktionen:
- Bewässerung einschalten
  - Board
- Bewässerung ausschalten
  - Board 
- Bewässerung für Dauer einschalten
  - Board 
  - Dauer
- GPIO für Dauer einschalten
  - Board
  - GPIO
  - Dauer 

- Optional: MQTT Nachricht senden?
