import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { firestore } from '../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const MyCalendar = () => {
  const dbInstance = collection(firestore, 'values');
  const [selectedDate, setSelectedDate] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

  const getData = async () => {
    try {
      if (!selectedDate) {
        console.warn('Please select a date on the calendar.');
        return;
      }

      const q = query(dbInstance, where('date', '==', selectedDate));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('No matching documents.');
        setFetchedData(null);
        return;
      }

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFetchedData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
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
          markedDates={{
            [selectedDate]: {selected: true, selectedDotColor: 'orange'}
          }}
        />
      </View>
      
      {fetchedData && (
  <View style={styles.dataContainer}>
    <Text>Data Retrieved for {selectedDate}:</Text>
    <Text>Max Energy Retrieved: {Math.max(...fetchedData.map(item => item.energy))}</Text>
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
    height:80,
    justifyContent: 'space-around',
    backgroundColor:'white',
    borderWidth: 1,
   
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
});

export default MyCalendar;
