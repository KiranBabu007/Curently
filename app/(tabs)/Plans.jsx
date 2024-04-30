import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { firestore } from '../../firebaseConfig';
import { doc,updateDoc } from 'firebase/firestore';
const Plans = () => {
  const id="tyv0cGkSgFqqylJzHMyc";
  const [selectedMinute, setSelectedMinute] = useState(50);
  const [price, setPrice] = useState(0); // State for the price

  // Function to calculate price based on selected minute
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
    return priceMap[minute] || 0; // Return the corresponding price, default to 0 if not found
  };

  const handleIncrement = () => {
    setSelectedMinute((prevMinute) => prevMinute === 950 ? 1000 : (prevMinute + 50) % 1000);
  };
  
  const handleDecrement = () => {
    setSelectedMinute((prevMinute) => prevMinute === 0 ? 1000 : (prevMinute - 50 + 1000) % 1000);
  };  

  const handleSetPrice = () => {

    // Set the price based on the selected minute, for example, multiplying it by some factor
    setPrice(selectedMinute * 0.1); // For example, price is 10% of selected minute

    
      let dataToUpdate = doc(firestore,'limit',id)
      updateDoc(dataToUpdate,{
          limit: selectedMinute
      })
      .then(() => {
          alert('Data Updated')           
      })
      .catch((err) => {
          alert(err.message)
      })
  

  };

  const handleResetPrice = () => {
    setPrice(0); // Reset the price to 0
  };

  useEffect(() => {
    // Calculate price based on the selected minute whenever it changes
    const calculatedPrice = calculatePrice(selectedMinute);
    setPrice(calculatedPrice);
  }, [selectedMinute]);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Select Units:</Text>
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={handleDecrement}>
            <Text style={[styles.triangleText, styles.triangleUp]}>▲</Text>
          </TouchableOpacity>
          <View style={styles.selectedItemContainer}>
            <Text style={styles.selectedMinuteText}>{selectedMinute}</Text>
          </View>
          <TouchableOpacity onPress={handleIncrement}>
            <Text style={[styles.triangleText, styles.triangleDown]}>▼</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>Price: ₹{price.toFixed(2)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSetPrice} style={styles.button}>
            <Text style={styles.buttonText}>Set</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleResetPrice} style={styles.button}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20, // Add side padding
    paddingTop: 30, // Add top padding
    marginBottom: 20, // Reduce bottom margin
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
  },
  triangleText: {
    fontWeight: 'bold',
  },
  triangleUp: {
    fontSize: 36, // Adjust size as needed
  },
  triangleDown: {
    fontSize: 36, // Adjust size as needed
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  priceContainer: {
    marginTop: 20,
  },
  priceText: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Plans;
