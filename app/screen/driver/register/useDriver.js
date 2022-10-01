import React, { useState } from 'react'
import { API_BASE_URL } from '../../../../config'
import axios from 'axios'
import { Alert } from 'react-native'

export default function useDriver(navigation) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [motorBrand, setMotorBrand] = useState("")
    const [model, setModel] = useState("")
    const [cc, setCC] = useState("")
    const [plate, setPlate] = useState("")
    const [color, setColor] = useState("")


    const handleUsername = (input) => {
        setUsername(input)
      }
      const handlePassword = (input) => {
        setPassword(input)
      }
      const handleMotorBrand = (input) => {
        setMotorBrand(input)
      }
      const handleModel = (input) => {
        setModel(input)
      }
      const handleCC = (input) => {
        setCC(input)
      }
      const handlePlate = (input)=>{
        setPlate(input)
      }
      const handleColor = (input) => {
        setColor(input)
      }

      const getUserId = async() => {
        const checkUser = await axios.post(API_BASE_URL+"/account/getId",{
            username, password
        })

        if(checkUser.status === 200){
            console.log(checkUser.data)
            if(checkUser.data.status === "success"){
                return checkUser.data.accountId
            }
            return 0
        }

      }

      const submit = async() => {
       const accountId = await getUserId()
       if(accountId <= 0)Alert.alert("Unable", "The username or password you used may be incorrect.")
       else{
        const registerReq = await axios.post(API_BASE_URL+"/driver/register",{
            accountId,
            motorBrand,
            model,
            cc,
            plate,
            color, 
        })
        if(registerReq.status != 200) Alert.alert("Error", "Something went wrong")
        else if(registerReq.data.status === "success"){
          Alert.alert("Congratulations", "You are now a theds driver")
          navigation.navigate("driver-login")
        }
        else if(registerReq.data.status === "duplicate") Alert.alert("Already a Driver", "Your account is already registered to driver")
        else{
          Alert.alert("Sorry", "Something went wrong")
        }
       }
      }
  return{
    username, handleUsername,
    password, handlePassword,
    motorBrand, handleMotorBrand,
    model, handleModel,
    cc, handleCC,
    plate, handlePlate,
    color, handleColor,
    submit

  }
}