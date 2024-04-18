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
link to video Add your ppt to your repository
Presentation : Curently.pptx

How it Works ?
Explaining the working of project Embed video of project demo
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
React Native - 0.73.6 #Javascript Library

How to configure
1.Install Node.js and npm
2.Install Expo CLI
3.Create a New React Native Project
4.Navigate to Project Directory
5.Start the Development Server
6.Open Your Project in Expo Go App
7.Set Up Firebase

How to Run
1:Start the Development Server
2.Open Your Project in Expo Go App
3.View Your Project
