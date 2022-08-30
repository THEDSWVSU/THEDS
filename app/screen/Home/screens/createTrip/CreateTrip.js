import { StyleSheet, Text, View, TextInput, Button, Dimensions } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import { MAP_KEY } from '../../../../../mapskey'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

export default function CreateTrip() {
  return (
    <View style={styles.main}>
      <View style={styles.inputGroup}>
        <Text>Distination</Text>
        <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: MAP_KEY,
        language: 'en',
      }}
    />
      </View>
      <View style={styles.inputGroup}>
        <Text>Fare: PHP. 20</Text>
      </View>
      <View style={styles.mapView}>
        <MapView style={styles.map} provider={PROVIDER_GOOGLE}>
          
        </MapView>
      </View>
      <View style={styles.footer}>
        <Button title="Create" onPress={()=>navigation.navigate('new-trip')}/>
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