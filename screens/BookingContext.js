import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const bookingsData = await AsyncStorage.getItem('bookings');
      //console.log('Loaded bookings data:', bookingsData);
      if (bookingsData !== null) {
        const parsedBookings = JSON.parse(bookingsData);
       // console.log('Parsed bookings:', parsedBookings);
        setBookings(parsedBookings);
      }
    } catch (error) {
      console.error('Error loading bookings: ', error);
    }
  };
  

  const saveBookings = async () => {
    try {
      await AsyncStorage.setItem('bookings', JSON.stringify(bookings));
    } catch (error) {
      console.error('Error saving bookings: ', error);
    }
  };

  const handleBookingUpdate = (editedBookings) => {
    setBookings(editedBookings);
    saveBookings(); // Save the updated bookings
  };

  return (
    <BookingContext.Provider value={{ bookings, setBookings, handleBookingUpdate }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingContext() {
  return useContext(BookingContext);
}
