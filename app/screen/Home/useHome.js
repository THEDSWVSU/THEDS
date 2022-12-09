import { useEffect, useState } from "react"
import storage from "../../helder/storage"


export default function useHome(navigation) {

    const {save} = storage()
    const {getValueFor} = storage()

    useEffect(()=>{
        async function readUser(){
            const accountId = await getValueFor("accountId")
            console.log(accountId)
        }
        readUser()
    },[])

    const logout = async() => {
        await save("accountId", "")
        navigation.reset({
            index:0,
            routes:[
              {name:"main"}
            ]
          })
    }
  return {logout}
}