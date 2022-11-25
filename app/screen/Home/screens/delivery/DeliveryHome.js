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
import React, { useCallback, useEffect, useState } from "react";
import { Appbar, Divider, Provider, Menu } from "react-native-paper";
import TripItem from "../../components/tripItem/TripItem";
import CreateTrip from "../createTrip/CreateTrip";
import { createStackNavigator } from "@react-navigation/stack";
import { API_BASE_URL } from "../../../../../config";
import axios from "axios";
import storage from "../../../../helder/storage";
import { useFocusEffect } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function DeliveryHome({ navigation }) {
  const [deliveries, setDeliveries] = useState([]);
  const { getValueFor } = storage();

  useEffect(() => {
    navigation.setOptions({
      header: CustomNavigationBar,
    });
    
    fetchDeliveries();
  }, [navigation]);

  useFocusEffect(useCallback(()=>{
    fetchDeliveries()
  },[]))
  const fetchDeliveries = async () => {
    const accountId = await getValueFor("accountId");
    const requesPt = await axios.post(
      API_BASE_URL + "/passenger/getDeliveries",
      { accountId }
    );

    const requestData = requesPt.data;

    setDeliveries(requestData);
    console.log(requestData);
  };

  function CustomNavigationBar() {
    return (
      <Appbar.Header style={styles.navBar}>
        <Appbar.Content title="Delivery" />

        <Appbar.Action
          icon="plus"
          color="black"
          onPress={() => navigation.navigate("new-delivery")}
        />
      </Appbar.Header>
    );
  }

  const cancelBooking = (tripData) => {

    const confirm = async () => {
      console.log(tripData);
      const tripId = tripData.id;
      const acceptReq = await axios.post(API_BASE_URL + "/passenger/cancelDelivery", {
        tripId: tripId
      });
      const responseData = acceptReq.data;
      if (responseData.success) fetchDeliveries();
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
  return (
    <View style={styles.main}>
      <ScrollView>
      <View style={styles.header}>
            <Text style = {styles.bold}>Delivery Bookings</Text>
            <Button title="Refresh" onPress={fetchDeliveries}/>
          </View>
        <View style={styles.header}>
          <Text>Search</Text>
          <TextInput style={styles.input}></TextInput>
        </View>
        <View style={styles.body}>
          {deliveries.length ? (
            deliveries.map((data, idx) => <TripItem data={data} key={idx} action = {cancelBooking}/>)
          ) : (
            <Text>You have no bookings yet.</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}></View>
    </View>
  );
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
