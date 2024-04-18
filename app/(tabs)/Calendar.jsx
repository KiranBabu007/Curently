import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { firestore } from '../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const MyCalendar = () => {
  const dbInstance = collection(firestore, 'values');
  const [selectedDate, setSelectedDate] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  // Add a state for loading

  

  const getData = async () => {
    setIsLoading(true); // Set loading state to true before fetching data
    try {
      if (!selectedDate) {
        console.warn('Please select a date on the calendar.');
        setIsLoading(false); // Set loading state to false if no date is selected
        return;
      }

      const q = query(dbInstance, where('date', '==', selectedDate));
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
      setIsLoading(false); // Set loading state to false after fetching data
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => {
            console.log('selected day', day.dateString);
            const selectedDateCT = new Date(day.dateString);
            selectedDateCT.setHours(selectedDateCT.getHours() + 10); // Adjust for 10 hours back
            setSelectedDate(selectedDateCT.toISOString().substring(0, 10)); // Set the adjusted date
            getData();
          }}
          markedDates={{ [selectedDate]: { selected: true, selectedDotColor: 'orange' } }}
        />
      </View>
      {isLoading ? ( // Show loading indicator when isLoading is true
        <ActivityIndicator className="mt-40" size="large" color="#0000ff" />
      ) : fetchedData ? (
        <View className="mt-40" style={styles.dataContainer}>
          <Text>Data Retrieved for {selectedDate}:</Text>
          <Text>Max Energy Retrieved: {Math.max(...fetchedData.map((item) => item.energy))}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin:10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendarContainer: {
    
    borderRadius: 1,
    padding: 2,
    width: '90%',
    gap:20,
    marginBottom: 20,
    
  },
  dataContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 16,
    color: '#666',
  },
  
  dataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dataIcon: {
    marginRight: 8,
  },
  dataText: {
    fontSize: 16,
    color: '#333',
  },
  dataValueText: {
    fontWeight: 'bold',
  },
});

export default MyCalendar;
