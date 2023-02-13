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
import DriverTripItem from "../components/DriverTripItem";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../../../../config";
import axios from "axios";
import storage from "../../../helder/storage";
import { useFocusEffect } from "@react-navigation/native";
const Stack = createStackNavigator();

export default function DriverDelivery({navigation}) {
  const [newTrip, setNewTrip] = useState(false);
  const {getValueFor} = storage()
    // useEffect(() => {
    //     navigation.setOptions({
    //       header: CustomNavigationBar,
    //     });
    //   }, []);
    
    const [deliveries, setDeliveries] = useState([])

    const fetchDeliveries = async()=>{
      const deliveryReq = await axios.get(API_BASE_URL+'/driver/deliveryFeeds')
      const deliveryData = deliveryReq.data
      if(deliveryData.success){
          setDeliveries(deliveryData.data)
      }

  } 

    useFocusEffect(useCallback(()=>{
      setInterval(fetchDeliveries,3000)
    },[]))

    const acceptTrip = async(tripData) => {
      const driverId = await getValueFor('accountId')
      const passengerId = tripData.passenger_id
      const tripId = tripData.id
      const acceptReq = await axios.post(API_BASE_URL+"/driver/acceptTrip",{tripId:tripId,passengerId:passengerId,type:"delivery", driverId:driverId})
      const responseData = acceptReq.data
      if(responseData.success)navigation.navigate("trips-que") 
    }
      function CustomNavigationBar() {
        return (
          <Appbar.Header style={styles.navBar}>
            <Appbar.Content title="Delivery" />
           
            <Appbar.Action
            icon="plus"
            color="black"
            onPress={() => navigation.navigate('new-delivery')}
          />
          </Appbar.Header>
        );
      }
      return(
        <View style={styles.main}>
        <ScrollView>
        <View style={styles.header}>
            <Text style = {styles.bold}>Delivery Bookings</Text>
            <Button title="Refresh" onPress={fetchDeliveries}/>
          </View>
          <View style={styles.header}>        
            <Text>Search</Text>
            <TextInput style={styles.input} ></TextInput>
          </View>
          

          <View style={styles.body}>
            {deliveries.length > 0?deliveries.map((data, idx)=>(
                <DriverTripItem data = {data} key = {idx}  type = "delivery" action={acceptTrip}/>
            )):(<Text style = {{height:100, width:"100%",textAlign:"center" }}>There's no Booking Yet</Text>)}
      
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