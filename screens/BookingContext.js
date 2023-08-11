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
      if (bookingsData !== null) {
        const parsedBookings = JSON.parse(bookingsData);
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

  const updateBooking = (updatedBooking) => {
    // Find the index of the booking with the same ID as the updatedBooking
    const bookingIndex = bookings.findIndex((booking) => booking.id === updatedBooking.id);

    if (bookingIndex !== -1) {
      // Replace the booking at the found index with the updated booking
      const updatedBookings = [...bookings];
      updatedBookings[bookingIndex] = updatedBooking;

      // Update the bookings state
      setBookings(updatedBookings);
      saveBookings(); // Save the updated bookings
    }
  };

  return (
    <BookingContext.Provider value={{ bookings, setBookings, updateBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingContext() {
  return useContext(BookingContext);
}
