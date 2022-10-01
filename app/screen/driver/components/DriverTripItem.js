import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function DriverTripItem() {
  return (
    <View style={styles.main}>
      <View style={styles.row}>
        <Text style={styles.title}>Emily Santor</Text>
        <Text style={styles.subtitle}>Distination: Terminal ----- LBC</Text>
        <Text style={styles.date}>Today: 12:30</Text>
      </View>
      <View style={styles.row}>
        <Text>Status: To Pickup</Text>
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
