import React, { useEffect, useState,useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { collection, addDoc, Timestamp,getDocs } from 'firebase/firestore';
import { app, database, firestore } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import emailjs from '@emailjs/browser'

const Home = () => {
  const [currentValue, setCurrentValue] = useState('');
  const [setPower,power]=useState('');
  const collectionRef = collection(firestore, 'values');
  const dbInstance = collection(firestore,"limit");
  const [array,setArray] = useState([]);
  const form = useRef(null);
  
  useEffect(() => {
    
    const userDataRef = ref(database, '/UsersData/HLNSA5eBI5W5Qjew01pEla3kjjw2');
    const unsubscribe = onValue(userDataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCurrentValue(data.current);
        setPower(data.power);
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
        <Text style={styles.text}>Power Consumption :</Text>
        <Text style={styles.currenttext}>{currentValue} A</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>Power Consumption:</Text>
            <View style={styles.outputBox}>
              <Text style={styles.outputText}>{power} A</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Tab selector goes here */}
    </ScrollView>
  );
};

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