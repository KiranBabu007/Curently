import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Plans"
        options={{
          title: 'Plans',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bolt" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Billcalc"
        options={{
          title: 'Bill',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="calculator" color={color} />,
        }}
      />
    </Tabs>
  );
}