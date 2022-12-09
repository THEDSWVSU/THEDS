import {
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Image,
  } from "react-native";
  import React, { useCallback, useEffect, useState } from "react";

  import { createStackNavigator } from "@react-navigation/stack";
  import { API_BASE_URL } from "../../../../config";
  import axios from "axios";
  import storage from "../../../helder/storage";
  import QueItem from "../components/QueItem";
  import { useFocusEffect } from "@react-navigation/native";

export default function QueList ({navigation}){
    const [trips, setTrips] = useState([]);
  
    const { getValueFor } = storage();
  
    const fetchQue = async () => {
      const driver = await getValueFor("accountId");
      const tripReq = await axios.post(API_BASE_URL + "/driver/getQue", {
        driver,
      });
      const tripData = tripReq.data;
      if (tripData.success) {
        setTrips(tripData.data);
      }
    };
    useFocusEffect(
      useCallback(() => {
        fetchQue();
      }, [])
    );
    return (
      <View style={styles.main}>
        <ScrollView>
          <View style={styles.body}>
            {trips.map((data, idx) => (
              <QueItem
                data={data}
                key={idx}
                type={data.type}
                navigation={navigation}
              />
            ))}
          </View>
        </ScrollView>
        <View style={styles.footer}></View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    logo: {
      width: 30,
      height: 30,
    },
    navBar: {
      backgroundColor: "white",
    },
    menuButton: {
      color: "black",
    },
    main: {
      height: "100%",
    },
    body: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      padding: 10,
      paddingBottom: 50,
    },
    menu: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      padding: 10,
      flexDirection: "row",
    },
    footer: {
      flex: 1,
      padding: 10,
      position: "absolute",
      bottom: 0,
      width: "100%",
    },
    input: {
      height: 40,
      margin: 5,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      flex: 1,
    },
  });
  