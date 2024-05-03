import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { firestore } from '../../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';

const Plans = () => {
  const [selectedMinute, setSelectedMinute] = useState(50);
  const [price, setPrice] = useState(0);

  const calculatePrice = (minute) => {
    const priceMap = {
      50: 218.00,
      100: 393.00,
      150: 650.00,
      200: 857.00,
      250: 1315.00,
      300: 1605.00,
      350: 2067.00,
      400: 2459.00,
      450: 2939.00,
      500: 3400.00,
      550: 4291.00,
      600: 4652.00,
      650: 5671.00,
      700: 6080.00,
      750: 6827.00,
      800: 7254.00,
      850: 8022.00,
      900: 8466.00,
      950: 8910.00,
      1000: 9354.00
    };
    return priceMap[minute] || 0;
  };

  const handleIncrement = () => {
    setSelectedMinute((prevMinute) => prevMinute === 950 ? 1000 : (prevMinute + 50) % 1000);
  };
  
  const handleDecrement = () => {
    setSelectedMinute((prevMinute) => prevMinute === 0 ? 1000 : (prevMinute - 50 + 1000) % 1000);
  };  

  const handleSetPrice = () => {
    // setPrice(selectedMinute * 0.1); 
    let dataToUpdate = doc(firestore,'limit','tyv0cGkSgFqqylJzHMyc');
    updateDoc(dataToUpdate,{
        limit: selectedMinute
    })
    .then(() => {
        alert('Data Updated')           
    })
    .catch((err) => {
        alert(err.message)
    });
  };

  const handleResetPrice = () => {
    setPrice(0); 
  };

  useEffect(() => {
    const calculatedPrice = calculatePrice(selectedMinute);
    setPrice(calculatedPrice);
  }, [selectedMinute]);

  return (
    <ImageBackground
    source={require('../../assets/backk.jpg')}
    style={styles.backgroundImage}
  >
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Select Units</Text>
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={handleIncrement}>
          <Image
        style={styles.stretch}
        source={require('../../assets/up.png')}
      />
          </TouchableOpacity>
          <View style={styles.selectedItemContainer}>
            <Text style={styles.selectedMinuteText}>{selectedMinute}</Text>
          </View>
          <TouchableOpacity onPress={handleDecrement}>
          <Image
        style={styles.stretch}
        source={require('../../assets/down.png')}
      />
          </TouchableOpacity>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>Price: <Image style={styles.stretchh} source={require('../../assets/rupee.png')}/>{price.toFixed(2)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSetPrice} style={styles.button}>
            <Text style={styles.buttonText}>Set Plan</Text>
          </TouchableOpacity>
          
        </View>
        <LinearGradient
          colors={['#F0F8FF', '#ADD8E6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.instructionsCard, { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 2, elevation: 5 }]}
        >
          <View>
            <Text style={styles.cardTitle}>Instructions:</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletText}>1. Here you can set plans by choosing the units under which you intend to reduce consumption.</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletText}>2. Select the appropriate units by checking the corresponding price it produces.</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text  style={styles.bulletText}>3. You can add the email address to which the alerts should be sent in the settings tab.</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletText}>4. Alerts will be sent as notifications as well as through the email address.</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bulletText}>5. Alerts are sent based on your usage according to the limit that you have set.</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingTop: 30,
    marginBottom: 20,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedItemContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  selectedMinuteText: {
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Variable',
  },
  // triangleText: {
  //   fontWeight: 'bold',
  // },
  // triangleUp: {
  //   fontSize: 36,
  // },
 stretch: {
      width: 60,
      height: 60
 },
 stretchh: {
  width: 30,
  height: 30,
 },
  triangleDown: {
    fontSize: 36,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'OpenSans-Variable',
  },
  priceContainer: {
    marginTop: 20,
  },
  priceText: {
    fontSize: 20,
   
    fontFamily: 'OpenSans-Variable',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
   

    fontFamily: 'OpenSans-Variable',
    color:"lightgrey"

  },
  instructionsCard: {
    borderRadius: 10,
    padding: 20,
    marginTop: 50,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    color:"grey",
    fontFamily: 'OpenSans-Variable',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Plans;
