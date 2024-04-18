import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native'; // Import StyleSheet
import { Link } from 'expo-router';
import { Video } from 'expo-av';
import LottieView from 'lottie-react-native';

const SplashScreen = () => (
  <View style={styles.container}>
    <StatusBar style="auto" />
    <Video
      source={require('../assets/splash.mp4')}
      style={{ width: '100%', height: '100%' }}
      resizeMode="contain"
      isLooping
      shouldPlay
    />
  </View>
);

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <View style={styles.container2}>
          <StatusBar style="auto" />
          <LottieView
            source={require('../assets/Animation - 1713405309153.json')}
            speed={0.5}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
          <View style={styles.buttonsContainer}>
            <Link href="/sign-in" style={styles.button}>Sign In</Link>
            <Link href="/sign-up" style={styles.button}>Sign Up</Link>
          </View>
        </View>
      )}
    </>
  );
}

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    paddingTop:80,
  },
  button: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 5,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
