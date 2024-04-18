import React from 'react';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Link href="/Home">Go to home</Link> */}
      <TouchableOpacity style={styles.button}>
        <Link href="/sign-in">
          <Text style={styles.buttonText}>Go to SignIn</Text>
        </Link>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Link href="/sign-up">
          <Text style={styles.buttonText}>Go to SignUp</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
