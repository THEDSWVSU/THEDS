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
import { Appbar, Divider, Provider, Menu } from "react-native-paper";
import TripItem from "../../components/tripItem/TripItem"
import CreateTrip from "../createTrip/CreateTrip";
import { createStackNavigator } from "@react-navigation/stack";
import TripHome from "./TripHome";
import TripDetails from "../../components/TripDetails/TripDetails";
import ConfirmTrip from "../createTrip/ConfirmTrip";
import TripView from "../TripView/TripView";

const Stack = createStackNavigator();

export default function Trips({navigation}) {
    return(
      <Stack.Navigator initialRouteName="hailings">
      <Stack.Screen
        name="new-trip"
        component={CreateTrip}
        options = {{title:"Create Trip"}}
      />

      <Stack.Screen name="hailings" component={TripHome} options = {{title:"Hailing"}}/>
      <Stack.Screen name="trip-details" component={ConfirmTrip} options = {{title:"Confirm Booking"}}/>

    </Stack.Navigator>
    )
  } 
