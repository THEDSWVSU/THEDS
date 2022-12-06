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
import { ScrollView } from "react-native-gesture-handler";
  
  export default function TripView({navigation, route}) {
      const data = route.params.tripData
      const trip = route.params.trip
      console.log("ffff", trip)



      useEffect(()=>{
        trip.seen === 0 ?axios.post(API_BASE_URL+"/passenger/seeNotificaton",{notifId:trip.notif_id}):""
      },[])
    return trip.type==="service"? (
      <ScrollView>
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
            <Text style={styles.detail}>{data.num_passenger} </Text>         
             <Text style={styles.label}>Passengers</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detail}>{data.pickup_time}</Text>
            <Text style={styles.label}>Pickup Time</Text>
          </View>
          <View style={styles.detailRowImp}>
            <Text style={styles.labelImp}>Fare Rate</Text>
            <Text style={styles.detailPrice}>₱ 50/km</Text>
          </View>
          
          <View style={styles.detailRowTotal}>
            <Text style={styles.labelImp}>Total Price</Text>
            <Text style={styles.detailTotaPrice}>₱ {data.price}</Text>
          </View>
          <View style={styles.luggageWrapper}>
            <Text style={styles.detail}>Driver</Text>
            <View style={styles.row}>
              <View style={styles.detailRow}>
              <Text style={styles.contentBold}>
              {data.firstname +
                " " +
                data.middlename +
                " " +
                data.lastname}
            </Text>
                <Text style={styles.label}>Plate Number</Text>
                <View style={styles.luggagePrice}>
                  <Text style={styles.plate}>022-333-123</Text>
                </View>
              </View>
              <Text style={styles.title}>Status</Text>

              <View style={styles.status}>
                  <Text style={styles.plate}>{data.status}</Text>
                </View>
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
    ):(
      <ScrollView>
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
            <Text style={styles.detail}>{data.pickup_time}</Text>
            <Text style={styles.label}>Pickup Time</Text>
          </View>
          <View style={styles.luggageBox}>
            <Text style={styles.detail}>Luggage</Text>
            <View style={styles.luggageRow}>
              <View style={styles.detailRow}>
                <Text style={styles.detail}>{data.large_luggage}</Text>
                <Text style={styles.label}>Large</Text>
                <View style={styles.luggageDetails}>
                  <Text style={styles.detailPrice}>₱ 50/km</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detail}>{data.medium_luggage} </Text>
                <Text style={styles.label}>Medium</Text>
                <View style={styles.luggagePrice}>
                  <Text style={styles.detailPrice}>₱ 30/km</Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detail}>{data.small_luggage} </Text>
                <Text style={styles.label}>Small</Text>
                <View style={styles.luggagePrice}>
                  <Text style={styles.detailPrice}>₱ 10/km</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.detailRowImp}>
            <Text style={styles.labelImp}>Fare Rate</Text>
            <Text style={styles.detailPrice}>₱ 50/km</Text>
          </View>
          <View style={styles.detailRowTotal}>
            <Text style={styles.labelImp}>Total Price</Text>
            <Text style={styles.detailTotaPrice}>₱ {data.price}</Text>
          </View>
          <View style={styles.luggageWrapper}>
            <Text style={styles.detail}>Driver</Text>
            <View style={styles.row}>
              <View style={styles.detailRow}>
              <Text style={styles.contentBold}>
              {data.firstname +
                " " +
                data.middlename +
                " " +
                data.lastname}
            </Text>
                <Text style={styles.label}>Plate Number</Text>
                <View style={styles.luggagePrice}>
                  <Text style={styles.plate}>022-333-123</Text>
                </View>
              </View>
              <Text style={styles.title}>Status</Text>

              <View style={styles.status}>
                  <Text style={styles.plate}>{data.status}</Text>
                </View>
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
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
    row: {
      flex: 0,
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100%",
      backgroundColor: "#ebebeb",
    },
    luggageWrapper: {
      width: "100%",
      flex:0,
      alignItems:"center",
      backgroundColor: "#ebebeb",
      margin: 20,
      padding: 10,
    },
    status:{
      flex: 0,
      justifyContent: "space-between",
      alignItems: "center",
      width: "auto",
      flexDirection: "column",
      padding: 5,
      borderRadius: 30,
      backgroundColor:"#3d44c4"
    },
    plate:{
      fontSize:20,
      color:"white",
    },
    contentBold:{
      fontWeight:"bold"
    },
    luggageRow: {
      flex: 0,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      width: "100%",
      backgroundColor: "#ebebeb",
    },
    luggageBox: {
      width: "100%",
      backgroundColor: "#ebebeb",
      margin: 20,
      padding: 10,
    },
    luggageDetails: {
      backgroundColor: "#e4a802",
      flex: 0,
      justifyContent: "space-between",
      alignItems: "center",
      width: "auto",
      flexDirection: "column",
      padding: 5,
      borderRadius: 30,
    },  
    luggagePrice: {
      backgroundColor: "#e4a802",
      flex: 0,
      justifyContent: "space-between",
      alignItems: "center",
      width: "auto",
      flexDirection: "column",
      padding: 5,
      borderRadius: 30,
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
      fontWeight:"bold",
  
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
  