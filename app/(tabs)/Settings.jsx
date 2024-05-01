import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { router } from 'expo-router';

const SettingsScreen = () => {
  const settingsData = [
    { icon: 'person', label: 'Account', href: '/account' },
    { icon: 'lock-closed', label: 'Privacy settings', href: '/privacy-settings' },
    { icon: 'notifications', label: 'Notification settings', href: '/notification-settings' },
    { icon: 'leaf', label: 'Plan Setting', href: '/plansetting' },
    { icon: 'help-circle', label: 'Help and support', href: '/help-and-support' },
    { icon: 'log-out', label: 'Sign out', href: '/sign-out' },
  ];

  return (
    <View style={styles.container}>
      {settingsData.map((item, index) => (
        <TouchableOpacity onPress={()=>{  router.replace(`/Screens${item.href}`)}} key={index} style={styles.settingItem}>
          
            <View  style={styles.settingItemContent}>
              <Ionicons name={item.icon} size={24} color="#333" />
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </View>
         
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
});

export default SettingsScreen;