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
import React,{useCallback, useEffect, useState} from 'react'
import { Appbar, Divider, Provider, Menu } from "react-native-paper";
import TripItem from "../../Home/components/tripItem/TripItem";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import DriverTripItem from "../components/DriverTripItem";
import axios from "axios";
import { API_BASE_URL } from "../../../../config";

const Stack = createStackNavigator();

import storage from "../../../helder/storage";
import { useFocusEffect } from "@react-navigation/native";

export default function DriverTrips({navigation}) {
  const [hailings, setHailings] = useState([])

  const {getValueFor} = storage()
  
  const fetchTrips = async()=>{
    const hailingsReq = await axios.get(API_BASE_URL+'/driver/getHailings')
    const hailingsData = hailingsReq.data

    if(hailingsData.success){
        setHailings(hailingsData.data)
    }

} 
  useFocusEffect(useCallback(()=>{
    setInterval(fetchTrips,3000)
  },[]))


  const acceptTrip = async(tripData) => {
    const driverId = await getValueFor('accountId')
    const passengerId = tripData.passenger_id
    const tripId = tripData.id
    const acceptReq = await axios.post(API_BASE_URL+"/driver/acceptTrip",{tripId:tripId,passengerId:passengerId,type:"service", driverId:driverId})
    const responseData = acceptReq.data
    if(responseData.success)navigation.navigate("trips-que") 
  }
    
      return(
        <View style={styles.main}>
        <ScrollView>
        <View style={styles.header}>
            <Text style = {styles.bold}>Service Bookings</Text>
            <Button title="Refresh" onPress={fetchTrips}/>
          </View>
          <View style={styles.header}>
            <Text>Search</Text>
            <TextInput style={styles.input} ></TextInput>
          </View>
          <View style={styles.body}>
            {hailings.map((data, idx)=>(
              <DriverTripItem data={data} key = {idx} action = {acceptTrip}/>
            ))}
      
          </View>
        </ScrollView>
        <View style={styles.footer}>
        </View>
      </View>
    )
  }
    
    const styles = StyleSheet.create({
      logo: {
        width: 30,
        height: 30,
      },
      navBar: {
        backgroundColor: "white",
      },
      menuButton: {
        color: "black",
      },
      main: {
        height: "100%",
      },
      body: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
        paddingBottom: 50,
      },
      menu: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      header: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        flexDirection: "row",
      },
      bold:{
        fontWeight:"bold"
      },
      footer: {
        flex: 1,
        padding: 10,
        position: "absolute",
        bottom: 0,
        width: "100%",
      },
      input: {
        height: 40,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        flex: 1,
      },
    });