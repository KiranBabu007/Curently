import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center ">
      <StatusBar />
      <Link href="/Home">Go to home</Link>
      <Link href="/sign-in">Go to SignIn</Link>
      <Link href="/sign-up">Go to SignUp</Link>
    </View>
  );
}

