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
import React,{useEffect, useState} from 'react'

import { createStackNavigator } from "@react-navigation/stack";
import QueList from "./QueList";
import TripStarting from "../DriverTrips/TripStarting";

const Stack = createStackNavigator();

export default function TripsQue({navigation}) {
  return(
    <Stack.Navigator initialRouteName="quelist">
    <Stack.Screen
      name="quelist"
      component={QueList}
      options = {{title:"Trips Que"}}
    />

    <Stack.Screen name="startTrip" component={TripStarting} options = {{title:"Trip Starting"}}/>


  </Stack.Navigator>
  )
} 
