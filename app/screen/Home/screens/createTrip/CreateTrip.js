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
import MapViewDirections from "react-native-maps-directions";
navigator.geolocation = require("expo-location");

export default function CreateTrip({ navigation }) {
  const [origin, setOrigin] = useState("");
  const [numPerson, setNumPerson] = useState(0);
  const [destination, setDestination] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [lat1, setLat1] = useState(0);
  const [long1, setLong1] = useState(0);
  const quants = [1, 2, 3, 4];
  const [distance, setDistance] = useState(0);
  const [originCords, setOriginCords] = useState(0);
  const [distCords, setDistCords] = useState(0);

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
    const passengerId = await getValueFor("accountId")
    const tripData = {
        origin: origin,
        destination: destination,
        time: time.getHours() + ":"+time.getMinutes() ,
        passengerId: passengerId,
        coords:{originCords, distCords},
        numPassenger:numPerson,
        distance: distance,
        price:Math.round(((Math.round(distance*100)/100) * 20) * numPerson)
      }
    navigation.navigate('trip-details',{tripData})
  };
  const handleOrigin = async (data, details) => {
    setOrigin(data.description);
    const geom = details.geometry;
    
  setLat1(geom.location.lat);
  setLong1(geom.location.lng)
  setOriginCords({
    latitude: geom.location.lat,
      longitude: geom.location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
  })
  }
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
    const long2 = details.geometry.location.lng

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
    setDistance(dist);
  };


  return (
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
          {originCords ? <Marker coordinate={originCords} pinColor="green" /> : ""}
          {distCords ? <Marker coordinate={distCords} /> : ""}

          {origin && distCords ? (
            <MapViewDirections
              origin={origin}
              destination={distCords}
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
      <View style={styles.label}>
        <Text>Number of Passengers</Text>
      </View>
      <View style={styles.inputGroup}>
        {quants.map((val, idx) => (
          <QuantitiySelect
            title={val}
            key={idx}
            selected={numPerson}
            setSelected={setNumPerson}
          />
        ))}
      </View>
      <View style={styles.inputGroup}>
        <Text>Time to Pickup</Text>
        <TextInput
          style={styles.input}
          defaultValue={time.getHours() + ":" + time.getMinutes()}
          onTouchEnd={showTimepicker}
        />
      </View>

      <View style={styles.footer}>
        <Button title="Create" onPress={submit} />
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
  inputGroup: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  label: {
    width: "100%",
    paddingBottom: 10,
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
  },
  quantBtn: {
    width: 50,
    padding: 10,
    flex: 0,
    justifyContent: "center",
    alignContent: "center",
    margin: 4,
    borderRadius: 3,
    borderColor: "#dbdbdb",
    borderWidth: 1,
  },
  quantSelected: {
    width: 50,
    padding: 10,
    flex: 0,
    justifyContent: "center",
    alignContent: "center",
    margin: 4,
    borderRadius: 3,
    backgroundColor: "#f7c22f",
  },
});


const QuantitiySelect = ({ title, action, selected, setSelected }) => {
  return (
    <View
      style={selected === title ? styles.quantSelected : styles.quantBtn}
      onTouchEnd={() => setSelected(title)}
    >
      <Text
        style={{
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </View>
  );
};
