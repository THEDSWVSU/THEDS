import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../config";

export default function DriverTripItem({data, type, view, action}) {
  

  if (type === "delivery") return (
    <View style={styles.main}>
      <View style={styles.row}>
        <Text style={styles.title}>{data.firstname + " " + data.middlename + " " + data.lastname}</Text>
        <Text style={styles.title}>Package: {data.pakage}</Text>
        <Text style={styles.subtitle}>Distination: {data.origin} to {data.destination}</Text>
        <Text style={styles.subtitle}>Pickup Time: {data.pickup_time}</Text>
        <Text style={styles.date}>{data.date_time}</Text>
      </View>
      <View style={styles.row}>
        <Button title="Accept" onPress={()=>action(data)}/>
      </View>
      
    </View>
  );
  else return (
    <View style={styles.main}>
      <View style={styles.row}>
        <Text style={styles.title}>{data.firstname + " " + data.middlename + " " + data.lastname}</Text>
        <Text style={styles.subtitle}>Distination: {data.origin} to {data.destination}</Text>
        <Text style={styles.subtitle}>Pickup Time: {data.pickup_time}</Text>
        <Text style={styles.date}>{data.date_time}</Text>
      </View>
      <View style={styles.row}>
        <Button title="Accept" onPress={()=>action(data)}/>
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
  row: {},
});
