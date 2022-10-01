import * as SecureStore from 'expo-secure-store'


export default function storage() {
    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
      }
      
      async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        return result
      }
      return{save, getValueFor}
}
