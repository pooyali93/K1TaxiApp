import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useBookingContext } from './BookingContext';

const EditBookingScreen = ({ route, navigation }) => {
  const { bookingId } = route.params;
  const { bookings, setBookings, handleBookingUpdate } = useBookingContext();

  // Find the booking by its ID directly from the bookings array
  const booking = bookings.find((booking) => booking.id === bookingId);

  const [bookingDate, setBookingDate] = useState(new Date(booking.date));
  const [bookingTime, setBookingTime] = useState(new Date());
  const [pickUpAddress, setPickUpAddress] = useState(booking.pickUpAddress);
  const [dropOffAddress, setDropOffAddress] = useState(booking.dropOffAddress);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);


  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setShowDatePicker(false);
      setBookingDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setShowTimePicker(false);
      setBookingTime(selectedTime);
    }
  };

  const handleSave = () => {
    console.log("edit booking: ", booking)
    const editedBooking = {
      ...booking,
      date: bookingDate.toDateString(),
      time: bookingTime.toLocaleTimeString(),
      pickUpAddress,
      dropOffAddress,
    };

    handleBookingUpdate(editedBooking);
    navigation.goBack();
  };

 


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pick a Date</Text>
      <DateTimePicker
        value={bookingDate}
        minimumDate={new Date()}
        mode="date"
        display="default"
        onChange={handleDateChange}
      />
      <Text style={styles.bookingDate}>Booking Date: {bookingDate.toDateString()}</Text>

      <Text style={styles.heading}>Choose Booking Time</Text>
      <DateTimePicker
        value={bookingTime}
        mode="time"
        display="default"
        onChange={handleTimeChange}
        minuteInterval={5}
        style={{backgroundColor:'red'}}
      />
      <Text style={styles.bookingDate}>Pick-up Time: {bookingTime.toLocaleTimeString()}</Text>

      <Text style={styles.heading}>Pick-up Address</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPickUpAddress}
        value={pickUpAddress}
        placeholder="Enter pick-up address"
      />

      <Text style={styles.heading}>Drop-off Address</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDropOffAddress}
        value={dropOffAddress}
        placeholder="Enter drop-off address"
      />

      {/* Save button */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bookingDate: {
    fontSize: 16,
    fontWeight: "bold",
    borderWidth:1,
    padding:20,
    marginVertical:5,
    width:'100%'
  },
  input: {
    height: 40,
    width: "100%",
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default EditBookingScreen;
