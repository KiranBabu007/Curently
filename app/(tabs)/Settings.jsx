import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default Settings = () => {
  

  const goToPlanSettingsScreen = () => {
    router.replace('/Screens/plansetting')
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={goToPlanSettingsScreen} style={styles.cardButton}>
        <View style={styles.card}>
          <Text style={styles.cardText}>Alert Settings</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
  },
  cardButton: {
    width: '90%',
    height: '20%', // 1/4th of the phone's height
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
