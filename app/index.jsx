import React, { useState, useEffect } from 'react';
import { StatusBar, ImageBackground, View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useFonts } from 'expo-font'; // Add this import for useFonts

const SplashScreen = () => {
  const player = useVideoPlayer(require('../assets/splash.mp4'), player => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <VideoView 
        style={{ width: '100%', height: '100%' }}
        player={player}
        resizeMode="contain"
      />
    </View>
  );
};

const App = () => {
  const [fontsLoaded] = useFonts({
    'Audiowide-Regular': require('../assets/fonts/Audiowide-Regular.ttf'),
    'Montserrat-Variable': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Monserrat-Italic': require('../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf'),
    'OpenSans-Variable': require('../assets/fonts/OpenSans-VariableFont_wdth,wght.ttf'),
    'OpenSans-Italic': require('../assets/fonts/OpenSans-Italic-VariableFont_wdth,wght.ttf'),
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
        <ImageBackground
          source={require('../assets/welcome.jpg')}
          style={styles.background}
        >
          <View style={styles.container2}>
            <StatusBar style="auto" />
            <Text style={{top:75, fontSize:18, fontStyle:"italic", fontWeight:"400"}}>Think Act Save</Text>
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
    paddingBottom:100 
  },
  background: {
    flex: 1,
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
    fontWeight:'600',
    textAlign: 'center',
    fontFamily: 'Montserrat-Variable',
  },
});

export default App;