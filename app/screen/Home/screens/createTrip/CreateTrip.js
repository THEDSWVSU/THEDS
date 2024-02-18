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
import { calculateDistance, locations } from "../../../../helder/utility";
import AutocompleteInput from "react-native-autocomplete-input";
import SearchAutoComplete from "../../components/SearchAutocomplete/SearchAutoComplete";
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
  const [places, setPlaces] = useState([]);

  const [time, setTime] = useState(new Date());

  const latCenter = "11.123473";
  const longCenter = "122.538865";

  useEffect(() => {
    const getPlaces = locations.map((value) => value.name);
    setPlaces(getPlaces);
  }, []);

  const timeHandler = (event, selectedDate) => {
    const currentDate = selectedDate;
    const dateNow = new Date();
    const timeNow = dateNow.getHours() + dateNow.getMinutes();
    const selectedTime = currentDate.getHours() + currentDate.getMinutes();
    if (selectedTime > timeNow) {
      setTime(currentDate);
    } else {
      Alert.alert("Invalid Time", "The time you selected is invalid.");
    }
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: time,
      onChange: timeHandler,
      mode: currentMode,
    });
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const { getValueFor } = storage();

  const submit = async () => {
    if (!originCords)
      return Alert.alert("Incomplete", "Origin place is not specified");
    if (!distCords)
      return Alert.alert("Incomplete", "Destination place is not specified");
    if (!numPerson)
      return Alert.alert("Incomplete", "Number of passengers is not specified");
    if (!time) return Alert.alert("Incomplete", "Time is not specified");

    const passengerId = await getValueFor("accountId");
    const price = Math.round(
      (Math.round(distance * 100) / 100) * 20 * numPerson
    );
    const tripData = {
      origin: origin,
      destination: destination,
      time: time.getHours() + ":" + time.getMinutes(),
      passengerId: passengerId,
      coords: { originCords, distCords },
      numPassenger: numPerson,
      distance: distance,
      price: price < 50 ? 50 : price,
    };
    navigation.navigate("trip-details", { tripData });
  };
  const handleOrigin = async (data) => {
    //  const geom = details.geometry;
    console.log(data);
    const distanceTocenter = calculateDistance(
      data.lat,
      data.lng,
      latCenter,
      longCenter
    );
    if (distanceTocenter < 10) {
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

  return (
    <View style={styles.main}>
      <View style={styles.label}>
        <Text>From</Text>
      </View>
      {/* <View style={styles.inputGroup}>
        <GooglePlacesAutocomplete
          placeholder="Type a place"
          query={{
            key: MAP_KEY,
            language: "es", // language of the results
            location: "11.123473, 122.538865",
            radius: "2000", //15 km
            components: "country:ph",
            strictbounds: true,
          }}
          fetchDetails={true}
          onPress={(data, details = null) => handleOrigin(data, details)}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
        /> 
              </View>

        */}

      <SearchAutoComplete list={locations} setSelected={handleOrigin} />
      <View style={styles.label}>
        <Text>To</Text>
      </View>
      <SearchAutoComplete list={locations} setSelected={handleDestination} />
      <View style={styles.mapView}>
        {originCords ? (
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={originCords}
          >
             {originCords ? <Marker coordinate={originCords} /> : ""}
            {distCords ? <Marker coordinate={distCords} /> : ""}
          </MapView>
        ) : (
          ""
        )}
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

  descriptionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: "center",
    fontSize: 16,
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
