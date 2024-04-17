import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const MyCalendar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => {
            console.log('selected day', day);
            // You can add your logic here for handling the selected day
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'Top',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendarContainer: {
    borderWidth: 1, // Adjust the border width to your preference
    borderColor: 'blue',
    borderRadius: 10,
    padding: 4,
  },
});

export default MyCalendar;
