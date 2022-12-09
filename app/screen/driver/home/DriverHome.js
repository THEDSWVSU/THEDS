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
import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createStackNavigator } from "@react-navigation/stack";
import DriverDelivery from "./DriverDelivery";
import DriverTrips from "./DriverTrips";
import TripsQue from "./TripsQue";
import storage from "../../../helder/storage";
import TripStarting from "../DriverTrips/TripStarting";
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function DriverHome({ navigation }) {

  const {save} = storage()
  const MenuPanel = ({navigation}) => {
    const logout = () => {
      save("accountId", "")
      save("userType", "")
      navigation.reset({
        index:0,
        routes:[
          {name:"main"}
        ]
      })
    }
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
      <Tab.Navigator initialRouteName="driver-trips">
        <Tab.Screen
          name="driver-trips"
          component={DriverTrips}
          options = {{
            title:"Hailing",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bus" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen name="delivery" component={DriverDelivery} options = {{
          title:"Delivery",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube" color={color} size={size} />
          )
          }}/>
          <Tab.Screen name="trips-que" component={TripsQue} options = {{
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          )
          }}/>
        <Tab.Screen name="menu" component={MenuPanel} options={{title:"Menu",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="menu" color={color} size={size} />
        )}}
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
