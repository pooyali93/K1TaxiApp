import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import PageContainer from "../components/PageContainer";
import { useBookingContext } from "./BookingContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Input from "../components/Input";
import { COLORS } from "../constants";

const EditBookingScreen = ({ route, navigation }) => {
  const { bookings, updateBooking } = useBookingContext();
  const { bookingId } = route.params;
  const booking = bookings.find((item) => item.id === bookingId);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickUpAddress, setPickUpAddress] = useState(booking.pickUpAddress);
  const [dropOffAddress, setDropOffAddress] = useState(booking.dropOffAddress);
  const [bookingDate, setBookingDate] = useState(new Date(booking.date));
  const [bookingTime, setBookingTime] = useState(
    getInitialBookingTime(booking.time)
  );
  const [pickUpAddressError, setPickUpAddressError] = useState(null);
  const [dropOffAddressError, setDropOffAddressError] = useState(null);
  const [userName, setUserName] = useState("Pooya");
  const [userPhone, setUserPhone] = useState("12");
  const [userNameError, setUserNameError] = useState(null);
  const [userPhoneError, setUserPhoneError] = useState(null);

  //const [datePickerVisible, setDatePickerVisible] = useState(datePickerVisible);



  // Helper function to round minutes to the nearest multiple of 5
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

  function getInitialBookingTime(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const initialTime = new Date();
    initialTime.setHours(hours, minutes, 0, 0);
    return initialTime;
  }

  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      setBookingDate(selectedDate);
    }
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  const handleTimeChange = (selectedTime) => {
    if (selectedTime) {
      setBookingTime(roundMinutesToNearest5(selectedTime));
      
    }
    hideTimePicker();
  };

  const hideTimePicker = () => {
    setShowTimePicker(false);
  };

  const handleUpdateBooking = () => {
    const updatedBooking = {
      id: booking.id,
      pickUpAddress,
      dropOffAddress,
      date: bookingDate.toDateString(),
      time: bookingTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      riderInfo: {
        userName: booking.riderInfo.userName,
        userPhone: booking.riderInfo.userPhone,
      },
    };

    updateBooking(updatedBooking);
    navigation.navigate("BookingList");
  };

  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <PageContainer>
        <View style={styles.container}>
          <Input
            label="From"
            value={pickUpAddress}
            onChangeText={setPickUpAddress}
            error={pickUpAddressError}
          />

          <Input
            label="To"
            value={dropOffAddress}
            onChangeText={setDropOffAddress}
            error={dropOffAddressError}
          />

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

          <View style={styles.dateTimeWrapper}>
            <View style={styles.dateContainer}>
              <Text style={styles.heading}>Date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text
                  style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}
                >
                  {bookingDate.toLocaleDateString()}
                </Text>
                <DateTimePickerModal
                  value={bookingDate}
                  mode="date"
                  isVisible={showDatePicker}
                  onConfirm={handleDateChange}
                  onCancel={hideDatePicker}
                  style={{
                    flex: 1,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.dateContainer}>
              <Text style={styles.heading}>Time</Text>
              <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <Text
                  style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}
                >
                  {bookingTime.toLocaleTimeString()}
                </Text>

                <DateTimePickerModal
                  value={roundMinutesToNearest5(bookingTime)}
                  mode="time"
                  isVisible={showTimePicker}
                  onConfirm={handleTimeChange}
                  onCancel={hideTimePicker}
                  minuteInterval={5}
                  style={{
                    flex: 1,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleUpdateBooking}
            >
              <Text style={styles.text}>Save Changes</Text>
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
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9FA7AA",
  },
  input: {
    width: "100%",
    marginTop: 10,
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },
  dateTimeWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  dateContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "49%",
    height: 120,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#e3e4e5",
    borderRadius: 5,
    marginVertical: 5,
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

export default EditBookingScreen;
