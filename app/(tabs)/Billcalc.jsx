import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { collection, addDoc, Timestamp,getDocs } from 'firebase/firestore';
import { app, database, firestore } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';




const FormPage = () => {
  const [unitsConsumed, setUnitsConsumed] = useState('');
  const [isOneMonth, setIsOneMonth] = useState(false);
  const [isTwoMonth, setIsTwoMonth] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [kwh,setkwh] =useState() 
  const [consumed,setconsumed] =useState(false) // State to store the response data

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

    
    const frequency = isOneMonth ? 1 : isTwoMonth ? 2 : 0;
    const data = `tariff_id=1&purpose_id=15&frequency=${frequency}&WNL=${unitsConsumed}&phase=1&load=`;

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://bills.kseb.in/postTariff.php',
      headers: {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://bills.kseb.in',
        'Referer': 'https://bills.kseb.in/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-GPC': '1',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'sec-ch-ua': '"Brave";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"'
      },
      data: data
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setResponseData(response.data); // Store the response data in state
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlekwh =()=>{
    setUnitsConsumed(kwh)
    setconsumed(!consumed)
  }

  useEffect(() => {
    
    const userDataRef = ref(database, '/UsersData/HLNSA5eBI5W5Qjew01pEla3kjjw2');
    const unsubscribe = onValue(userDataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setkwh(data.KWH)
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
          editable={!consumed}
          
        />
       
       
      </View> 
      <View>
      <TouchableOpacity className="mb-10" style={[styles.checkbox, consumed && styles.checkedCheckbox, { borderColor: '#ADD8E6' }]}
      onPress={handlekwh}><Text style={[styles.checkboxText,
        consumed && styles.checkedCheckboxText,]}>Use Current Consumed Units</Text>
      </TouchableOpacity>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      
      
{responseData && (
  <View style={styles.cardContainer}>
    <Text style={styles.cardTitle}>Price Details</Text>
    {Object.entries(responseData.result_data.tariff_values).map(([key, value]) => {
      // Skip rendering if the key is "bill_total"
      if (key === "bill_total") {
        return null;
      }
      return (
        <View key={key} style={styles.priceDetailContainer}>
          <Text style={styles.priceLabel}>{value.descr}</Text>
          <Text style={styles.priceValue}>{value.value}</Text>
        </View>
      );
    })}
    <View style={[styles.priceDetailContainer, styles.totalContainer]}>
      <Text style={styles.priceLabel}>Total Amount:Rs</Text>
      <Text style={styles.totalValue}>{responseData.result_data.tariff_values.bill_total.value}</Text>
    </View>
  </View>
)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FDFE',
    alignItems: 'center',
    paddingHorizontal: 20, // Added horizontal padding
  },
  label: {
    fontSize: 25,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%', // Changed width to 100%
    // Added horizontal padding
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '400',
    marginRight: 10,
    paddingLeft: 10, // Reduced padding
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1, // Added border
    borderColor: '#ccc', // Added border color
    borderRadius: 8, // Added border radius
    paddingHorizontal: 10,
    
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Changed to space-between
    width: '100%', // Set width to 100%
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
  buttonContainer: {
    width: '100%', // Changed width to 100%
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    width: '100%', // Changed width to 100%
    backgroundColor: '#F0F0F0',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  cardText: {
    fontSize: 16,
  },
  priceDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FormPage;