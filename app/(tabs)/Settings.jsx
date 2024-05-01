import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { router } from 'expo-router';

const SettingsScreen = () => {
  const settingsData = [
    { icon: 'person', label: 'Account', href: '/account' },
    { icon: 'card', label: 'My subscription', href: '/subscription' },
    { icon: 'settings', label: 'General settings', href: '/general-settings' },
    { icon: 'lock-closed', label: 'Privacy settings', href: '/privacy-settings' },
    { icon: 'notifications', label: 'Notification settings', href: '/notification-settings' },
    { icon: 'moon', label: 'Appearance settings', href: '/appearance-settings' },
    { icon: 'build', label: 'Advanced settings', href: '/advanced-settings' },
    { icon: 'help-circle', label: 'Help and support', href: '/help-and-support' },
    { icon: 'log-out', label: 'Sign out', href: '/Screens/sign-out' },
  ];

  return (
    <View style={styles.container}>
      {settingsData.map((item, index) => (
        <TouchableOpacity onPress={()=>{  router.replace(item.href)}} key={index} style={styles.settingItem}>
          <Link className='bg-red-300' href={item.href} asChild>
            <View  style={styles.settingItemContent}>
              <Ionicons name={item.icon} size={24} color="#333" />
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="#888" />
            </View>
          </Link>
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