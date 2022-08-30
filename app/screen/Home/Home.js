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
import React, { useEffect, useState } from "react";
import { Appbar, Divider, Provider, Menu } from "react-native-paper";
import TripItem from "./components/tripItem/TripItem";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Trips from "./screens/Trips/Trips";
import CreateTrip from "./screens/createTrip/CreateTrip";

const Stack = createStackNavigator();
export default function Home({ navigation }) {

  const MenuPanel = ({navigation}) => {
    return (
      <View style={styles.menu}>
        
        <View style={styles.itemContainer}>
        <Text style={styles.menuItem}>Profile</Text>
        </View>
        <View style={styles.itemContainer}>
        <Text style={styles.menuItem}>Settings</Text>
        </View>
        <View style={styles.itemContainer} onTouchStart = {()=>navigation.reset({
          index:0,
          routes:[
            {name:"main"}
          ]
        })}>
        <Text style={styles.menuItem}>Logout</Text>
        </View>
      </View>
    );
  };
  return (
      <Stack.Navigator initialRouteName="trips">
        <Stack.Screen
          name="trips"
          component={Trips}
        />
        <Stack.Screen name="menu" component={MenuPanel} />
        <Stack.Screen name="new-trip" component={CreateTrip} options={{title:"Create Trip"}}
        />
      </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  menu: {
    flex: 1,
    justifyContent:"flex-start",
    alignItems: "center",
    paddingTop:StatusBar.currentHeightm,
    padding:10
  },
  itemContainer:{
    width:"100%",
    padding:10,
    borderWidth:1,
    borderColor:"#BDBDBD",
    borderRadius:5,
    marginBottom:5

  },
  menuItem:{
    fontSize:15,
  },

});
