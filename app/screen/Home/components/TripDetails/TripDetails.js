
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
export default TripDetails = () => {

    return (
        <View style={styles.main}>
         
    
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
      
    });