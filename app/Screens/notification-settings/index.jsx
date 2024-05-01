import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const Index = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const toggleNotification = () => {
    setNotificationEnabled((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notification Settings</Text>
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
});

export default Index;
