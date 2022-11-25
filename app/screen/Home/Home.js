import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, Divider, Provider, Menu } from "react-native-paper";
import TripItem from "./components/tripItem/TripItem";
import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createStackNavigator } from "@react-navigation/stack";
import Trips from "./screens/Trips/Trips";
import CreateTrip from "./screens/createTrip/CreateTrip";
import useHome from "./useHome";
import Delivery from "./screens/delivery/Delivery";
import Notification from "./screens/Notification";

const Tab = createBottomTabNavigator();
export default function Home({ navigation }) {

  const MenuPanel = ({navigation}) => {

    const {logout} = useHome(navigation)
    
    return (
      <View style={styles.menu}>
        
        <View style={styles.itemContainer}>
        <Text style={styles.menuItem}>Profile</Text>
        </View>
        <View style={styles.itemContainer}>
        <Text style={styles.menuItem}>Settings</Text>
        </View>
        <View style={styles.itemContainer} onTouchStart = {logout}>
        <Text style={styles.menuItem}>Logout</Text>
        </View>
      </View>
    );
  };
  return (
      <Tab.Navigator initialRouteName="trips">
        <Tab.Screen
          name="trips"
          component={Trips}
          options = {{
            title:"Hailing",
            headerShown:false}}
        />
        
        <Tab.Screen name="delivery" component={Delivery} options = {{
          title:"Delivery",
          headerShown:false}}/>

<Tab.Screen
          name="notification"
          component={Notification}
          options = {{
            title:"Notification",
          }}
        />
        <Tab.Screen name="menu" component={MenuPanel} options={{title:"Menu"}}
        />
      </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  menu: {
    flex: 1,
    justifyContent:"flex-start",
    alignItems: "center",
    paddingTop:StatusBar.currentHeightm,
    padding:10
  },
  itemContainer:{
    width:"100%",
    padding:10,
    borderWidth:1,
    borderColor:"#BDBDBD",
    borderRadius:5,
    marginBottom:5

  },
  menuItem:{
    fontSize:15,
  },

});
