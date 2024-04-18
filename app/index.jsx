
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native'; // Remove 'Video' import
import { Link } from 'expo-router';
import { Video } from 'expo-av'; // Keep 'Video' import from 'expo-av'

// Splash screen component with a video
const SplashScreen = () => (
  <View className="flex-1 items-center justify-center bg-black">
    <StatusBar style="auto" />
    <Video
      source={require('../assets/splash.mp4')} // Replace with the path to your video
      style={{ width: '100%', height: '100%' }}
      resizeMode="contain"
      isLooping
      shouldPlay
    />
  </View>
);


export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false); // Hide splash screen after 2 seconds
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <View className="flex-1 items-center justify-center">
          <StatusBar style="auto" />
          <Link href="/Home">Go to home</Link>
          <Link href="/sign-in">Go to SignIn</Link>
          <Link href="/sign-up">Go to SignUp</Link>
        </View>
      )}
    </>
  );
}

