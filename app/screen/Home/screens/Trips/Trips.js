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
    </Stack.Navigator>
    )
  } 
