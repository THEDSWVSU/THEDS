import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../../config";



export default function TripItem({ data, type, action }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const fetchData = await axios.post(
        API_BASE_URL + "/passenger/getTripDetails/" + data.type,
        { tripId: data.service_id, driver: data.driver }
      );
      const tripData = fetchData.data;
      console.log("tripData", tripData);
      setDetails(tripData);
    };
    if (type === "notification") fetchDetails();
  }, [data]);
  if (type === "notification") {
    if (details){
      return (
        <View style={styles.main}>
          <View style={styles.col}>
            <Text style={styles.title}>Booking Accepted </Text>
              <Text style={styles.contentText}>
                Your {data.type} booking for {details.origin} to {details.destination} has been acccepted by Rider :
              </Text> 
              <Text style = {styles.contentBold}>{details.firstname + " " + details.middlename + " " + details.lastname}</Text>

            <Text style={styles.date}>{details.date_time}</Text>
          </View>
        </View>
      );
    }
    else return "";
  }
  if(type === "hailing"){
    return(
      <View style={styles.main}>
        <View style={styles.row}>
          <Text style={styles.title}>
            {data.origin} to {data.destination}
          </Text>
          <Text style={styles.date}>Pickup: {data.pickup_time}</Text>
        </View>
        <View style={styles.row}>
          <Button title="Cancel" onPress={()=>action(data)} />
        </View>
      </View>
    )
  }
  return (
    <View style={styles.main}>
      <View style={styles.row}>
        <Text style={styles.title}>
          {data.origin} to {data.destination}
        </Text>
        <Text style={styles.subtitle}>Package: {data.pakage}</Text>
        <Text style={styles.date}>Pickup: {data.pickup_time}</Text>
      </View>
      <View style={styles.row}>
          <Button title="Cancel" onPress={()=>action(data)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 10,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#BDBDBD",
    borderWidth: 1,
    width: "100%",
    marginBottom: 5,
    flexDirection: "row",
  },
  
  title: {
    fontWeight: "bold",
  },

  content: {
    flex:0,
    flexWrap:"wrap",
    flexDirection:'row',
    justifyContent:"flex-start",
    alignItems:"flex-start"

  },
  contentBold:{
    fontWeight:"bold"

  },
  contentText:{
  flex:1,
  flexWrap:'wrap',
  width:"auto"
  },
  date: {
    fontSize: 12,
    color: "#757575",
  },
  col: {
    width:"100%"
  },

});
