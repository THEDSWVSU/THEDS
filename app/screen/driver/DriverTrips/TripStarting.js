import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { API_BASE_URL, MAP_KEY } from "../../../../config";
import MapViewDirections from "react-native-maps-directions";

export default function TripStarting({ navigation, route }) {
  const data = route.params.details;
  const queData = route.params.data || "service";
  const type = queData.type;
  const [arrived, setArrived] = useState(data.status === "arrived");
  const [dropped, setDropped] = useState(data.status === "done");

  const [origin, setOrigin] = useState(null);
  const [dist, setDist] = useState(null);

  useEffect(() => {
    //console.log(queData);
    console.log("data",data)
    const getCoords = async () => {
      const coords = await JSON.parse(data.coords);
      setOrigin(coords.originCords);
      setDist(coords.distCords);
    };
    getCoords();
  }, []);

  const dropOffPressed = async () => {
    Alert.alert(
      "Confirm",
      "Please confirm that you have arrived at the distination.",
      [
        {
          text: "Canel",
          onPress: () => null,
        },
        {
          text: "Confirm",
          onPress: async () => {
            const startReq = await axios.post(
              API_BASE_URL + "/driver/updateTrip",
              {
                tripId: queData.service_id,
                type: queData.type,
                update: "done",
                passengerId: data.passenger_id,
              }
            );
            const startRes = startReq.data;

            if (startRes.success) {
              Alert.alert(
                "Droped Off",
                "You have arrived at the drop off location."
              );
              setDropped(true);
              navigation.goBack();
            } else Alert.alert("Error", "Cannot start this trip right now.");
          },
        },
      ]
    );
  };
  const arrivedPressed = async () => {
    Alert.alert(
      "Confirm",
      "Please confirm that you have arrived at the distination.",
      [
        {
          text: "Canel",
          onPress: () => null,
        },
        {
          text: "Confirm",
          onPress: async () => {
            const startReq = await axios.post(
              API_BASE_URL + "/driver/updateTrip",
              {
                tripId: queData.service_id,
                type: queData.type,
                update: "arrived",
                passengerId: data.passenger_id,
              }
            );
            const startRes = startReq.data;

            if (startRes.success) {
              Alert.alert(
                "Arrived",
                "You have arrived at the pickup location. Just wait for your passenger."
              );
              setArrived(true);
            } else Alert.alert("Error", "Cannot start this trip right now.");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.main}>
      <View style={styles.mapView}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={origin}
        >
          {origin ? <Marker coordinate={origin} pinColor="green" /> : ""}
          {dist ? <Marker coordinate={dist} /> : ""}
          {origin && dist ? (
            <MapViewDirections
              origin={origin}
              destination={dist}
              apikey={MAP_KEY}
              mode={"DRIVING"}
              strokeWidth={5}
              strokeColor="green"
            />
          ) : (
            ""
          )}
        </MapView>
      </View>
      <View style={styles.row}>
        <View style={styles.colLabel}>
          <Text style={styles.label}>Pickup:</Text>
          <Text style={styles.label}>Drop Off:</Text>
        </View>
        <View style={styles.colDetails}>
          <View style={styles.row}>
            <FontAwesome name="map-marker" size={20} color="green" />
            <Text style={styles.detailsOrigin}>{data.origin}</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome name="map-marker" size={20} color="red" />
            <Text style={styles.detailsOrigin}>{data.destination}</Text>
          </View>
        </View>
      </View>
      {type === "service" ? (
        <View style={styles.tripDetails}>
          <Text style={styles.label}>Passenger</Text>
          <Text style={styles.detailsText}>
            {data.firstname + " " + data.middlename + " " + data.lastname}
          </Text>
          <Text style={styles.detailsText}>
            {data.phone_number}
          </Text>
        </View>
      ) : (
        <View style={styles.deliveryContent}>
          <View style={styles.tripDetails}>
            <Text style={styles.label}>Delivery</Text>
            <Text style={styles.detailsText}>
              {data.firstname + " " + data.middlename + " " + data.lastname}
            </Text>
            <Text style={styles.detailsText}>
            {data.phone_number}
          </Text>
          </View>
          <View style={styles.tripDetails}>
            <Text style={styles.label}>Packages</Text>
            <Text style={styles.detailsText}>
              {data.small_luggage} Small Luggage, {data.medium_luggage} Medium
              Luggage, {data.large_luggage} Large Luggage,
            </Text>
          </View>
        </View>
      )}
      <View style={styles.footer}>
        {arrived ? (
          <Button title="Drop Off" color={"red"} onPress={dropOffPressed} />
        ) : (
          <Button
            title="Arrived at Pickup Location"
            color={"green"}
            onPress={arrivedPressed}
          />
        )}
      </View>

      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  row: {
    width: "100%",
    flex: 0,
    flexDirection: "row",
  },

  details: {
    flex: 0,
    height: "auto",
    width: "100%",
    alignItems: "flex-start",
  },
  detailsOrigin: {
    fontWeight: "bold",
    padding: 5,
  },
  tripDetails: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    paddingBottom: 10,
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 10,
  },
  detailsText: {
    paddingLeft: 5,
    fontWeight: "bold",
  },
  label: {
    padding: 5,
  },
  deliveryContent: {
    width: "100%",
    padding: 10,
  },
  mapView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: "100%",
    margin: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  footer: {
    width: "100%",
    padding: 10,
  },
});
