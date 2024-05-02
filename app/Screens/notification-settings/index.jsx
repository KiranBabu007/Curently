import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ImageBackground } from 'react-native';

const Index = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const toggleNotification = () => {
    setNotificationEnabled(prev => !prev);
  };

  const handleBackButtonClick = () => {
    // Execute your custom function logic here
   router.replace('Settings')
    // For example, you can close the notification settings modal
  };

  return (
    <ImageBackground
    source={require('../../../assets/backk.jpg')}
    style={styles.backgroundImage}
  >
    <View style={styles.container}>
      <Text style={styles.header}>Notification Settings</Text>
      <TouchableOpacity style={styles.backButton} onPress={handleBackButtonClick}>
      <Icon name="arrow-back" size={24} color="#2196F3" />
      </TouchableOpacity>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Notification</Text>
        <Switch value={notificationEnabled} onValueChange={toggleNotification} />
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'OpenSans-Variable',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginRight: 10,
    fontFamily: 'OpenSans-Variable',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
    marginTop: 20,
    fontFamily: 'OpenSans-Variable',
  },
   backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Index;