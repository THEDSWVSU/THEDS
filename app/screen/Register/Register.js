import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import useRegister from "./useRegister";
import { Picker } from "@react-native-picker/picker";

export default function Register({navigation}) {
  const {
    firstname,
    handleFirstname,
    middlename,
    handleMiddlename,
    lastname,
    handleLastname,
    age,
    handleAge,
    gender,
    handleGender,
    phone,
    birthday,
    handlePhone,
    username,
    handleUsername,
    password,
    handlePassword,
    retypePassword,
    handleRetypePassword,

    showDatepicker,
    submit,
  } = useRegister(navigation);



  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.body}>
        <Text style={styles.title}>REGISTER</Text>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Firstname"
            defaultValue={firstname}
            onChangeText={handleFirstname}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Middlename"
            defaultValue={middlename}
            onChangeText={handleMiddlename}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Lastname"
            defaultValue={lastname}
            onChangeText={handleLastname}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Age"
            defaultValue={age}
            onChangeText={handleAge}
          ></TextInput>

          <View style={styles.picker}>
            <Picker selectedValue={gender} onValueChange={handleGender}>
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>

          <View style = {styles.datePicker} onTouchEnd = {showDatepicker}>
            <Text>Birthday:</Text>
            <Text>{birthday.toLocaleDateString()}</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            defaultValue={phone}
            onChangeText={handlePhone}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Username"
            defaultValue={username}
            onChangeText={handleUsername}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Password"
            defaultValue={password}
            onChangeText={handlePassword}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Retype Password"
            defaultValue={retypePassword}
            onChangeText={handleRetypePassword}
          ></TextInput>

          <Button title="Lets Go" onPress={submit} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  scrolls: {},
  title: {
    fontSize: 25,
    marginTop: 50,
    height: 50,
  },
  inputGroup: {
    width: "100%",
    justifyContent: "flex-start",
    margin: 10,
  },
  input: {
    height: 50,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  picker: {
    height: 50,
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
  },
  datePicker: {
    height: 50,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
});
