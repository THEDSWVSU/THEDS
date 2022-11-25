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
import RequestDelivery from "./RequestDelivery";
import DeliveryHome from "./DeliveryHome";

const Stack = createStackNavigator();

export default function Delivery({navigation}) {
    return(
      <Stack.Navigator initialRouteName="delivery-feeds">
      
      <Stack.Screen name="delivery-feeds" component={DeliveryHome} options = {{title:"Delivery"}}/>
      <Stack.Screen
        name="new-delivery"
        component={RequestDelivery}
        options = {{title:"Request Delivery"}}
      />
    </Stack.Navigator>
    )
  } 
