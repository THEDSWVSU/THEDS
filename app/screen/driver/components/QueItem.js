import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../config";

export default function QueItem({data, type, view}) {
  const [details, setDetails] = useState(null)

  useEffect(()=>{
    const getData = async()=>{
      const fetchData = await axios.post(API_BASE_URL+"/driver/getTripDetails/"+type,{tripId:data.service_id, driver:data.driver})
      const tripData = fetchData.data
      console.log("tripData",tripData)
      setDetails(tripData)

    }
    getData()
  },[])
  if(details)return (
    <View style={styles.main}>
      <View style={styles.details}>
        <Text style = {styles.title}>{type.toUpperCase()} BOOKING</Text>
        <Text style={styles.title}>{details.firstname + " " + details.middlename + " " + details.lastname}</Text>
        <Text style={styles.subtitle}>Distination: {details.origin} to {details.destination}</Text>
        <Text style={styles.subtitle}>Pickup Time: {details.pickup_time}</Text>
        <Text style={styles.date}>{details.date_time}</Text>
      </View>
      <View style={styles.row}>
        <Button title = "Start"/>
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
