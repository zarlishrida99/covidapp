import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
//Importing Screens
import Health from "./Screens/Health";
import searchCountry from "./Screens/searchCountry";
import Home from "./Screens/Home";
import Country from "./Screens/Country";
import Favorites from "./Screens/Favorites";

export default function App() {
  const Stack = createStackNavigator();

  const Drawer = createDrawerNavigator();

  const header_config = {
    title: null,
    headerStyle: { backgroundColor: "#121517" },
    headerTintColor: "#CFCFCF",
    headerTintSize: 25,
  };

  const DrawerStack = () => {
    return (
      <Drawer.Navigator
        openByDefault={false}
        drawerContentOptions={{
          style: {
            backgroundColor: "#E8EFDA",
          },
        }}
        initialRouteName="Home"
        drawerType={"slide"}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Search Country" component={searchCountry} />
        <Drawer.Screen name="Favorites" component={Favorites} />
        <Drawer.Screen name="Health" component={Health} />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Drawer" component={DrawerStack} />
        <Stack.Screen
          name="Country"
          component={Country}
          options={{
            title: null,
            headerStyle: { backgroundColor: "#121517" },
            headerTintColor: "#CFCFCF",
            headerTintSize: 25,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
