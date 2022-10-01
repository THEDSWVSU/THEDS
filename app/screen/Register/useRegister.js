import React, { useState } from 'react'
import axios from 'axios'
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Alert } from 'react-native';

import { API_BASE_URL } from '../../../config';

export default function useRegister(navigation) {
  const [firstname, setFirstname] = useState("")
  const [middlename, setMiddlename] = useState("")
  const [lastname, setLastname] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("Male")
  const [birthday, setBirthday] = useState(new Date());
  const [phone, setPhone] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [retypePassword, setRetypePassword] = useState("")


  const handleFirstname = (input) => {
    setFirstname(input)
  }
  const handleMiddlename = (input) => {
    setMiddlename(input)
  }
  const handleLastname = (input) => {
    setLastname(input)
  }
  const handleGender = (value, index) => {
    setGender(value)
  }
  const handleAge = (input) => {
    setAge(input)
  }
  const handleBirthday = (event, selectedDate) => {
    const currentDate = selectedDate;
    setBirthday(currentDate)
  }
  const handlePhone = (input) => {
    setPhone(input)
  }
  const handleUsername = (input) => {
    setUsername(input)
  }
  const handlePassword = (input) => {
    setPassword(input)
  }
  const handleRetypePassword = (input) => {
    setRetypePassword(input)
  }

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: birthday,
      onChange:handleBirthday,
      mode: currentMode,
      is24Hour: false,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const submit = async() => {
    if(password != retypePassword){
      Alert.alert("Password Error", "Your password does not match.")
      return 0
    }
      const registerRequest = await axios.post(API_BASE_URL + "/account/register", {
        firstname,
        middlename,
        lastname,
        age,
        gender,
        birthday,
        phone,
        username,
        password
      })
      if(registerRequest.status != 200){
        Alert.alert("Try again", "Sorry something went wrong")
        return 0
      }
      if(registerRequest.data.status === "success"){
        Alert.alert("Success", "You have been successfully registered")
        navigation.navigate("main")
        return 0
      }
    }

  return {
    firstname, handleFirstname,
    middlename, handleMiddlename,
    lastname, handleLastname,
    gender, handleGender,
    age, handleAge,
    birthday, handleBirthday,
    username, handleUsername,
    phone, handlePhone,
    password, handlePassword,
    retypePassword, handleRetypePassword,

    showDatepicker,
    submit
  }
}
