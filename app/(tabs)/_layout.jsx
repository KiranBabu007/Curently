import { View, Text, TouchableHighlightComponent } from 'react-native'
import React from 'react'
import { Redirect, Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="Home"/>
      </Tabs>
    </>
  )
}

export default TabsLayout