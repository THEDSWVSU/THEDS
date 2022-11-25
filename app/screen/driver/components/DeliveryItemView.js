import { StyleSheet, Text, View, TextInput, Button, Dimensions } from 'react-native'
import React, {useState} from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'


export default function DeliveryItemView({route,navigation}) {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")

  const data = route.params.data

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
      <View style={styles.mapView}>
        <MapView style={styles.map} provider={PROVIDER_GOOGLE}>
          
        </MapView>
      </View>
      <View style={styles.footer}>
        <Button title="Accept" onPress={acceptTrip}/>
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