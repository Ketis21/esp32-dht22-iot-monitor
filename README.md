# 🌡️ ESP32 Temperature & Humidity Monitoring System

This project demonstrates how to build a simple IoT system for monitoring temperature and humidity using an ESP32 microcontroller, a DHT22 sensor, and a Node.js backend with MongoDB for data storage. The collected data can be visualized through a web interface.

---

## 🚀 **Features**

- 📡 **Real-time Data Collection:** ESP32 reads temperature and humidity from the DHT22 sensor.
- 🌐 **Wi-Fi Connectivity:** ESP32 sends the data to a Node.js server via HTTP POST requests.
- 🗄️ **Data Storage:** MongoDB stores all readings with timestamps.
- 📊 **Web Dashboard:** A simple frontend visualizes historical data using Chart.js.
- 🔄 **Daily Filtering:** View data by specific date, with automatic timezone adjustments.

---

## 🛠️ **Technologies Used**

### **Hardware:**
- ESP32 microcontroller
- DHT22 (AM2302) temperature and humidity sensor

### **Software:**
- ESP32 Arduino IDE (C++)
- Node.js and Express.js (Backend API)
- MongoDB (Database)
- Docker (Deployment)
- Chart.js (Data visualization)

---

## 📸 **System Architecture**

```mermaid
flowchart LR
ESP32 --> HTTP POST --> Node.js API --> MongoDB
ESP32 --> Status --> Serial Monitor
Web Interface <-- GET API --> Node.js
```

---

## ⚙️ **Setup Instructions**

### **1. Hardware Setup:**
- Connect the DHT22 sensor to the ESP32:
  - **VCC** → 3.3V
  - **GND** → GND
  - **DATA** → GPIO 4 (or any GPIO of your choice)

### **2. ESP32 Firmware:**
1. Install **Arduino IDE** and ESP32 board support.
2. Install the following Arduino libraries:
   - `DHT sensor library` by Adafruit
   - `Adafruit Unified Sensor`
3. Upload the firmware to ESP32 (example code in `esp32_firmware` folder).

### **3. Server Setup:**
1. Clone this repository:
```bash
git clone https://github.com/yourusername/esp32-dht22-iot-monitor.git
cd esp32-dht22-iot-monitor
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file for MongoDB connection:
```ini
MONGO_URI=mongodb://localhost:27017/temperatureDB
PORT=3000
```
4. Start the server:
```bash
npm start
```

### **4. Docker Deployment (Optional):**
If you are using OpenMediaVault or any server with Docker:
```bash
docker-compose up -d
```

### **5. Access the Web Dashboard:**
Visit: `http://localhost:3000` (or your server's IP address)

---

## 📊 **API Endpoints**

### **1. Send Data from ESP32:**
```http
POST /api/data
Content-Type: application/json

{
  "temperature": 22.5,
  "humidity": 60
}
```

### **2. Get Data by Date:**
```http
GET /api/data/2024-06-01
```

---

## 🌟 **Screenshots**

![Web Dashboard](https://via.placeholder.com/800x400?text=Web+Dashboard+Example)

---

## 🔒 **Security Considerations**

1. **Environment Variables:** Ensure the `.env` file is excluded from version control.
2. **Authentication:** Add user authentication if exposing the system to the internet.
3. **Firewall:** Close unused ports and use HTTPS for secure connections.

---

## 📜 **License**

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

🚀 *Happy coding and stay cool! 🌡️*

