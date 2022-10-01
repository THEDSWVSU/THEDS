import {Alert } from 'react-native'
import React, { useState } from 'react'

import { API_BASE_URL } from '../../../config'
import axios from 'axios'
import storage from '../../helder/storage'

export default function useLogin(navigation) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {save} = storage()


    const handleUsername = (input) => {
        setUsername(input)
    }
    const handlePassword = (input) => {
        setPassword(input)
    }

    const submit = async() => {
        const submitReq = await axios.post(API_BASE_URL+"/account/login",{
            username, password
        })
        if(submitReq.status != 200){
            Alert.alert("Try Again", "Something went wrong. Please try again later")
            return 0
        }
        if(submitReq.data.status === "success"){
            save("accountId", ""+submitReq.data.accountId)
            save("userType", "passenger")
            navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "home",
                  },
                ],
              })
            return 0
        }
        Alert.alert("Login Failed", "Username or password is incorrect.")

    }
  return{
    username, handleUsername,
    password,handlePassword,
    submit
  }
}