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

export default function DeliveryRequestDetails({ navigation, route }) {
  const data = route.params.tripData;
  const distance = data.distance
  const sLuggage = data.smallLuggage
  const mLuggage = data.mediumLuggage
  const lLuggage = data.largeLuggage

  const totalPrice = (sLuggage * 10 * distance) + (mLuggage*30*distance)+(lLuggage*50*distance)
  const actualPrice = totalPrice<50?50:totalPrice

  const confirm = async () => {
    const confirmBooking = await axios.post(
      API_BASE_URL + "/passenger/requestDelivery",
      { data, actualPrice }
    );
    if (confirmBooking.data.success) {
      Alert.alert("Success", "Your booking has successfully submitted.",[
        {
          text: "Cancel",
          onPress: () => console.log("Cancelled"),
          style: "cancel",
        },
        { text: "OK", onPress: ()=>navigation.navigate("delivery-feeds") },
      ]);
      
    } else Alert.alert("Failed", "Failed to submit your booking.");
  };

  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.body}>
          <View style={styles.detailRow}>
            <Text style={styles.detail}>{data.origin}</Text>
          </View>
          <Text style={styles.label}>To</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detail}>{data.destination} </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detail}>
              {data.distance} km
            </Text>
            <Text style={styles.label}>Distance</Text>
          </View>
          <View style={styles.luggageWrapper}>
            <Text style={styles.detail}>Luggage</Text>

            <View style={styles.row}>
              <View style={styles.detailRow}>
                <Text style={styles.detail}>{data.largeLuggage}</Text>
                <Text style={styles.label}>Large</Text>
                <View style={styles.luggagePrice}>
                  <Text style={styles.detailPrice}>₱ 50/km</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detail}>{data.mediumLuggage} </Text>
                <Text style={styles.label}>Medium</Text>
                <View style={styles.luggagePrice}>
                  <Text style={styles.detailPrice}>₱ 30/km</Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detail}>{data.smallLuggage} </Text>
                <Text style={styles.label}>Small</Text>
                <View style={styles.luggagePrice}>
                  <Text style={styles.detailPrice}>₱ 10/km</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.detailRowImp}>
            <Text style={styles.labelImp}>Minimum Fare</Text>
            <Text style={styles.detailPrice}>PHP 50.00</Text>
          </View>
          <View style={styles.detailRowTotal}>
            <Text style={styles.labelImp}>Total Fare</Text>
            <Text style={styles.detailTotaPrice}>₱ {actualPrice}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.btn}>
            <Button
              title="Cancel"
              color={"#363535"}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.btn}>
            <Button title="Confirm" color={"#eb8d26"} onPress={confirm} />
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
    flex: 0,
    alignItems: "center",
  },
  detailRow: {
    flex: 0,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  row: {
    flex: 0,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#ebebeb",
  },
  luggageWrapper: {
    width: "100%",
    backgroundColor: "#ebebeb",
    margin: 20,
    padding: 10,
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
  detailRowImp: {
    backgroundColor: "#e4a802",
    flex: 0,
    justifyContent: "space-between",
    alignItems: "center",
    width: "auto",
    flexDirection: "column",
    padding: 20,
    borderRadius: 30,
  },
  detailRowTotal: {
    marginTop: 10,
    backgroundColor: "#ee4f00",
    flex: 0,
    justifyContent: "space-between",
    alignItems: "center",
    width: "auto",
    flexDirection: "column",
    padding: 20,
    borderRadius: 40,
  },
  labelImp: {
    color: "white",
    fontWeight: "bold",
  },
  detail: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  detailPrice: {
    color: "white",
    fontWeight: "bold",
  },
  detailTotaPrice: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  footer: {
    width: "100%",
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    width: "48%",
  },
});
