import React, { useState } from 'react'
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { app,auth } from '../../firebaseConfig';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';
const Signin = () => {
    // const auth = getAuth();
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      // If either email or password is empty, show an alert
      Alert.alert('Error', 'Please fill in both email and password fields.');
      return; // Don't proceed with login
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        console.log('Signed in')
        const user = userCredential.user;
        router.replace('/Home');
        // ...
      })
      .catch((error) => {
        // alert('Incorrect Credentials');
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      router.replace('/Home');
  };

  

  return (
    <SafeAreaView style={styles.container}>
         <LottieView
                source={require('../../assets/Animation - 1712257000816.json')}
                speed={0.5}
                autoPlay
                loop
                
    style={{ width:400, height: 400 }}
            />
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder='EMAIL'
            value={email}
            onChangeText={setEmail}
            autoCorrect={false}
            autoCapitalize='none'
            placeholderTextColor='rgba(0, 0, 0, 0.5)'
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder='PASSWORD'
              secureTextEntry={!showPassword} // Ternary operator to toggle secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCorrect={false}
              autoCapitalize='none'
              placeholderTextColor='rgba(0, 0, 0, 0.5)'
            />
            
          </View>
        </View>
        <View style={styles.buttonView}>
           <Pressable
            style={[styles.button, { backgroundColor: 'black' }]}
            onPress={handleLogin}
          >
            <Text style={[styles.buttonText, { color: 'white' }]} >LOGIN</Text>
          </Pressable>
        </View>
        
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 40
  },
  title: {
    fontSize: 30,
    
    fontFamily: 'OpenSans-Italic',
    textAlign: "center",
    paddingVertical: 40,
    color: "black"
  },
  inputView: {
    width: "100%",
    marginBottom: 20
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "skyblue",
    borderWidth: 1,
    borderRadius: 7,
    color: 'black',
    backgroundColor: 'white',
    fontFamily:'OpenSans-Italic',
    marginBottom: 15,
  },
  buttonView: {
    width: "100%",
  },
  button: {
    height: 45,
    shadowColor: "#000",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'black'
  },
  buttonText: {
    fontSize: 18,
    
    color: 'white',
    fontFamily: 'OpenSans-Variable',
  },
  footerText: {
    textAlign: "center",
    color: "black",
    marginTop: 10,
  },
  signup: {
    color: "grey",
    fontSize: 13,
    fontFamily: 'OpenSans-Variable',
  },
  animation: {
    width: 300,
    height: 300,
    marginBottom: 20,
  }
});

export default Signin