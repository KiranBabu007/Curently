import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, addDoc,updateDoc,doc } from 'firebase/firestore';
import { firestore } from '../../../firebaseConfig';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ImageBackground } from 'react-native';

const Plansetting = () => {
  const [email, setEmail] = useState('');
  const collectionRef = collection(firestore, 'emails');
  const id="ayjgC7jL1JQ2sqcEvqWt"
  const handleAddEmail = async () => {
    let dataToUpdate = doc(firestore,'emails',id)
      updateDoc(dataToUpdate,{
          email: email
      })
      .then(() => {
          alert('Data Updated')           
      })
      .catch((err) => {
          alert(err.message)
      })

  };

  const handleBackButton = () => {
    // Add your function here, for example:
    router.replace('Settings')
  };

  return (
    <ImageBackground
    source={require('../../../assets/backk.jpg')}
    style={styles.backgroundImage}
  >
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
      <Icon name="arrow-back" size={24} color="#2196F3" />
      </TouchableOpacity>
      <Text style={styles.title}>Add Email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={setEmail}
          value={email}
        />
        <TouchableOpacity onPress={handleAddEmail} style={styles.addButton}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.instructionsCard}>
        <View style={styles.bulletPoint}>
          <Text className="text-center" style={styles.bulletText}>Add the email to which the alerts should be sent.</Text>
        </View>
      </View>
    </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    
    marginBottom: 40,
    marginTop: 30,
    fontFamily: 'OpenSans-Variable',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  addButton: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    
    fontFamily: 'OpenSans-Variable',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    marginTop: 20
  },
  instructionsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginTop: 50,
    elevation: 5, // Add elevation for shadow effect
    shadowColor: 'blue', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    fontSize: 18,
    
    marginBottom: 10,
    fontFamily: 'OpenSans-Variable',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bulletText: {
    marginLeft: 10,
    fontSize: 16,
    
    fontFamily: 'OpenSans-Variable',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Plansetting;
