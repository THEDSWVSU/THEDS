import {
    Image,
    StyleSheet,
    Text,
    View,
    Platform,
    StatusBar,
    Alert,
    TextInput,
    Button,
  } from "react-native";
  import React from "react";
    export default function DriverLogin(props) {
    return (
      <View style={styles.body}>
        <Image
          source={require("../../../assets/philippines-tricycle-clipart-png-transparent.png")}
          style={styles.logo}
        />
  
        <Text style={styles.title}>THEDS DRIVER</Text>
  
        <View style={styles.inputGroup}>
          <TextInput style={styles.input} placeholder="Username:"></TextInput>
          <TextInput style={styles.input} placeholder="Password:"></TextInput>
        </View>
        <View style={styles.buttonGroup}>
        <Button
          style={styles.button}
          title="Login"
          onPress={() =>
            props.navigation.reset({
              index: 0,
              routes: [
                {
                  name: "home",
                },
              ],
            })
          }
        />
        
        </View>
        
        <View style={styles.buttonGroup}>
        <View style={styles.info}><Text style={styles.infoText}>Don't have an account yet?</Text></View>
        <Button
          style={styles.button}
          title="Register Here"
          onPress={() =>
            props.navigation.navigate("driver-register")
          }
        />
        
        </View>
        
      </View>
    );
    
  }
export const styles = StyleSheet.create({
  body:{
    flex:1,
    justifyContent:"flex-start",
    alignItems:"center",
    justifyContent:"center"
  },
  logo: {
    width: 200,
    height: 150,
    borderRadius: 20,
  },
  title:{
    fontSize:30,
    fontWeight:"normal",
    marginBottom:20
  },
  inputGroup:{
    width:"90%",
    justifyContent:"flex-start",
    margin:10

  },
  input:{
    height: 50,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius:10
  },
  button:{
    color:"#841584",
    flex:1
  },
  buttonGroup:{
    width:"100%",
    padding:20,
    
  },
  info:{
    alignItems:"center",
    margin:10
  },
  infoText:{
    color:"green"
  }


  });
  

  