import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import useDriverHome from './useDriverHome';
import { createStackNavigator } from "@react-navigation/stack";
import DriverTrips from '../DriverTrips/DriverTrips';

export default function DriverHome({navigation}) {
    const Stack = createStackNavigator();


    const MenuPanel = ({navigation}) => {
        const {logout} = useDriverHome(navigation)

        return (
          <View style={styles.menu}>
            
            <View style={styles.itemContainer}>
            <Text style={styles.menuItem}>Profile</Text>
            </View>
            <View style={styles.itemContainer}>
            <Text style={styles.menuItem}>Settings</Text>
            </View>
            <View style={styles.itemContainer} onTouchStart = {logout}>
            <Text style={styles.menuItem}>Logout</Text>
            </View>
          </View>
        );
      }; 
    return (
        <Stack.Navigator initialRouteName="driver-trips">
          <Stack.Screen
            name="driver-trips"
            component={DriverTrips}
          />
          <Stack.Screen name="menu" component={MenuPanel} />
          {/* <Stack.Screen name="new-trip" component={CreateTrip} options={{title:"Create Trip"}}
          /> */}
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
})