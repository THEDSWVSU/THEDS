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
import SearchAutoComplete from "../../components/SearchAutocomplete/SearchAutoComplete";
import { calculateDistance, locations } from "../../../../helder/utility";
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
  const latCenter = "11.123473";
  const longCenter = "122.538865";
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
  const handleOrigin = async (data) => {
    //  const geom = details.geometry;
      console.log(data)
      const distanceTocenter = calculateDistance(
        data.lat,
        data.lng,
        latCenter,
        longCenter
      );
      console.log(distanceTocenter)
      if (distanceTocenter < 5) {
        setOrigin(data.name);
  
        setLat1(data.lat);
        setLong1(data.lng);
        setOriginCords({
          latitude: data.lat,
          longitude: data.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else {
        Alert.alert(
          "Out of Bounds",
          "Please select only a place within poblacion of Calinog."
        );
      }
    };
    const handleDestination = async (data) => {
      setDestination(data.name);
      //const geom = details.geometry;
  
      setDistCords({
        latitude: data.lat,
        longitude: data.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
  
      const lat2 = data.lat;
      const long2 = data.lng;
      setDistance(calculateDistance(lat1, long2, lat2, long2));
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
            <Text>30 to 50 kgs</Text>
          </View>
          <View style={styles.inputGroup}>
            <QuantitiySelect state={largeLuggage} setState={setLargeLuggage} />
          </View>
          <View style={styles.label}>
            <Text style={styles.h1}>Medium Luggage</Text>
            <Text> 15 to 29 kgs</Text>
          </View>
          <View style={styles.inputGroup}>
            <QuantitiySelect
              state={mediumLuggage}
              setState={setMediumLuggage}
            />
          </View>
          <View style={styles.label}>
            <Text style={styles.h1}>Small Luggage</Text>
            <Text>under 15 kgs</Text>
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
        <SearchAutoComplete list={locations} setSelected = {handleOrigin}/>
      <View style={styles.label}>
        <Text>To</Text>
      </View>
      <SearchAutoComplete list={locations} setSelected = {handleDestination}/>
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
