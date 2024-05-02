import React, { useState, useEffect } from 'react';
import { StatusBar, ImageBackground } from 'react-native'; // Import ImageBackground
import { View, Text, StyleSheet, Image } from 'react-native'; // Import StyleSheet and Image
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
        <ImageBackground // Use ImageBackground for the page background
          source={require('../assets/Welcome.jpg')} // Provide the image source
          style={styles.background}
          
        >
          <View style={styles.container2}>
            <StatusBar style="auto" />

            <View style={styles.buttonsContainer}>
              <Link className='' href="/sign-in" style={styles.button}>Login</Link>
              <Link href="/sign-up" style={styles.button}>Sign Up</Link>
            </View>
          </View>
        </ImageBackground>
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
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    paddingBottom:100 // Make the background transparent to show the ImageBackground
  },
  background: {
    flex: 1,// Cover the entire screen
    justifyContent: 'center',
  },
  buttonsContainer: {
    gap:20,
    flexDirection: 'row',
    marginTop: 40,
    paddingTop: 80,
  },
  button: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;