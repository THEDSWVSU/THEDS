import { StyleSheet, Text, View, TextInput, Button, Dimensions, Alert } from 'react-native'
import React, {useState} from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import { MAP_KEY } from '../../../../../config' 
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import storage from '../../../../helder/storage'
import axios from 'axios'
import { API_BASE_URL } from '../../../../../config'

export default function CreateTrip({navigation}) {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [pickupTime, setPickupTime] = useState("")

  const {getValueFor} = storage()



  const submit = async() => {
      const passengerId = await getValueFor('accountId')
      console.log("passenger id",passengerId)
      const reqDelivery = await axios.post(API_BASE_URL+"/passenger/requestRide",{origin:origin, destination:destination, time:pickupTime, passengerId:passengerId})
      const deliveryData = reqDelivery.data
      if(deliveryData.success){
        Alert.alert("Success!","Your booking has been submitted.")
        navigation.navigate("hailings")
      }
      else Alert.alert("Failed!","Cannot submit your booking.")
  }
  const handleOrigin = (e) => {
    setOrigin(e)
  }

  const handleDestination = (e) => {
    setDestination(e)
  }
  return (
    <View style={styles.main}>
      <View style={styles.inputGroup}>
        <Text>Origin</Text>
        <TextInput
        style={styles.input}
        placeholder="Location"
        defaultValue={origin}
        onChangeText={handleOrigin}/>

        {/* <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: MAP_KEY,
        language: 'en',
      }}
    /> */}
      </View>
      <View style={styles.inputGroup}>
        <Text>Distination</Text>
        <TextInput
        style={styles.input}
        placeholder="Location"
        defaultValue={destination}
        onChangeText={handleDestination}/>
      </View>
      <View style={styles.inputGroup}>
        <Text>Time to Pickup</Text>
        <TextInput
        style={styles.input}
        placeholder="Time"
        defaultValue={pickupTime}
        onChangeText={(e)=>setPickupTime(e)}/>
      </View>
      {/* <View style={styles.inputGroup}>
        <Text>Fare: PHP. 20</Text>
      </View> */}
      <View style={styles.mapView}>
        <MapView style={styles.map} provider={PROVIDER_GOOGLE}>
          
        </MapView>
      </View>
      <View style={styles.footer}>
        <Button title="Create" onPress={submit}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    main:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding:10,

    },
    inputGroup:{
      flexDirection:"row",
      justifyContent:"flex-start",
      alignItems:"center"
    },
    input: {
      height: 40,
      margin: 5,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      flex: 1,
    },
    mapView:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      borderWidth:1,
      width:"100%",
      margin:10,
    },
    map: {
      width: "100%",
      height: "100%",
    },
    footer:{
      width:"100%"
    }
})