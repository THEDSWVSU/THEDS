import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../config";

export default function DriverTripItem({ data, type, view, action }) {
  useEffect(() => {
    console.log(data);
  }, [data]);

  if (type === "delivery")
    return (
      <View style={styles.main}>
        <View style={styles.details}>
          <Text style={styles.transactionLabel}>{data.transaction_id}</Text>
          <Text style={styles.title}>
            {data.firstname + " " + data.middlename + " " + data.lastname}
          </Text>
          <Text style={styles.subtitle}>
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
        <View style={styles.row}>
          <Button title="Accept" onPress={() => action(data)} />
        </View>
      </View>
    );
  else
    return (
      <View style={styles.main}>
        <View style={styles.details}>
          <Text style={styles.transactionLabel}>{data.transaction_id}</Text>
          <Text style={styles.title}>
            {data.firstname + " " + data.middlename + " " + data.lastname}
          </Text>
          <Text style={styles.subtitle}>
            Distination: {data.origin} to {data.destination}
          </Text>
          <Text style={styles.subtitle}>Pickup Time: {data.pickup_time}</Text>
          <Text style={styles.date}>{data.date_time}</Text>
        </View>
        <View style={styles.row}>
          <Button title="Accept" onPress={() => action(data)} />
        </View>
      </View>
    );
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
  details: {
    width: "75%",
  },
  transactionLabel: {
    color: "orange",
    fontWeight: "800",
    fontSize: 30,
  },
});
