#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>  // Add this line

#define DHTPIN 4         // Change this to the correct GPIO pin
#define DHTTYPE DHT22    // Sensor type (DHT22 / AM2302)
DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "WifiSSID";    // WiFi network name
const char* password = "WifiPassword"; // WiFi password
const char* serverUrl = "http://<SERVER_IP>:3000/api/data";  // Server URL

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi network...");
    }
    
    Serial.println("✅ Connected to WiFi network!");
    dht.begin();  // Start sensor reading
}

void loop() {
    if (WiFi.status() == WL_CONNECTED) {
        float temperature = dht.readTemperature();
        float humidity = dht.readHumidity();

        if (!isnan(temperature) && !isnan(humidity)) {
            Serial.printf("🌡️ Temperature: %.2f°C, 💧 Humidity: %.2f%%\n", temperature, humidity);
            
            HTTPClient http;
            http.begin(serverUrl);
            http.addHeader("Content-Type", "application/json");

            String jsonPayload = "{\"temperature\": " + String(temperature) + ", \"humidity\": " + String(humidity) + "}";
            int httpResponseCode = http.POST(jsonPayload);
            Serial.printf("📡 Data sent successfully! HTTP Response Code: %d\n", httpResponseCode);

            http.end();
        } else {
            Serial.println("⚠️ Error reading from DHT22 sensor!");
        }
    }

    delay(60000);  // Send data once per minute
}
