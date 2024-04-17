import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const FormPage = () => {
  const [unitsConsumed, setUnitsConsumed] = useState('');
  const [isOneMonth, setIsOneMonth] = useState(false);
  const [isTwoMonth, setIsTwoMonth] = useState(false);
  const [responseData, setResponseData] = useState(null); 

  const handleOneMonthPress = () => {
    setIsOneMonth(!isOneMonth);
    setIsTwoMonth(false);
  };

  const handleTwoMonthPress = () => {
    setIsTwoMonth(!isTwoMonth);
    setIsOneMonth(false);
  };

  const handleSubmit = () => {
    console.log("Units Consumed:", unitsConsumed);
    console.log("One Month:", isOneMonth);
    console.log("Two Month:", isTwoMonth);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bill Calculator</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Consumed Units</Text>
        <TextInput
          style={styles.input}
          value={unitsConsumed}
          onChangeText={setUnitsConsumed}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, isOneMonth && styles.checkedCheckbox, { borderColor: '#ADD8E6' }]}
          onPress={handleOneMonthPress}
        >
          <Text style={[
            styles.checkboxText,
            isOneMonth && styles.checkedCheckboxText,
          ]}>One Month</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.checkbox, isTwoMonth && styles.checkedCheckbox, { borderColor: '#ADD8E6' }]}
          onPress={handleTwoMonthPress}
        >
          <Text style={[
            styles.checkboxText,
            isTwoMonth && styles.checkedCheckboxText,
          ]}>Two Month</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FDFE',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  label: {
    fontSize: 25,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '400',
    marginRight: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 5,
  },
  checkedCheckbox: {
    backgroundColor: 'blue',
    padding: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  checkedCheckboxText: {
    color: 'lightblue',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FormPage;
