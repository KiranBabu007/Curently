import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore, auth } from '../../../firebaseConfig';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ImageBackground } from 'react-native';

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userData, setUserData] = useState(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const userEmail = currentUser.email;
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
    router.replace('/Settings');
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.text}>{item.value}</Text>
    </View>
  );

  // Dynamically set userData values or use 'Loading...'
  const userDataItems = [
    { label: 'Name', value: userData ? (userData.name || 'Not provided') : 'Loading...' },
    { label: 'Email', value: userData ? (userData.email || 'Not provided') : 'Loading...' },
    { label: 'Phone Number', value: userData ? (userData.phoneNumber || 'Not provided') : 'Loading...' },
  ];

  return (
    <ImageBackground
      source={require('../../../assets/backk.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Account Details</Text>
        <TouchableOpacity style={styles.backButton} onPress={handleBackButtonClick}>
          <Icon name="arrow-back" size={24} color="#2196F3" />
        </TouchableOpacity>
        <FlatList
          data={userDataItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    bottom: 300,
    fontFamily: 'OpenSans-Variable',
  },
  listContainer: {
    marginBottom: 20,
    marginRight: 100,
    marginTop: 20,
    width: 400
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginRight: 5,
    fontFamily: 'OpenSans-Variable',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontFamily: 'OpenSans-Variable',
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
    fontSize: 16,
    fontFamily: 'OpenSans-Variable',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    marginTop: 20,
    left: 10,
    padding: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Index;
