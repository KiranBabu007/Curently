Curently
Our project utilizes IoT technology to monitor electricity consumption. 
It features a sensor module that captures real-time data from outlets, wirelessly transmitting it to a server for analysis. 
A user-friendly mobile app provides insights on current usage, historical data, and trends, with alerts for anomalies and personalized energy-saving tips.

Team Name : TVA
Team members : 
Anit Thomas
Indrajith S Nair
Kiran Babu
Sidharth Manikuttan

Link to product walkthrough
link to video:https://drive.google.com/file/d/15xyNWzUTD7b-647VmbKJS0iH2k0Z_z5U/view?usp=sharing

How it Works ?

The project operates by first using a Current transformer SCT 013 to measure the current flowing through an electrical wire. 
This transformer provides an output signal proportional to the current intensity. The signal is then processed by an ESP32 
microcontroller, programmed using the Arduino IDE. The ESP32 digitizes and analyzes the signal, performing necessary calculations 
and adjustments. Once processed, the current data is sent to Firebase, a real-time database service, via Wi-Fi connection. Firebase 
stores the data, making it accessible from anywhere over the internet. A mobile application, developed with React Native and Expo, 
interacts with Firebase to retrieve and display the current energy consumption data. Users can monitor their energy usage in real-time, 
enabling them to track patterns, set alerts, and optimize consumption. This integrated system provides an efficient solution for 
real-time energy monitoring, facilitating informed decision-making and resource optimization.

Libraries used
Emonlib - 1.1.0 #In arduino IDE for accessing data from CT
Firebase_ESP_Client library for arduino 
React Native - 0.73.6 #Javascript Library

How to configure
1.Install Node.js
2.Connect the hardware to Firebase
3.Connect app to firebase
4.Start the project


How to Run
1.Clone repository and Type npm install in command line after navigating into repo
2.Type npx expo start
3.Open Your Project in Expo Go App by scanning the qrcode or connecting a usb and turning on usb debugging mode.
