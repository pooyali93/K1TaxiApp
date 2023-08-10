import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {TouchableWithoutFeedback, Keyboard, } from "react-native";
import PageContainer from "../components/PageContainer";
import { useBookingContext } from "./BookingContext";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { COLORS, images } from "../constants";

const BookingScreen = ({ navigation }) => {
  const [bookingDate, setBookingDate] = useState(new Date());
  const [bookingTime, setBookingTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickUpAddress, setPickUpAddress] = useState("London");
  const [dropOffAddress, setDropOffAddress] = useState("Paris");
  const [pickUpAddressError, setPickUpAddressError] = useState(null);
  const [dropOffAddressError, setDropOffAddressError] = useState(null);
  const [bookings, setBookings] = useState([]);


  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  // Function to round minutes to the nearest multiple of 5
  const roundMinutesToNearest5 = (date) => {
    const minutes = date.getMinutes();
    const roundedMinutes = Math.ceil(minutes / 5) * 5;
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      roundedMinutes
    );
  };

  const isDateInFuture = (selectedDate) => {
    const currentDate = new Date();
    return selectedDate >= currentDate;
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate && isDateInFuture(selectedDate)) {
      setBookingDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setBookingTime(roundMinutesToNearest5(selectedTime)); 
    }
  };


  const handleNext = () => {
    const pickUpAddressError = !pickUpAddress
      ? "Please provide a pick-up address."
      : null;
    const dropOffAddressError = !dropOffAddress
      ? "Please provide a drop-off address."
      : null;
    
    setPickUpAddressError(pickUpAddressError);
    setDropOffAddressError(dropOffAddressError);
    
    if (pickUpAddressError || dropOffAddressError) {
      return;
    }

    // Create a new booking object
    const newBooking = {
      id: uuidv4(), // You can generate a unique ID using a timestamp or other method
      pickUpAddress,
      dropOffAddress,
      date: bookingDate.toDateString(),
      time: roundMinutesToNearest5(bookingTime).toLocaleTimeString(),
      riderInfo: {}, // Placeholder for rider information, to be filled later
    };

    // Update the bookings list using the setBookings function
    setBookings([...bookings, newBooking]);

    // Navigate to the RiderInfo screen
    navigation.navigate('RiderInfoScreen', { booking: newBooking });
  };

  // const handleBooking = () => {
  //   const pickUpAddressError = !pickUpAddress
  //     ? "Please provide a pick-up address."
  //     : null;
  //   const dropOffAddressError = !dropOffAddress
  //     ? "Please provide a drop-off address."
  //     : null;
    
  //   setPickUpAddressError(pickUpAddressError);
  //   setDropOffAddressError(dropOffAddressError);
    
  //   if (pickUpAddressError || dropOffAddressError) {
  //     return;
  //   }
    
  //   const newBooking = {
  //     id: uuidv4(),
  //     date: bookingDate.toDateString(),
  //     time: roundMinutesToNearest5(bookingTime).toLocaleTimeString(),
  //     pickUpAddress,
  //     dropOffAddress,
  //   };
    
  //   setBookings(prevBookings => [...prevBookings, newBooking]); // Update bookings array

  //   setBookingDate(new Date());
  //   setBookingTime(new Date());
  //   setPickUpAddress("London");
  //   setDropOffAddress("Paris");
    
  //   navigation.navigate("RiderInfoScreen", {
  //     booking: newBooking, // Pass the newBooking to RiderInfoScreen
  //   });
    
    
  // };
  


  return (
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
    <PageContainer>
      <View>
        <Image
          source={images.headerbg}
          style={{
            width: "100%",
          }}
        />

        <Text style={styles.hero}>Hello.</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>FROM</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPickUpAddress}
            value={pickUpAddress}
            placeholder="Enter pick-up address"
          />
          {pickUpAddressError && (
            <Text style={styles.error}>{pickUpAddressError}</Text>
          )}
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>TO</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDropOffAddress}
            value={dropOffAddress}
            placeholder="Enter drop-off address"
          />
          {dropOffAddressError && (
            <Text style={styles.error}>{dropOffAddressError}</Text>
          )}
        </View>

        <View style={styles.dateTimeWrapper}>
          <View style={styles.dateContainer}>
            <Text style={styles.heading}>Date</Text>
            <DateTimePicker
              value={bookingDate}
              minimumDate={new Date()}
              mode="date"
              display="default"
              
              onChange={handleDateChange}
              style={{
                flex:1,
              }}
            />
            {/* <Text style={styles.bookingDate}>
           {bookingDate.toDateString()}
        </Text> */}
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.heading}>Time</Text>
            <DateTimePicker
              value={roundMinutesToNearest5(bookingTime)}
              mode="time"
              display="default"
              onChange={handleTimeChange}
              minuteInterval={5}
              style={{
                flex:1,
              }}
            />
          </View>
        </View>
        {/* <Text style={styles.bookingDate}>
          Selected Time:{" "}
          {roundMinutesToNearest5(bookingTime).toLocaleTimeString()}
        </Text> */}
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleNext(bookings)} >
            <Text style={styles.text}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PageContainer>
    </TouchableWithoutFeedback>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.lightWhite,
  },
  hero: {
    position: "absolute",
    left: 20,
    bottom: 50,
    fontSize: 52,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9FA7AA",
  },
  inputWrapper: {
    width: "100%",
    height: 120,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#e3e4e5",
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: COLORS.white,
  },

  dateTimeWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

  },

  dateContainer: {
    justifyContent:'center',
    alignItems:'flex-start',
    width: "49%",
    height: 120,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#e3e4e5",
    borderRadius: 5,
    marginVertical: 5,
  },

  input: {
    height: "100%",
    width: "100%",
    //marginTop: 10,
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },
  btnContainer: {
    flex: 1,
    alignItems: "center",
    marginVertical:10
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "black",
  },
  clearButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "red",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },


  error: {
    position:'absolute',
    left:20,
    bottom:5,
    color: "red",
    textAlign: "center",
  },
});

export default BookingScreen;
