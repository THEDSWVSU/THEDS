import { StyleSheet, Text, View, StatusBar, TextInput, Button, Alert, ScrollView } from 'react-native'
import React from 'react'
import useDriver from './useDriver'

export default function DriverRegister({navigation}) {

  const {
    username, handleUsername,
    password, handlePassword,
    motorBrand, handleMotorBrand,
    model, handleModel,
    cc, handleCC,
    plate, handlePlate,
    color, handleColor,
    submit
  } = useDriver(navigation)
    return (
    <ScrollView style={styles.scroll}>
    <View style = {styles.body}>

      <Text style = {styles.title}>DRIVER APPLICATION</Text>

      <View style = {styles.inputGroup}>
        <TextInput style = {styles.input} placeholder = "Username:" defaultValue={username} onChangeText = {handleUsername}></TextInput>
        <TextInput style = {styles.input} placeholder = "Password:" defaultValue={password} onChangeText = {handlePassword}></TextInput>
        <TextInput style = {styles.input} placeholder = "Motorcycle brand:" defaultValue={motorBrand} onChangeText = {handleMotorBrand}></TextInput>
        <TextInput style = {styles.input} placeholder = "Model:" defaultValue={model} onChangeText = {handleModel}></TextInput>
        <TextInput style = {styles.input} placeholder = "Engine cc:" defaultValue={cc} onChangeText = {handleCC}></TextInput>
        <TextInput style = {styles.input} placeholder = "Plate number:" defaultValue={plate} onChangeText = {handlePlate}></TextInput>
        <TextInput style = {styles.input} placeholder = "Color:" defaultValue={color} onChangeText = {handleColor}></TextInput>



        <Button title='submit' onPress={submit}/>




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