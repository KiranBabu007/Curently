import { StatusBar } from 'expo-status-bar';
import { Image, Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center ">
        <View >
            <Image className="h-10" source={require('../assets/home.png')} resizeMode='contain' />
        </View>
      <StatusBar />
    </View>
  );
}

