import { StyleSheet, StatusBar} from "react-native";

export const styles = StyleSheet.create({
  body:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    padding:10
    
  },
    background: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    backdrop:{
      position:"absolute",
      backgroundColor:"black",
      top:0,
      left:0,
      width:"100%",
      height:"100%",
    },
    titleContainer: {
      width: "100%",
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
    },
    title: {
      fontSize: 30,
    },
    buttonText: {
    },
    register: {
      width: "100%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginBottom: 5,
    },
    button: {
      width: "100%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginBottom: 5,
      borderWidth:1
    },
  info:{
    color:"#388E3C",
    margin:10
  },
    logo: {
      width: 200,
      height: 150,
      borderRadius: 20,
    },
    logoContainer: {
      width: 250,
      height: 200,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  
