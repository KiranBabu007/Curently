import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from '../../../firebaseConfig';
import { router } from 'expo-router';

const Index = () => {
  
  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.replace('/')
    }).catch((error) => {
      // An error happened.
    });
  };

  const handleCancel = () => {
    // Your cancel logic here
    // For demonstration purposes, let's just show an alert
    router.replace('/Settings')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you sure you want to sign out?</Text>
      <View style={styles.buttonContainer}>
        <Button title="Sign Out" onPress={handleSignOut} color="#FF5733" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={handleCancel} color="#5BC0EB" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
    fontFamily: 'Montserrat-Variable',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 5,
  },
});

export default Index;
