// import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BookingProvider } from "./screens/BookingContext";
import {
  BookingListScreen,
  BookingScreen,
  EditBookingScreen,
  RiderInfoScreen,
} from "./screens";

// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function App() {
  //   const [fontsLoaded] = useFonts({
  //     black: require("./assets/fonts/Roboto-Black.ttf"),
  //     bold: require("./assets/fonts/Roboto-Bold.ttf"),
  //     light: require("./assets/fonts/Roboto-Light.ttf"),
  //     medium: require("./assets/fonts/Roboto-Medium.ttf"),
  //     regular: require("./assets/fonts/Roboto-Regular.ttf"),
  //     thin: require("./assets/fonts/Roboto-Thin.ttf"),
  //     semiBold: require("./assets/fonts/RobotoCondensed-Bold.ttf"),
  //     semiBoldLight: require("./assets/fonts/RobotoCondensed-Light.ttf"),
  //     semiBoldRegular: require("./assets/fonts/RobotoCondensed-Regular.ttf"),
  //   });

  //   const onLayoutRootView = useCallback(async () => {
  //     if (fontsLoaded) {
  //       await SplashScreen.hideAsync();
  //     }
  //   }, [fontsLoaded]);

  //   if (!fontsLoaded) {
  //     return null;
  //   }

  return (
    <NavigationContainer>
      <BookingProvider>
        <Stack.Navigator initialRouteName="Booking">
          <Stack.Screen
            name="Booking"
            component={BookingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Edit Booking" 
            component={EditBookingScreen} />
          <Stack.Screen
            name="RiderInfoScreen"
            component={RiderInfoScreen}
            options={{ title: "Rider Details", headerShown: false }}
          />
          <Stack.Screen
            name="BookingList"
            component={BookingListScreen}
            options={{ title: "Booking List", headerShown: false }}
          />
        </Stack.Navigator>
      </BookingProvider>
    </NavigationContainer>
  );
}
