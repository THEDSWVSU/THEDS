import AsyncStorage from "@react-native-async-storage/async-storage";


export default function storage() {
    async function save(key, value) {
        await AsyncStorage.setItem(key, value)
      }
      
      async function getValueFor(key) {
        let result = await AsyncStorage.getItem(key)
        return result
      }
      return{save, getValueFor}
}
