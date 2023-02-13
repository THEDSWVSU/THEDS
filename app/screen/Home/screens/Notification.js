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
import TripHome from "./Trips/TripHome";
import { createStackNavigator } from "@react-navigation/stack"; 
import { API_BASE_URL } from "../../../../config";
import axios from "axios";
import storage from "../../../helder/storage";
import TripItem from "../components/tripItem/TripItem";
import { useFocusEffect } from "@react-navigation/native";
import TripView from "./TripView/TripView";
const Stack = createStackNavigator();

export default function Notification({navigation}) {

  return(
    <Stack.Navigator initialRouteName="notificationList">
      <Stack.Screen name="notificationList" component={NotificationList} options={{title:"Notification"}}/>
      <Stack.Screen name="trip-view" component={TripView} options = {{title:"Trip Details"}}/>

    </Stack.Navigator>
  )
  }
    

  function NotificationList ({navigation}) {
    const [deliveries, setDeliveries] = useState([]);
    const {getValueFor} = storage()
  
  
    const getchNotification = async()=> {
      const accountId  = await getValueFor("accountId")
      const requesPt = await axios.post(API_BASE_URL+"/passenger/getNotification",{accountId})
      
      const requestData = requesPt.data
  
      setDeliveries(requestData)
    }
  
    useFocusEffect(useCallback(()=>{
      setInterval(getchNotification, 3000)
    },[navigation]))
  
  
        return(
        <View style={styles.main}>
          <ScrollView>
            <View style={styles.body}>
              {deliveries.map((data, idx)=>(
              <TripItem data = {data} key = {idx} type = "notification" navigation={navigation}/>
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
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
        flexDirection: "row",
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