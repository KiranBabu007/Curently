import React, { useEffect, useState,useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView,Platform } from 'react-native';
import { collection, addDoc, Timestamp,getDocs } from 'firebase/firestore';
import { app, database, firestore ,auth} from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { multiFactor } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import emailjs from '@emailjs/react-native';
let notificationStatus = {}; 
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
  const [kwh,setkwhvalue] = useState('')
  const collectionRef = collection(firestore, 'values');
  const dbInstance = collection(firestore,"limit");
  const [array,setArray] = useState([]);

 
  const [previousValue, setPreviousValue] = useState('');
  const dbInstance1 = collection(firestore,"emails");

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  

  const rooms=[ 
    { id: 1, name: 'Living Room', consumption: 120, image: require('../../assets/Living_Room.png') },
    { id: 2, name: 'Kitchen', consumption: 80, image: require('../../assets/Kitchen.png') },
    { id: 3, name: 'Dining Room', consumption: 60, image: require('../../assets/Dining_Room.png') },
    { id: 4, name: 'Bed Room', consumption: 40, image: require('../../assets/Bed_Room.jpg') },
    { id: 5, name: 'Bath Room', consumption: 40, image: require('../../assets/Bath_Room.jpg') },
  ]


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
        setkwhvalue(data.KWH)
        addDataToFirestore(data);
        getlimit(data);
        if (previousValue !== '' && (data.current - previousValue) > 3) {
          schedulePushNotification("Sudden increase in current detected");
          getemail(1);
          
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
const message = data === 1 ?
    "Sudden increase in current detected" :
    `You have exceeded ${data}% of the limit`;

const templateParams = {
  from_name: 'Curently',
  message:message,
  mail:emails[0]
  
};

emailjs
  .send('service_b10t7ds', 'template_ng26hw8', templateParams, {
    publicKey: 'GbpViC0snr4prf6Zz',
    
  })
  .then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
      
    },
    (err) => {
      console.log('FAILED...', err);
    },
  );

  

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
      <Text style={styles.text}>Current Consumption </Text>
      <Text style={styles.currenttext}>{currentValue} A</Text>
    </View>
    <View className=" flex" style={styles.cardContainer}>
      <View className="bg-slate-200"  style={styles.card}>
        <View   style={styles.cardContent}>
          <Text style={styles.cardText}>Power Consumption </Text>
          <View style={styles.outputBox}>
            <Text style={styles.outputText}>{powerValue} W</Text>
          </View>
        </View>
        
      </View>
      
    </View>

    <View className="flex" style={styles.cardContainer}>
      <View className="bg-slate-200"  style={styles.card}>
        <View   style={styles.cardContent}>
          <Text style={styles.cardText}>KWH </Text>
          <View style={styles.outputBox}>
            <Text style={styles.outputText}>{kwh} Units</Text>
          </View>
        </View>
        
      </View>
      
    </View>
    <View  style={styles.roomsContainer}>
<Text  style={styles.roomsHeading}>Rooms</Text>
<ScrollView className=" pt-5 pb-5 pl-2 " horizontal={true} showsHorizontalScrollIndicator={false}>
{rooms.map((room) => (
  <View key={room.id} className="w-"  style={styles.roomCard}>
    <View style={styles.roomImageContainer}>
      <Image source={room.image} style={styles.roomImage} />
    </View>
    <View className="bg-slate-200 flex h-20 " style={styles.roomInfo}>
      <Text style={styles.roomName}>{room.name}</Text>
      <Text style={styles.roomConsumption}>{room.consumption} W</Text>
    </View>
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
    fontFamily: 'Audiowide-Regular'
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
    marginVertical: 10,
  },
  card: {
 
    padding: 20,
    borderRadius: 10,
    width: '90%',
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height:20
  },
  cardText: {
    fontSize: 16,

  },
  outputBox: {
    padding: 1,
    borderRadius: 5,
  },
  outputText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomsContainer: {
    marginLeft:16,
    paddingVertical: 16,
  },
  roomsHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    
  },
  roomCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 12,
    width: 260,
    height: 200,
    overflow: 'hidden', 
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
    margin:3,
    fontStyle:'italic'
  },
  roomConsumption: {
    fontSize: 14,
    color: '#666',
    fontStyle:'italic'
  },
  roomImageContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden', // Clip the image to fit within the container
  },
  roomImage: {
    width: '100%',
    height: 135, // Adjust the height as needed
  },
  roomInfo: {
    alignItems: 'center',
    padding:6
     // Add padding to separate image and info
  },
});

export default Home;