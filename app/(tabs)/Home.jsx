import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import {app, database , firestore } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';

const Home = () => {
  const [currentValue, setCurrentValue] = useState('');
    const collectionRef = collection(firestore, 'values')

    useEffect(() => {
        const userDataRef = ref(database, '/UsersData/HLNSA5eBI5W5Qjew01pEla3kjjw2');

        const unsubscribe = onValue(userDataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setCurrentValue(data.current); 
                addDataToFirestore(data);  
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const addDataToFirestore = async (data) => {
        try {
            const currentDate = new Date(); // Get current date and time
        const month = currentDate.getMonth() + 1; // Get month (0-indexed, hence the +1)
        const day = currentDate.getDate(); // Get day of the month
        const formattedDate = `${month} ${day}`;
            const docRef = await addDoc(collectionRef, {
                current: data.current,
                energy: data.KWH, // Assuming energy data is retrieved from Realtime Database
                power: data.power,
                date: formattedDate,
                Unitpersec: data.Unitpersec
                // Assuming power data is retrieved from Realtime Database
            });
            console.log('Document written with ID: ', docRef.id);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <View style={styles.container}>
           
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/home.png')} // Provide the path to your image
                    style={styles.image}
                    resizeMode="contain" 
                />
            </View>

            <Text style={styles.text}>Current Consumption:</Text>
            <Text style={styles.currenttext}>{currentValue} A</Text>
            
        </View>
    );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
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
});


export default Home