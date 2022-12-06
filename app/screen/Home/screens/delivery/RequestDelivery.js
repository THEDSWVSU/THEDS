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
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import storage from "../../../../helder/storage";
import axios from "axios";
import { API_BASE_URL } from "../../../../../config";

import { MAP_KEY } from "../../../../../config";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
navigator.geolocation = require("expo-location");

export default function CreateTrip({ navigation }) {
  const [origin, setOrigin] = useState("");
  const [numPerson, setNumPerson] = useState(0);
  const [destination, setDestination] = useState("");
  const [lat1, setLat1] = useState(0);
  const [long1, setLong1] = useState(0);
  const [distance, setDistance] = useState(0);
  const [originCords, setOriginCords] = useState(0);
  const [distCords, setDistCords] = useState(0);
  const [largeLuggage, setLargeLuggage] = useState(0);
  const [mediumLuggage, setMediumLuggage] = useState(0);
  const [smallLuggage, setSmallLuggage] = useState(0);
  const [next, setNext] = useState(false);

  const [time, setTime] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTime(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: time,
      onChange,
      mode: currentMode,
    });
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const { getValueFor } = storage();

  const submit = async () => {
    const passengerId = await getValueFor("accountId");
    const tripData = {
      origin: origin,
      destination: destination,
      time: time.getHours() + ":" + time.getMinutes(),
      passengerId: passengerId,
      coords: { originCords, distCords },
      largeLuggage: largeLuggage,
      mediumLuggage:mediumLuggage,
      smallLuggage:smallLuggage,
      distance: distance,
    };
    navigation.navigate("delivery-request-details", { tripData });
  };
  const handleOrigin = async (data, details) => {
    setOrigin(data.description);
    const geom = details.geometry;

    setLat1(geom.location.lat);
    setLong1(geom.location.lng);
    setOriginCords({
      latitude: geom.location.lat,
      longitude: geom.location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };
  const handleDestination = async (data, details) => {
    setDestination(data.description);
    const geom = details.geometry;

    setDistCords({
      latitude: geom.location.lat,
      longitude: geom.location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    const lat2 = details.geometry.location.lat;
    const long2 = details.geometry.location.lng;

    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = long1 - long2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    setDistance(Math.round(dist * 100) / 100);
  };

  const Next = () => {
    return (
      <View style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.h1}>Time to Pickup</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.quantState}
              defaultValue={time.getHours() + ":" + time.getMinutes()}
              onTouchEnd={showTimepicker}
            />
          </View>
          <View style={styles.label}>
            <Text style={styles.h1}>Large Luggage</Text>
          </View>
          <View style={styles.inputGroup}>
            <QuantitiySelect state={largeLuggage} setState={setLargeLuggage} />
          </View>
          <View style={styles.label}>
            <Text style={styles.h1}>Medium Luggage</Text>
          </View>
          <View style={styles.inputGroup}>
            <QuantitiySelect
              state={mediumLuggage}
              setState={setMediumLuggage}
            />
          </View>
          <View style={styles.label}>
            <Text style={styles.h1}>Small Luggage</Text>
          </View>
          <View style={styles.inputGroup}>
            <QuantitiySelect state={smallLuggage} setState={setSmallLuggage} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Button title="Cancel" onPress={()=>setNext(false)} color="#363434" />
          </View>

          <View style={styles.col}>
            <Button title="Next" onPress={submit} />
          </View>
        </View>
      </View>
    );
  };
  return next ? (
    <Next />
  ) : (
    <View style={styles.main}>
      <View style={styles.label}>
        <Text>From</Text>
      </View>
      <View style={styles.inputGroup}>
        <GooglePlacesAutocomplete
          placeholder="Type a place"
          query={{ key: MAP_KEY, components: "country:ph" }}
          fetchDetails={true}
          onPress={(data, details = null) => handleOrigin(data, details)}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
        />
      </View>
      <View style={styles.label}>
        <Text>To</Text>
      </View>
      <View style={styles.inputGroup}>
        <GooglePlacesAutocomplete
          placeholder="Type a place"
          query={{ key: MAP_KEY, components: "country:ph" }}
          fetchDetails={true}
          onPress={(data, details = null) => handleDestination(data, details)}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
        />
      </View>
      <View style={styles.mapView}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 11.1227452,
            longitude: 122.538158,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0221,
          }}
        >
          {originCords ? (
            <Marker coordinate={originCords} pinColor="green" />
          ) : (
            ""
          )}
          {distCords ? <Marker coordinate={distCords} /> : ""}
        </MapView>
      </View>
      <View style={styles.footer}>
        <Button title="Next" onPress={() => setNext(true)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  content: {
    flex: 0,
    backgroundColor: "white",
    padding: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  label: {
    width: "100%",
    paddingBottom: 10,
  },
  h1: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 20,
  },
  input: {
    height: 40,
    width: "50%",
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flex: 1,
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
    marginTop: 20,
    padding: 10,
  },
  row: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  col: {
    width: "50%",
    paddingLeft: 5,
    paddingRight: 5,
  },
  quantBtn: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ab183d",
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "center",
    borderRadius: 100,
    margin: 10,
  },
  quantBtnText: {
    fontSize: 25,
    color: "white",
  },
  quantState: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#c4c4c4",
    borderRadius: 5,
    padding: 5,
    fontSize: 20,
    width: 100,
  },
});
const QuantitiySelect = ({ title, action, state, setState }) => {
  return (
    <View
      style={{
        flex: 0,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={styles.quantBtn}
        onTouchEnd={() => setState(state > 0 ? state - 1 : 0)}
      >
        <Text style={styles.quantBtnText}>-</Text>
      </View>
      <Text style={styles.quantState}>{state}</Text>
      <View style={styles.quantBtn} onTouchEnd={() => setState(state + 1)}>
        <Text style={styles.quantBtnText}>+</Text>
      </View>
    </View>
  );
};
