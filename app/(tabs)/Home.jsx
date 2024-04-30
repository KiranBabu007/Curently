import React, { useEffect, useState,useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView,Platform } from 'react-native';
import { collection, addDoc, Timestamp,getDocs } from 'firebase/firestore';
import { app, database, firestore } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { multiFactor } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import emailjs from '@emailjs/react-native';

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
  const [previousValue, setPreviousValue] = useState('');
  const dbInstance1 = collection(firestore,"emails");

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [rooms, setRooms] = useState([
    { id: 1, name: 'Living Room', consumption: 120 },
    { id: 2, name: 'Kitchen', consumption: 80 },
    { id: 3, name: 'Bedroom 1', consumption: 60 },
    { id: 4, name: 'Bedroom 2', consumption: 50 },
    { id: 5, name: 'Bathroom', consumption: 30 },
  ]);


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
        if (previousValue !== '' && (data.current - previousValue) > 4) {
          schedulePushNotification("Sudden increase in current detected");
          getemail(1)
        }
        setPreviousValue(data.current); // Update previous value
      }
    });
    return () => {
      unsubscribe();
    };
  },  [previousValue]);

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

  // Define an object to track notification status
let notificationStatus = {};

const getlimit = async (data) => {
  const datas = await getDocs(dbInstance);
  const newArray = datas.docs.map((item) => {
    return {...item.data(), id: item.id}
  });
  setArray(newArray);
  const limit = newArray[0].limit;
  const percentage = (data.KWH / limit) * 100;

  // Function to schedule push notification only if it hasn't been scheduled before for this percentage
  const schedulePushNotificationOnce = (percentageThreshold) => {
    if (!notificationStatus[percentageThreshold]) {
      schedulePushNotification(`You have exceeded ${percentageThreshold}% of the limit`);
      notificationStatus[percentageThreshold] = true;
      getemail(percentageThreshold);
    }
  };

  if (percentage > 100) {
    schedulePushNotificationOnce(100);
    notificationStatus = {};
  }
  else if (percentage > 90) {
    schedulePushNotificationOnce(90);
  }
  else if (percentage > 80) {
    schedulePushNotificationOnce(80);
  }
  else if (percentage > 70) {
    schedulePushNotificationOnce(70);
  }
  else if (percentage > 60) {
    schedulePushNotificationOnce(60);
  }
  else if (percentage > 50) {
    schedulePushNotificationOnce(50);
  }
  else if (percentage > 40) {
    schedulePushNotificationOnce(40);
  }
  else if (percentage > 30) {
    schedulePushNotificationOnce(30);
  }
  else if (percentage > 20) {
    schedulePushNotificationOnce(20);
  }
  else if (percentage > 10) {
    schedulePushNotificationOnce(10);
  }
};

const getemail = async (data) => {
  const datas = await getDocs(dbInstance1);
  const newArray = datas.docs.map((item) => {
    return {...item.data(), id: item.id}
  });
  const emails = newArray.map(item => item.email);
console.log(emails);

}


// const templateParams = {
//   from_name: 'Curently',
//   message:"Veed Kathi",
//   mail:"indrajithmundackal@gmail.com"
// };

// emailjs
//   .send('service_2msy9m8', 'template_samev4z', templateParams, {
//     publicKey: '47jKhhhAvV9jqiifo',
//     privateKey: 'qGhJ6GFchx14VAfpMb6GV'
//   })
//   .then(
//     (response) => {
//       console.log('SUCCESS!', response.status, response.text);

//     },
//     (err) => {
//       console.log('FAILED...', err);
//     },
//   );

  
  

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
      <View style={styles.roomsContainer}>
     <Text style={styles.roomsHeading}>Rooms</Text>
     <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
       {/* Map rooms data to render room cards */}
       {rooms.map((room, index) => (
         <View key={index} style={styles.roomCard}>
           <View style={styles.roomIcon}>
             {/* Replace with appropriate room icon */}
             <Icon name="home" size={24} color="#333" />
           </View>
           <Text style={styles.roomName}>{room.name}</Text>
           <Text style={styles.roomConsumption}>{room.consumption} W</Text>
         </View>
       ))}
     </ScrollView>
   </View>
    </ScrollView>
  );
};

async function schedulePushNotification(body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Alert!!!!!",
      body: body,
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
  roomsContainer: {
    marginVertical: 16,
    marginHorizontal:16,
  },
  roomsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  roomCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: 150, // Adjust the width as needed
  },
  roomIcon: {
    alignItems: 'center',
    marginBottom: 8,
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  roomConsumption: {
    fontSize: 14,
    color: '#666',
  },
});

export default Home;