import React, { useState, useEffect } from 'react';
import { StatusBar, ImageBackground } from 'react-native'; // Import ImageBackground
import { View, Text, StyleSheet, Image } from 'react-native'; // Import StyleSheet and Image
import { Link } from 'expo-router';
import { Video } from 'expo-av';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';


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
  const [fontsLoaded] = useFonts({
    'Audiowide-Regular': require('../assets/fonts/Audiowide-Regular.ttf'),
    'Montserrat-Variable': require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
    'Montserrat-Italic': require('../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf'),
    'OpenSans-Variable': require('../assets/fonts/OpenSans-VariableFont_wdth,wght.ttf'),
    'OpenSans-Italic': require('../assets/fonts/OpenSans-Italic-VariableFont_wdth,wght.ttf')
  });
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
        <View // Use ImageBackground for the page background
          // Provide the image source
          style={styles.background} // Apply background image style
        >
          <View style={styles.container2}>
            <StatusBar style="auto" />

            <View className="mt-20">
              <Text className="text-5xl font-bold mb-5 ">Curently</Text>
              <Text className= " font-light text-xl">     Think Act Save</Text>
            </View>
            
            
            <View style={styles.buttonsContainer}>
              <Link href="/sign-in" style={styles.button}>Sign In</Link>
              <Link href="/sign-up" style={styles.button}>Sign Up</Link>
            </View>
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
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    paddingBottom:70 // Make the background transparent to show the ImageBackground
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Cover the entire screen
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