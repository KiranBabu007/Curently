import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 5,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
    marginTop: 20
  },
});

export default Index;