import React, { useState } from 'react'
import axios from 'axios'

const base_url = "http://192.168.254.114:4000"
export default function useRegister() {
  const [firstname, setFirstname] = useState("")
  const [middlename, setMiddlename] = useState("")
  const [lastname, setLastname] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [birthday, setBirthday] = useState("")
  const [phone, setPhone] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [retypePassword, setRetypePassword] = ("")


  const handleFirstname = (input) => {
    console.log(input)
    setFirstname(input)
  }
  const handleMiddlename = (input) => {
    setMiddlename(input)
    console.log(input)
  }
  const handleLastname = (input) => {
    setLastname(input)
    console.log(input)
  }
  const handleGender = (input) => {
    setGender(input)
  }
  const handleAge = (input) => {
    setAge(input)
  }
  const handleBirthday = (input) => {
    setBirthday(input)
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

  const submit = async() => {
    console.log("Submiting")
    const registerRequest = await axios.post(base_url + "/passenger/register", {
      firstname,
      middlename,
      lastname
    })

    console.log(registerRequest.headers)

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
    submit
  }
}
