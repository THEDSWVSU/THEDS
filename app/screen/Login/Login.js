import {
  Image,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";
import React from "react";

import { styles } from "./styles.js";
import useLogin from "./useLogin.js";
export default function Login({navigation}) {

  const {username, handleUsername,password, handlePassword, submit} = useLogin(navigation)
  return (
    <View style={styles.body}>
      <Image
        source={require("../../assets/philippines-tricycle-clipart-png-transparent.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputGroup}>
        <TextInput style={styles.input} placeholder="Username:" defaultValue={username} onChangeText = {handleUsername}></TextInput>
        <TextInput style={styles.input} placeholder="Password:" defaultValue= {password} onChangeText = {handlePassword}></TextInput>
      </View>
      <View style={styles.buttonGroup}>
        <Button
          style={styles.button}
          title="Let's go"
          onPress={submit}
        />
      
        </View>
    </View>
  );
}
