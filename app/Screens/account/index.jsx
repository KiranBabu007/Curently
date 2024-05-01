import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../firebaseConfig';
import { router } from 'expo-router';
const Index = () => {
  const [userData, setUserData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const userEmail = currentUser.email;
      // Get user data from Firestore using email as document ID
      const userDocRef = doc(collection(firestore, 'users'), userEmail);
      getDoc(userDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            setUserData(userData);
          } else {
            console.log('User document does not exist');
          }
        })
        .catch((error) => {
          console.error('Error getting user document:', error);
        });
    }
  }, [currentUser]);

  const handleAddPhoneNumber = async () => {
    if (!phoneNumber) return;
    try {
      const userEmail = currentUser.email;
      const userDocRef = doc(collection(firestore, 'users'), userEmail);
      await updateDoc(userDocRef, {
        phoneNumber: phoneNumber,
      });
      setPhoneNumber('');
      // Refresh user data
      const updatedDoc = await getDoc(userDocRef);
      if (updatedDoc.exists()) {
        const updatedUserData = updatedDoc.data();
        setUserData(updatedUserData);
      }
    } catch (error) {
      console.error('Error updating user document:', error);
    }
  };

  const handleBackButtonClick = () => {
    router.replace('/Settings')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Details</Text>
      <TouchableOpacity style={styles.backButton} onPress={handleBackButtonClick}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name: </Text>
        <Text style={styles.text}>{userData ? userData.name : 'Loading...'}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email: </Text>
        <Text style={styles.text}>{userData ? userData.email : 'Loading...'}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Phone Number: </Text>
        <Text style={styles.text}>{userData ? userData.phoneNumber || 'Not provided' : 'Loading...'}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPhoneNumber}>
          <Text style={styles.addButtonText}>Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  text: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
    marginTop: 20
  },
});

export default Index;
