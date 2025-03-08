import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (selectedDate) {
      getData();
    }
  }, [selectedDate]);

  const getData = async () => {
    setIsLoading(true);
    try {
      // Fetch data for the selected date
      const q = query(dbInstance, where('date', '==', selectedDate));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log('No matching documents for the selected date.');
        setFetchedData(null);
      } else {
        const selectedData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const maxEnergySelected = Math.max(...selectedData.map((item) => item.energy));
  
        // Fetch data for the previous date
        const previousDate = new Date(selectedDate);
        previousDate.setDate(previousDate.getDate() - 1);
        const previousDateUTC = previousDate.toISOString().substring(0, 10);
        const previousQ = query(dbInstance, where('date', '==', previousDateUTC));
        const previousQuerySnapshot = await getDocs(previousQ);
        let previousData = [];
        if (!previousQuerySnapshot.empty) {
          previousData = previousQuerySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        }
  
        // Calculate maximum energy for the previous date
        const maxEnergyPrevious = previousData.length > 0 ? Math.max(...previousData.map((item) => item.energy)) : -Infinity;
  
        const difference = maxEnergyPrevious === -Infinity ? maxEnergySelected : maxEnergySelected - maxEnergyPrevious;
  
        setFetchedData({
          selectedData,
          maxEnergySelected,
          maxEnergyPrevious,
          difference,
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // ... (rest of the code remains the same)
  
  
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
              setSelectedDate(day.dateString);
            }}
            markedDates={{
              [selectedDate]: { selected: true, selectedDotColor: 'orange' },
            }}
          />
        </View>

        {!selectedDate && (
          <View style={styles.noDataContainer}>
            <Text className="text-center m-8" style={styles.noDataText}>
              Click on any date to show the energy consumption data.
            </Text>
            <Image
              source={require('../../assets/calendar.jpg')}
              style={styles.placeholderImage}
            />
          </View>
        )}

        {isLoading ? (
          <ActivityIndicator size="large" color="#00adf5" style={styles.activityIndicator} />
        ) : (
          <View style={styles.dataContainer}>
            {fetchedData && (
              <View style={styles.dataCardContainer}>
                <Text className="font-bold text-2sm" style={styles.dataCardTitle}>
                  Energy Consumption Data
                </Text>
                <Text className="font-bold text-2sm" style={styles.dataCardSubtitle}>
                  for {selectedDate}
                </Text>
                <View>
                  <Image
                    source={require('../../assets/calendarbulb.jpg')}
                    style={styles.dataCardImage}
                  />
                </View>

                <View className="flex flex-row m-5 space-x-2" style={styles.maxEnergyContainer}>
                  <Text className="font-extrabold text-xl" style={styles.maxEnergyText}>
                    {fetchedData.difference} KwH
                  </Text>
                  <FontAwesome5 name="bolt" size={28} color="gold" />
                </View>
              </View>
            )}
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
    fontFamily: 'OpenSans-Variable',
  },
  dataCardSubtitle: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'OpenSans-Variable',
  },
  maxEnergyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  maxEnergyText: {
    fontSize: 24,
    
    color: '#333',
    marginLeft: 10,
    fontFamily: 'OpenSans-Variable',
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
    
    fontFamily: 'OpenSans-Variable',
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