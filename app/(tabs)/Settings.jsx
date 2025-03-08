import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity,Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const SettingsScreen = () => {
  const settingsData = [
    { icon: 'person', label: 'Account', href: '/account' },
    { icon: 'notifications', label: 'Notification settings', href: '/notification-settings' },
    { icon: 'leaf', label: 'Plan Setting', href: '/plansetting' },
    { icon: 'help-circle', label: 'Help and support', href: '/help' },
    { icon: 'log-out', label: 'Sign out', href: '/sign-out' },
  ];

  return (
    <ImageBackground
      source={require('../../assets/backk.jpg')}
      style={styles.backgroundImage}
    >
    <View style={styles.container}>
      {settingsData.map((item, index) => (
        <TouchableOpacity onPress={()=>{  router.replace(`/Screens${item.href}`)}} key={index} style={styles.settingItem}>
            <View style={styles.settingItemContent}>
              <Ionicons name={item.icon} size={24} color="#333" />
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </View>
         
        </TouchableOpacity>
      ))}
      <Image 
      className="ml-14 mt-8"
        source={require('../../assets/settings.jpg')}
        style={{ width: 250, height: 300 }}
      />
    </View></ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
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
    fontFamily: 'OpenSans-Variable',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default SettingsScreen;