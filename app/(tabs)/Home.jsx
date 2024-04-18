import React, { useEffect, useState,useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView,Platform } from 'react-native';
import { collection, addDoc, Timestamp,getDocs } from 'firebase/firestore';
import { app, database, firestore } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import emailjs from '@emailjs/browser';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { multiFactor } from 'firebase/auth';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});



const Home = () => {
  const [currentValue, setCurrentValue] = useState('');
  const [powerValue, setpowerValue] = useState('');
  const [setPower,power]=useState('');
  const collectionRef = collection(firestore, 'values');
  const dbInstance = collection(firestore,"limit");
  const [array,setArray] = useState([]);
  const form = useRef(null);
  const [multiplier,setMultiplier] = useState(10);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  useEffect(() => {
    
    const userDataRef = ref(database, '/UsersData/HLNSA5eBI5W5Qjew01pEla3kjjw2');
    const unsubscribe = onValue(userDataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCurrentValue(data.current);
        setpowerValue(data.power);
        addDataToFirestore(data);
        getlimit(data);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const addDataToFirestore = async (data) => {
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];
      const docRef = await addDoc(collectionRef, {
        current: data.current,
        energy: data.KWH,
        power: data.power,
        date: formattedDate,
        Unitpersec: data.Unitpersec,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const getlimit = async (data) => {
    const datas = await getDocs(dbInstance);
    const newArray = datas.docs.map((item) => {
        return {...item.data(), id: item.id}
    });
    setArray(newArray);
    console.log(newArray[0].limit);
    if(data.KWH > (multiplier/100)*newArray[0].limit) {
      schedulePushNotification(multiplier);
      setMultiplier(multiplier+10);
      console.log(multiplier)
    }
}


  
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/home.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Current Consumption :</Text>
        <Text style={styles.currenttext}>{currentValue} A</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>Power Consumption:</Text>
            <View style={styles.outputBox}>
              <Text style={styles.outputText}>{powerValue} W</Text>
            </View>
          </View>
        </View>
      </View>
    
    </ScrollView>
  );
};

async function schedulePushNotification(multiplier) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Alert!!!!!",
      body: `You have crossed ${multiplier}% of the limit`,
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}


async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'aaa3626b-f36a-45a9-95d9-c1d2029e7e5b' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fcff',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
  },
  currenttext: {
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    height: 200,
  },
  image: {
    flex: 1,
    width: '100%',
    height: 'auto',
  },
  infoContainer: {
    marginVertical: 20,
  },
  cardContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  outputBox: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
  },
  outputText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;