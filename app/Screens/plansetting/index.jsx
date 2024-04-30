import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, addDoc,updateDoc,doc } from 'firebase/firestore';
import { firestore } from '../../../firebaseConfig';

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

  return (
    <SafeAreaView style={styles.container}>
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
    marginTop: 30

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
  },
});

export default Plansetting;
