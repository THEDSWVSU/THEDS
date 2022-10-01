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
import React,{useEffect} from 'react'

import { Appbar, Divider, Provider, Menu } from "react-native-paper";
import DriverTripItem from "../components/DriverTripItem";

export default function DriverTrips({navigation}) {
    useEffect(() => {
        navigation.setOptions({
          header: CustomNavigationBar,
        });
      }, []);
    
      function CustomNavigationBar() {
        return (
          <Appbar.Header style={styles.navBar}>
            <Appbar.Content title="Trips" />
            <Appbar.Action
              icon="menu"
              color="black"
              onPress={() => navigation.navigate("menu")}
            />
          </Appbar.Header>
        );
      }
      
      return (
        <View style={styles.main}>
      <ScrollView>
        <View style={styles.header}>
          <Text>Search</Text>
          <TextInput style={styles.input} ></TextInput>
        </View>
        <View style={styles.body}>
          <DriverTripItem />

        </View>
      </ScrollView>
      {/* <View style={styles.footer}>
        <Button title="New trip" onPress={()=>navigation.navigate('new-trip')}/>
      </View> */}
    </View>
      );
    }
    
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