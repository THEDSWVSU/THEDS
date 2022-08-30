import React, { useState } from 'react'

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


  const handleFirstname=(input)=>{
    setFirstname(input)
  }
  const handleMiddlename=(input)=>{
    setMiddlename(input)
  }
  const handleLastname=(input)=>{
    setLastname(input)
  }
  const handleGender=(input)=>{
    setGender(input)
  }
  const handleAge=(input)=>{
    setAge(input)
  }
  const handleBirthday =(input)=>{
    setBirthday(input)
  }
  const handlePhone = (input) =>{
    setPhone(input)
  }
  const handleUsername = (input) =>{
    setUsername(input)
  }
  const handlePassword = (input) =>{
    setPassword(input)
  }
  const handleRetypePassword =(input) => {
    setRetypePassword(input)
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
    retypePassword, handleRetypePassword
}
}
