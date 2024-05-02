import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, addDoc,updateDoc,doc } from 'firebase/firestore';
import { firestore } from '../../../firebaseConfig';
import { router } from 'expo-router';

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
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
        <Text style={[styles.buttonText, { color: 'blue' }]}>Back</Text>
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
          <Text style={styles.bulletText}>Add the email to which the alerts should be sent.</Text>
        </View>
      </View>
    </SafeAreaView>
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
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 30,
    fontFamily: 'Montserrat-Variable',
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
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Variable',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    right: 20,
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
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Montserrat-Variable',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bulletText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Variable',
  },
});

export default Plansetting;
