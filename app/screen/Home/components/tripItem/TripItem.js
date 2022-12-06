import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../../config";

export default function TripItem({ data, type, action, navigation }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const fetchData = await axios.post(
        API_BASE_URL + "/passenger/getTripDetails/" + data.type,
        { tripId: data.service_id, driver: data.driver }
      );
      const tripData = fetchData.data;
      setDetails(tripData);
    };
    if (type === "notification") fetchDetails();
  }, [data]);

  const viewNotif = () => {
    navigation.navigate("trip-view",{tripData:details, trip:data})
  }
  if (type === "notification") {
    if (details) {
      return (
        <View style={data.seen?styles.main:styles.darkMen} onTouchEnd = {viewNotif}>
          <View style={styles.col}>
            <Text style={styles.title}>Booking Accepted </Text>
            <Text style={styles.contentText}>
              Your {data.type} booking for {details.origin} to{" "}
              {details.destination} has been acccepted by Rider :
            </Text>
            <Text style={styles.contentBold}>
              {details.firstname +
                " " +
                details.middlename +
                " " +
                details.lastname}
            </Text>

            <Text style={styles.date}>{details.date_time}</Text>
          </View>
        </View>
      );
    } else return "";
  }
  if (type === "hailing") {
    return (
      <View style={styles.main}>
        <View style={styles.details}>
          <Text style={styles.title}>
            {data.origin} to {data.destination}
          </Text>
          <Text style={styles.date}>Pickup: {data.pickup_time}</Text>
        </View>
        <View style={styles.row}>
          
        {data.status === "pending"?<Button title="Cancel" color="#ee4f00" onPress={() => action(data)} />:<Text>{data.status}</Text>}
        </View>
      </View>
    );
  }
  return (
    <View style={styles.main}>
      <View style={styles.details}>
        <Text style={styles.title}>
          {data.origin} to {data.destination}
        </Text>
        <Text style={styles.subtitle}>Distance: {data.distance}km</Text>
        <Text style={styles.subtitle}>
          Luggage: {data.small_luggage} small, {data.medium_luggage} medium,{" "}
          {data.large_luggage} large
        </Text>
        <Text style={styles.subtitle}>Fare: PHP {data.price}.00</Text>
        <Text style={styles.date}>Pickup: {data.pickup_time}</Text>
      </View>
      <View style={styles.action}>
        {data.status === "pending"?<Button title="Cancel" color="#ee4f00" onPress={() => action(data)} />:<Text>{data.status}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  darkMen:{
    backgroundColor:"#3d44c4",
    padding: 10,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#d6d6d6",
    width: "100%",
    marginBottom: 5,
    flexDirection: "row",
  },
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

  details: {
    width: "75%",
  },
  content: {
    flex: 0,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  contentBold: {
    fontWeight: "bold",
  },
  contentText: {
    flex: 1,
    flexWrap: "wrap",
    width: "auto",
  },
  date: {
    fontSize: 12,
    color: "#757575",
  },
  col: {
    width: "100%",
  },
});
