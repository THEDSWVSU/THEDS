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

import { styles } from "./styles.js";
export default function Login(props) {
  return (
    <View style={styles.body}>
      <Image
        source={require("../../assets/philippines-tricycle-clipart-png-transparent.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Login</Text>

      <View style={styles.inputGroup}>
        <TextInput style={styles.input} placeholder="Username:"></TextInput>
        <TextInput style={styles.input} placeholder="Password:"></TextInput>
      </View>
      <View style={styles.buttonGroup}>
        <Button
          style={styles.button}
          title="Let's go"
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
    </View>
  );
}
