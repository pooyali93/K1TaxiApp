import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import PageContainer from "../components/PageContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from '../components/Input';
import { useBookingContext } from "./BookingContext";
import { COLORS, images } from "../constants";

const RiderInfoScreen = ({ route, navigation }) => {
  const { booking} = route.params;
  const { bookings , setBookings } = useBookingContext();
  const [userName, setUserName] = useState("Pooya");
  const [userPhone, setUserPhone] = useState('12');
  const [userNameError, setUserNameError] = useState(null);
  const [userPhoneError, setUserPhoneError] = useState(null);


  const handleBookingSubmit = () => {
    const userNameError = !userName ? "Please provide a name." : null;
    const userPhoneError = !userPhone ? "Please provide a phone number." : null;

    setUserNameError(userNameError);
    setUserPhoneError(userPhoneError);

    if (userNameError || userPhoneError) {
      return;
    }
    // Find the booking to update by its ID
    const newBooking = {
      ...booking,
      riderInfo: {
        ...booking.riderInfo, // Preserve existing rider info
        userName,
        userPhone,
      },
    };
  
    // Add the new booking to the bookings list
    setBookings(prevBookings => [...prevBookings, newBooking]);
  
    // Navigate to the BookingList screen
    navigation.navigate('BookingList');
  };
  // const handleBooking = () => {
  //   const userNameError = !userName ? "Please provide a name." : null;
  //   const userPhoneError = !userPhone ? "Please provide a phone number." : null;

  //   setUserNameError(userNameError);
  //   setUserPhoneError(userPhoneError);

  //   if (userNameError || userPhoneError) {
  //     return;
  //   }

  //    // Update the booking with user information
  // const updatedBooking = {
  //   ...booking, // Keep existing data
  //   userName,
  //   userPhone,
  // };

  // // Find the index of the booking to update in the bookings array
  // const bookingIndex = bookings.findIndex(b => b.id === booking.id);

  // // Create a new array with the updated booking
  // const updatedBookings = [...bookings];
  // updatedBookings[bookingIndex] = updatedBooking;

  // // Update the bookings state
  // setBookings(updatedBookings);

  //   navigation.navigate("BookingList", {
  //     bookings: updatedBookings,
  //   });
  // };
  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  const clearLocalStorage = async () => {
    try {
      await AsyncStorage.removeItem("bookings"); // Replace "bookings" with your storage key
      console.log("Local storage cleared.");
    } catch (error) {
      console.error("Error clearing local storage: ", error);
    }
  };
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

          <Text style={styles.hero}>{` ${userName.toLowerCase()}`}</Text>
        </View>

        <View style={styles.container}>
          <Input
            label="Name"
            value={userName}
            onChangeText={setUserName}
            error={userNameError}
          />

          <Input
            label="Phone number"
            value={userPhone}
            onChangeText={setUserPhone}
            keyboardType="numeric"
            error={userPhoneError}
          />

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleBookingSubmit}
            >
              <Text style={styles.text}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={clearLocalStorage}>
  <Text>Clear Local Storage</Text>
</TouchableOpacity>

          </View>
        </View>
      </PageContainer>
    </TouchableWithoutFeedback>
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
  input: {
    width: "100%",
    //marginTop: 10,
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },
  btnContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "black",
  },

  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  error: {
    position: "absolute",
    left: 20,
    bottom: 5,
    color: "red",
    textAlign: "center",
  },
});

export default RiderInfoScreen;
