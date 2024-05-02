import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { firestore } from '../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FontAwesome5 } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';

const MyCalendar = () => {
  const dbInstance = collection(firestore, 'values');
  const [selectedDate, setSelectedDate] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      if (!selectedDate) {
        setIsLoading(false);
        return;
      }
      const selectedDateUTC = new Date(selectedDate).toISOString().substring(0, 10);
      const q = query(dbInstance, where('date', '==', selectedDateUTC));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log('No matching documents.');
        setFetchedData(null);
      } else {
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setFetchedData(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
    source={require('../../assets/backk.jpg')}
    style={styles.backgroundImage}
  >
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => {
            console.log('selected day', day.dateString);
            const selectedDateCT = new Date(day.dateString);
            selectedDateCT.setHours(selectedDateCT.getHours() + 10);
            setSelectedDate(selectedDateCT.toISOString().substring(0, 10));
            getData();
          }}
          markedDates={{
            [selectedDate]: { selected: true, selectedDotColor: 'orange' },
          }}
        />
      </View>

      {!selectedDate && <View  style={styles.noDataContainer}>
             
             <Text className="text-center m-8" style={styles.noDataText}>Click on any date to show the energy consumption data.</Text>
             <Image source={require('../../assets/calendar.png')} style={styles.placeholderImage} />
           </View>}

      {isLoading ? (
        <ActivityIndicator size="large" color="#00adf5" style={styles.activityIndicator} />
      ) : (
        <View style={styles.dataContainer}>
          {fetchedData && 
            <View style={styles.dataCardContainer}>
              <Text className="font-bold text-2sm" style={styles.dataCardTitle}>
                Energy Consumption Data
              </Text>
              <Text className="font-bold text-2sm" style={styles.dataCardSubtitle}>
                for {selectedDate}
              </Text>
              <View>
                <Image source={require('../../assets/calendarbulb.png')} style={styles.dataCardImage} />
              </View>
               
              <View className="flex flex-row m-5 space-x-2" style={styles.maxEnergyContainer}>
                
                <Text className="font-extrabold text-xl" style={styles.maxEnergyText}>
                  {Math.max(...fetchedData.map((item) => item.energy))} KwH  
                </Text>
                <FontAwesome5 name="bolt" size={28} color="gold" />
              </View>
             
            </View>
           }
        </View>
      )}
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
  },
  calendarContainer: {
    borderRadius: 1,
    padding: 2,
    width: '90%',
    gap: 20,
    marginBottom: 20,
  },
  activityIndicator: {
    marginTop: 20,
  },
  dataContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: 300,
  },
  dataCardContainer: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: 300,
  },
  dataCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat-Variable',
  },
  dataCardSubtitle: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Montserrat-Variable',
  },
  maxEnergyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  maxEnergyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
    fontFamily: 'Montserrat-Variable',
  },
  dataCardImage: {
    width: 200,
    height: 200,
    resizeMode:'contain',
    marginTop: 10,
  },
  noDataContainer: {
    flex: 1,
    marginTop:80,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    height:300
  },
  noDataText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Variable',
  },
  placeholderImage: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
    bottom:100,
    right: 10,
    
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default MyCalendar;