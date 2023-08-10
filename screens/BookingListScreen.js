import { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import PageContainer from "../components/PageContainer";
import EditBooking from "./EditBookingScreen";
import { useBookingContext } from "./BookingContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


const BookingListScreen = ({ navigation }) => {
  const { bookings, setBookings, handleBookingUpdate } = useBookingContext();
  const [isEditingModalVisible, setIsEditingModalVisible] = useState(false);

  //cconsole.log("list", `${JSON.stringify(bookings)}`)

  const handleDeleteBooking = (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
    //saveBookings(updatedBookings);
  };

  const handleEditBooking = (id) => {
    navigation.navigate("Edit Booking", {
      bookingId: id,
    });
  };

  const sortByUpcomingDates = (a, b) => new Date(a.date) - new Date(b.date);

  const renderBookingItem = ({ item }) => {
    const swipeRightActions = () => (
      <View style={styles.deleteButton}>
        <TouchableOpacity onPress={() => handleDeleteBooking(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );

    const swipeLeftActions = () => (
      <View style={styles.editButton}>
        <TouchableOpacity onPress={() => handleEditBooking(item.id)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <Swipeable
        renderRightActions={swipeRightActions}
        renderLeftActions={swipeLeftActions}
      >
        <View style={styles.bookingItemContainer}>
        <Text style={styles.bookingItemText}>
            Name: {item.riderInfo.userName}
          </Text>
          <Text style={styles.bookingItemText}>
            Phone: {item.riderInfo.userPhone}
          </Text>
          <Text style={styles.bookingItemText}>Date: {item.date}</Text>
          <Text style={styles.bookingItemText}>Time: {item.time}</Text>
          <Text style={styles.bookingItemText}>
            Pick-up Address: {item.pickUpAddress}
          </Text>
          <Text style={styles.bookingItemText}>
            Drop-off Address: {item.dropOffAddress}
          </Text>
        </View>
      </Swipeable>
    );
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#EEF2F3'}}>
      <PageContainer>
        <View style={styles.container}>
        {isEditingModalVisible && (
          <EditBooking
            booking={handleEditBooking}
            onSave={handleBooking}
            onClose={() => setIsEditingModalVisible(false)}
          />
        )}

        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.flatList}
        />
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 8,
   // backgroundColor: "#FEFEFE",
  },

  header:{
    position:'relative',
    backgroundColor:'#EEF2F3'

  },
  flatList: {
    marginTop: 20,
    width: "100%",
  },
  bookingItemContainer: {
    marginVertical: 6,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 2,
  },
  bookingItemText: {
    fontSize: 14,
    marginBottom: 5,
  },
  bookingItemContainer: {
    marginVertical: 6,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginVertical: 6,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    height: "90%",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  editButton: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginVertical: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    height: "90%",
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookingListScreen;
