import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-red">
      <Text className="text-3xl">Open up App.js to start working on your app!</Text>
      <StatusBar />
      <Link href="/Home">Go to home</Link>
    </View>
  );
}

