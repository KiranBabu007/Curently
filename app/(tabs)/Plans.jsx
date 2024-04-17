import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Plans = () => {
  const [selectedMinute, setSelectedMinute] = useState(50);
  const [price, setPrice] = useState(0); // State for the price

  const handleIncrement = () => {
    setSelectedMinute((prevMinute) => (prevMinute + 50) % 1000);
  };

  const handleDecrement = () => {
    setSelectedMinute((prevMinute) => (prevMinute - 50 + 1000) % 1000);
  };

  const handleSetPrice = () => {
    // Set the price based on the selected minute, for example, multiplying it by some factor
    setPrice(selectedMinute * 0.1); // For example, price is 10% of selected minute
  };

  const handleResetPrice = () => {
    setPrice(0); // Reset the price to 0
  };

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
          <Text style={styles.priceText}>Price: ${price.toFixed(2)}</Text>
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
    borderColor: 'blue',
    borderWidth: 2,
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
