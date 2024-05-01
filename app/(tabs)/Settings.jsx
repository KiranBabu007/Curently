import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const settingsData = [
    { icon: 'person-outline', label: 'Account' },
    { icon: 'card-outline', label: 'My subscription' },
    { icon: 'settings-outline', label: 'General settings' },
    { icon: 'lock-closed-outline', label: 'Privacy settings' },
    { icon: 'notifications-outline', label: 'Notification settings' },
    { icon: 'moon-outline', label: 'Appearance settings' },
    { icon: 'build-outline', label: 'Advanced settings' },
    { icon: 'help-circle-outline', label: 'Help and support' },
    { icon: 'log-out-outline', label: 'Sign out' },
  ];

  return (
    <View style={styles.container}>
      {settingsData.map((item, index) => (
        <TouchableOpacity key={index} style={styles.settingItem}>
          <Ionicons name={item.icon} size={24} color="#333" />
          <Text style={styles.settingLabel}>{item.label}</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#888" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
});

export default SettingsScreen;