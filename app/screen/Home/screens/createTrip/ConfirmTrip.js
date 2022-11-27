import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../../config";

export default function ConfirmTrip({navigation, route}) {
    const data = route.params.tripData
    console.log(data)


    const confirm=async()=>{
        const confirmBooking = await axios.post(API_BASE_URL+"/passenger/requestRide",{data})
        if(confirmBooking.data.success){
            Alert.alert("Success","Your booking has successfully submitted.")
            navigation.navigate("hailings")
        }
        else Alert.alert("Failed","Failed to submit your booking.")

    }

  return (
    <View style={styles.main}>
      <View style={styles.body}>
        <View style={styles.detailRow}>
          <Text style={styles.detail}>{data.origin} </Text>
        </View>
        <Text style={styles.label}>To</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detail}>{data.destination} </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detail}>{Math.round(data.distance *100)/100} km</Text>
          <Text style={styles.label}>Distance</Text>

        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detail}>{data.numPassenger} </Text>         
           <Text style={styles.label}>Passengers</Text>


        </View>
        <View style={styles.detailRowImp}>
          <Text style={styles.labelImp}>Fare Rate</Text>
          <Text style={styles.detailPrice}>₱ 50/km</Text>
        </View>
        <View style={styles.detailRowTotal}>
          <Text style={styles.labelImp}>Total Price</Text>
          <Text style={styles.detailTotaPrice}>₱ {data.price}</Text>
        </View>
      </View>
      

      <View style={styles.footer}>
        <View style = {styles.btn}>
        <Button title="Cancel" color={"#363535"} onPress = {()=>navigation.goBack()}/>
        </View>
        <View style = {styles.btn}>
        <Button title="Confirm" color={"#eb8d26"}onPress={confirm}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  body: {
    backgroundColor: "white",
    width: "99%",
    padding: 10,
    marginBottom: 10,
    flex:0,
    alignItems:"center"
  },
  detailRow: {
    flex: 0,
    padding:10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  detailRowImp:{
    backgroundColor:"#e4a802",
    flex: 0,
    justifyContent: "space-between",
    alignItems: "center",
    width: "auto",
    flexDirection: "column",
    padding:20,
    borderRadius:30
  },
  detailRowTotal:{
    marginTop:10,
    backgroundColor:"#ee4f00",
    flex: 0,
    justifyContent: "space-between",
    alignItems: "center",
    width: "auto",
    flexDirection: "column",
    padding:20,
    borderRadius:40

  },
  labelImp: {
    color:"white",
    fontWeight:"bold"
  },
  detail:{
    fontWeight:"bold",
    fontSize:20,
    textAlign:"center"
  },
  detailPrice:{
    color:"white",
    fontWeight:"bold"

  },
  detailTotaPrice:{
    color:"white",
    fontWeight:"bold",
    fontSize:20

  },
  footer: {
    width: "100%",
    flex:0,
    flexDirection:"row",
    justifyContent:"space-around"
  },
  btn:{
    width:"48%"
  }
});
