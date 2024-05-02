import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { firestore } from '../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

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

      {isLoading ? (
        <ActivityIndicator size="large" color="#00adf5" style={styles.activityIndicator} />
      ) : (
        <View style={styles.dataContainer}>
          {fetchedData ? (
            <LinearGradient
            colors={['#e6f7ff', '#ffffff']} 
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.dataCardContainer}
            >
              <Text className="font-bold text-2sm " style={styles.dataCardTitle}>Energy Consumption Data</Text>
               <Text className="font-bold text-2sm" style={styles.dataCardSubtitle}>for {selectedDate}</Text>
              <View className="flex flex-row m-5 space-x-2" style={styles.maxEnergyContainer}>
                <FontAwesome5 name="bolt" size={28} color="gold" />
                <Text  className="font-extrabold text-xl " style={styles.maxEnergyText}>
                  {Math.max(...fetchedData.map((item) => item.energy))} KwH
                </Text>
              </View>
             
            </LinearGradient>
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>Click on any date to show the energy consumption data.</Text>
            </View>
          )}
        </View>
      )}
    </View>
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
    width:300,
  },
  dataCardContainer: {
    padding:16,
    borderRadius: 8,
    alignItems: 'center',
    margin:0,
  },
  dataCardTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  noDataCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noDataContainer: {
    padding: 10
  },
});

export default MyCalendar;