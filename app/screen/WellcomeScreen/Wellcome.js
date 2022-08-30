import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
} from "react-native";

import { styles } from "./style.js";
import useLogin from "./useWellcome.js";

function Wellcome(props) {
  const { login, register } = useLogin(props);
  return (
    <View style={styles.body}>
    
        <Image source={require("../../assets/philippines-tricycle-clipart-png-transparent.png")} style={styles.logo} />
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>WELLCOME</Text>
        </View>
        
        <View style={styles.button} onTouchStart={login}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </View>
        <View style={styles.button} onTouchStart={register}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </View>
        <Text style={styles.info}>Are you a driver?</Text>
        <View style={styles.button} onTouchStart={()=>props.navigation.navigate('driver-login')}>
          <Text style={styles.buttonText}>DRIVER PORTAL</Text>
        </View>
        
    </View>
  );
}
export default Wellcome;
