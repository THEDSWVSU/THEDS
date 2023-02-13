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
    Alert,
  } from "react-native";
import React,{useCallback, useEffect, useState} from 'react'
import { Appbar, Divider, Provider, Menu } from "react-native-paper";
import TripItem from "../../components/tripItem/TripItem"
import CreateTrip from "../createTrip/CreateTrip";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import { API_BASE_URL } from "../../../../../config";
import storage from "../../../../helder/storage";
import { useFocusEffect } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function TripHome({navigation}) {

  const {getValueFor} = storage()
  const [trips, setTrips] = useState([]);
    useEffect(() => {
        navigation.setOptions({
          header: CustomNavigationBar,
        });
        fetchTrips()
      }, [navigation]);

      useFocusEffect(useCallback(()=>{
        fetchTrips()
      },[]))
      
      const fetchTrips = async()=>{
        const passengerId = await getValueFor("accountId")
        const tripRequest = await axios.post(API_BASE_URL+"/passenger/getHailings",{passengerId:passengerId})
        const tripResponse = tripRequest.data
        setTrips(tripResponse)
      }

      const cancelBooking = (tripData) => {

        const confirm = async () => {
          console.log(tripData);
          const tripId = tripData.id;
          const acceptReq = await axios.post(API_BASE_URL + "/passenger/cancelHail", {
            tripId: tripId
          });
          const responseData = acceptReq.data;
          if (responseData.success) fetchTrips();
        };
        Alert.alert("Cancel Booking", "Are you sure to cancel this booking?", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancelled"),
            style: "cancel",
          },
          { text: "OK", onPress: confirm },
        ]);
      };
    
      function CustomNavigationBar() {
        return (
          <Appbar.Header style={styles.navBar}>
            <Appbar.Content title="Hailing" />
           
            <Appbar.Action
            icon="plus"
            color="black"
            onPress={() => navigation.navigate('new-trip')}
          />
          </Appbar.Header>
        );
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
              {trips.length? trips.map((data, idx)=>(
                <TripItem data={data} key = {idx} type = "hailing" action={cancelBooking}/>
              )):(              <Text>You have no booking yet</Text>
              )}
      
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