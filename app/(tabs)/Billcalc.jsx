import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ActivityIndicator, Image, ImageBackground } from 'react-native';
import axios from 'axios';

import { app, database, firestore } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { LinearGradient } from 'expo-linear-gradient';



const FormPage = () => {
  const [unitsConsumed, setUnitsConsumed] = useState('');
  const [isOneMonth, setIsOneMonth] = useState(false);
  const [isTwoMonth, setIsTwoMonth] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [kwh, setkwh] = useState();
  const [consumed, setconsumed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidSelection, setIsValidSelection] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleOneMonthPress = () => {
    setIsOneMonth(true);
    setIsTwoMonth(false);
    setIsValidSelection(true);
    setShowError(false);
  };

  const handleTwoMonthPress = () => {
    setIsTwoMonth(true);
    setIsOneMonth(false);
    setIsValidSelection(true);
    setShowError(false);
  };

  const handleSubmit = () => {
    if (!isValidSelection) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setIsLoading(true);
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
        setResponseData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handlekwh = () => {
    setUnitsConsumed(kwh);
    setconsumed(!consumed);
  };

  useEffect(() => {
    const userDataRef = ref(database, '/UsersData/HLNSA5eBI5W5Qjew01pEla3kjjw2');
    const unsubscribe = onValue(userDataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setkwh(data.KWH);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/backk.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Bill Calculator</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Consumed Units</Text>
          <TextInput
            style={styles.input}
            value={unitsConsumed.toString()}
            onChangeText={setUnitsConsumed}
            keyboardType="numeric"
            editable={!consumed}
          />
        </View> 
        <View>
          <TouchableOpacity 
            className="mb-6" 
            style={[styles.checkbox, consumed && styles.checkedCheckbox, { borderColor: '#ADD8E6' }]}
            onPress={handlekwh}
          >
            <Text style={[styles.checkboxText, consumed && styles.checkedCheckboxText]}>
              Use Current Consumed Units
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, isOneMonth && styles.checkedCheckbox, { borderColor: '#ADD8E6' }]}
            onPress={handleOneMonthPress}
          >
            <Text style={[styles.checkboxText, isOneMonth && styles.checkedCheckboxText]}>One Month</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkbox, isTwoMonth && styles.checkedCheckbox, { borderColor: '#ADD8E6' }]}
            onPress={handleTwoMonthPress}
          >
            <Text style={[styles.checkboxText, isTwoMonth && styles.checkedCheckboxText]}>Two Month</Text>
          </TouchableOpacity>
        </View>

        {showError && (
          <Text style={styles.errorText}>Please select either One Month or Two Month</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, !isValidSelection && styles.disabledButton]} 
            onPress={handleSubmit}
            disabled={!isValidSelection}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {!isLoading && !responseData && (
  <View className="m-10">
    <Image
      source={require('../../assets/bill.jng')}
      style={styles.defaultImage}
      resizeMode="contain"
    />
    <Text className="mt-5 text-2md font-light">Enter Details and press Submit to get the bill.</Text>
  </View>
)}

{isLoading && (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#6A5ACD" />
  </View>
)}

{!isLoading && responseData && (
  <LinearGradient
    colors={['#F0F8FF', '#ADD8E6']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={[styles.cardContainer, { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 2, elevation: 5 }]}
  >
    <Text style={[styles.cardTitle, { color: '#080e2c' }]}>Price Details</Text>
    <View style={styles.itemHeaderContainer}>
      <Text style={[styles.itemHeader]}>Item</Text>
      <Text style={[styles.priceHeader]}>Price</Text>
    </View>
    {Object.entries(responseData.result_data.tariff_values).map(([key, value]) => {
      if (key === "bill_total") {
        return null;
      }
      return (
        <View key={key} style={styles.priceDetailContainer}>
          <Text className="text-slate-600" style={[styles.priceLabel, { fontFamily:"OpenSans-Variable" }]}>{value.descr}</Text>
          <Text className="text-slate-600" style={[styles.priceValue, { fontFamily:"OpenSans-Variable"}]}>{value.value}</Text>
        </View>
      );
    })}
    <View style={[styles.priceDetailContainer, styles.totalContainer]}>
      <Image  
        style={{width: 50, height: 50}}
        source={require('../../assets/coin.jpg')}
        resizeMode="cover"
      />
      <Text className="font-extrabold text-xl mt-2 right-8 text-slate-600" style={[styles.priceLabel, { fontFamily:'OpenSans-Variable' }]}>Total Amount</Text>
      <Text className="font-semibold mt-2 text-slate-600" style={[styles.totalValue, { fontFamily:'OpenSans-Variable' }]}>{`Rs ${responseData.result_data.tariff_values.bill_total.value}`}</Text>
    </View>
  </LinearGradient>
)}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: 'center',
    paddingHorizontal: 20, // Added horizontal padding
  },
  label: {
    fontSize: 25,
    marginBottom: 5,
    fontFamily: 'OpenSans-Variable',
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
    
    marginRight: 10,
    paddingLeft: 10,
    fontFamily: 'OpenSans-Variable', // Reduced padding
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1, // Added border
    borderColor: '#ccc', // Added border color
    borderRadius: 8, // Added border radius
    paddingHorizontal: 10,
    
  },
  defaultImage:{
    
    height:300,
    width:300,
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
    fontFamily: 'OpenSans-Variable',
    
  },
  checkedCheckbox: {
    backgroundColor: '#0f0ade',
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
    backgroundColor: '#0f0ade',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    
    fontFamily: 'OpenSans-Variable',
  },
  cardContainer: {
    width: '100%', 
    backgroundColor: '#F0F0F0',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  cardText: {
    fontSize: 16,
    fontFamily: 'OpenSans-Variable',
  },
  priceDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    fontFamily: 'OpenSans-Variable',
  },
  cardTitle: {
    fontSize: 20,
   
    marginBottom: 10,
    fontFamily: 'OpenSans-Variable',
  },
  totalContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  totalValue: {
    fontSize: 18,
    
    fontFamily: 'OpenSans-Variable',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Variable',
  },
  priceHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Variable',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'OpenSans-Variable',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default FormPage;