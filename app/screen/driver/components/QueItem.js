import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../config";
import { useFocusEffect } from "@react-navigation/native";

export default function QueItem({data, type, view, navigation}) {
  const [details, setDetails] = useState(null)
  const [render, setRender] = useState(false)

  useFocusEffect(useCallback(()=>{
    const getData = async()=>{
      const fetchData = await axios.post(API_BASE_URL+"/driver/getTripDetails/"+type,{tripId:data.service_id, driver:data.driver})
      const tripData = fetchData.data
      setRender(tripData.status !== 'done')
      setDetails(tripData)

    }
    getData()
  },[]))

  const startTrip =async()=>{
    const startReq = await axios.post(API_BASE_URL+"/driver/updateTrip",{tripId:data.service_id, type:data.type,update:"starting",passengerId:details.passenger_id})
   const startRes = startReq.data

    if(startRes.success)navigation.navigate("startTrip",{details, data})
    else Alert.alert("Error", "Cannot start this trip right now.")
  
 }
 const proceed = ()=>{
  navigation.navigate("startTrip",{details, data})
 }
  if(details && render)return (
    <View style={styles.main}>
      <View style={styles.details}>
        <Text style = {styles.title}>{type.toUpperCase()} BOOKING</Text>
        <Text style={styles.title}>{details.firstname + " " + details.middlename + " " + details.lastname}</Text>
        <Text style={styles.subtitle}>Distination: {details.origin} to {details.destination}</Text>
        <Text style={styles.subtitle}>Pickup Time: {details.pickup_time}</Text>
        <Text style={styles.date}>{details.date_time}</Text>
      </View>
      <View style={styles.row}>
        {details.status==="starting" || details.status==="arrived"?(
          <Button title = "Continue" color={"orange"} onPress={proceed}/>
        ):(
          <Button title = "Start" onPress={startTrip}/>
        )}
      </View>
    </View>
  )
  else "";

}

const styles = StyleSheet.create({
  main: {
    padding: 10,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#BDBDBD",
    borderWidth: 1,
    width: "100%",
    marginBottom: 5,
    flexDirection: "row",
  },
  title: {
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#757575",
  },
  details:{
    width:"75%"
  },
  row: {},
});
