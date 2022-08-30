import { StyleSheet, Text, View, StatusBar, TextInput, Button, Alert, ScrollView } from 'react-native'
import React from 'react'
import useRegister from './useRegister'

export default function Register() {
  const genderSelection = [{
    value: 'Male',
  }, {
    value: 'Female',
    }
];

  const {
    firstname, handleFirstname,
    middlename, handleMiddlename,
    lastname, handleLastname,
    age, handleAge,
    gender, handleGender,
    submit
  } = useRegister()
  return (
    <ScrollView style={styles.scroll}>
    <View style = {styles.body}>

      <Text style = {styles.title}>REGISTER</Text>

      <View style = {styles.inputGroup}>
        <TextInput style = {styles.input} placeholder = "Firstname" defaultValue={firstname} onChangeText={handleFirstname}></TextInput>
        <TextInput style = {styles.input} placeholder = "Middlename" defaultValue={middlename} onChangeText={handleMiddlename}></TextInput>
        <TextInput style = {styles.input} placeholder = "Lastname" defaultValue={lastname} onChangeText={handleLastname}></TextInput>
        <TextInput style = {styles.input} placeholder = "Age" defaultValue={age} onChangeText={handleAge}></TextInput>
        <TextInput style = {styles.input} placeholder = "Birthday" ></TextInput>
        
        <TextInput style = {styles.input} placeholder = "Phone Number"></TextInput>
        <TextInput style = {styles.input} placeholder = "Username"></TextInput>
        <TextInput style = {styles.input} placeholder = "Password"></TextInput>
        <TextInput style = {styles.input} placeholder = "Retype Password"></TextInput>

        <Button title='Lets Go' onPress={submit}/>




        </View>
    </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
    body:{
        paddingTop: StatusBar.currentHeight,
        flex:1,
      justifyContent:"flex-start",
      alignItems:"center",
      padding:10
    },
    scrolls:{
      
    },
    title:{
        fontSize:25,
        marginTop:50,
        height:50
    },
    inputGroup:{
        width:"100%",
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
})