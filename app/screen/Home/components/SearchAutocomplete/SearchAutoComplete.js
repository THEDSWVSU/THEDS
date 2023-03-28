import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'

export default function SearchAutoComplete({list, setSelected}) {
    const [inputValue, setinputValue] = useState("")
    const [result, setResult] = useState([])
    const [typed, setTyped] = useState(false)


    useEffect(()=>{
        if(inputValue.length>1 && typed){
            search()
        }else {
            setResult([])
        }
    },[inputValue])
    const search = ()=>{
        const filtered = list.filter((data, index)=>{
            let trimedValue = data.name.slice(0, inputValue.length)
            let toSearch = inputValue
            trimedValue = trimedValue.toLowerCase()
            toSearch = toSearch.toLocaleLowerCase()
            if(trimedValue === toSearch){
                return data
            }
        })
        setResult(filtered)
    }
    const selectItem = (data)=>{
        setSelected(data)
        setinputValue(data.name)
        setResult([])
        setTyped(false)


    }
  return (
    <View style = {styles.searchAutoComplete}>
      <TextInput defaultValue={inputValue} onChangeText = {(e)=>{
        setTyped(true)
        setinputValue(e)
      }} style = {styles.searchInput}/>
      {result.length?(
        <ScrollView style = {styles.searchResultWrapper}>

        <View style = {styles.searchResultContainer}>
    
            {result.map((data, idx)=>(
                <TouchableOpacity key={idx} onPress = {()=>selectItem(data)}><Text  style = {styles.searchResultItem}>{data.name}</Text></TouchableOpacity>
            ))}

        </View>
        </ScrollView>
      ):""}

    </View>
  )
}

const styles = StyleSheet.create({
    searchAutoComplete:{
        width:'100%'
    },
    searchInput:{
        backgroundColor:'white',
        height:50,
        padding:10,
        borderRadius:5,
        
    },
    searchResultWrapper:{
        height:200,
        width:'100%',
        position:'absolute',
        top:50,
        bottom:0,
        zIndex:5,
        backgroundColor:'white'
    },
    searchResultContainer:{
        flex:1

    },
    searchResultItem:{
        padding:10,
        backgroundColor:'white',
        borderTopWidth:1,
        borderColor:'#cacbcc'

    }
})