# Dockerfile
# Use the official Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install
RUN npm install express chart.js

# Copy the entire application code into the container
COPY . .

# Copy public files
COPY public /app/public

# Set environment variables, such as MongoDB connection
ENV MONGO_URI=mongodb://mongo:27017/esp32data

# Server port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]