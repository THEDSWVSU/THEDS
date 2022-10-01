import "react-native-gesture-handler";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Wellcome from "./app/screen/WellcomeScreen/Wellcome";
import Login from "./app/screen/Login/Login";
import Register from "./app/screen/Register/Register";
import Home from "./app/screen/Home/Home";
import DriverLogin from "./app/screen/driver/login/DriverLogin";
import DriverRegister from "./app/screen/driver/register/DriverRegister";
import { useEffect, useState } from "react";
import storage from "./app/helder/storage";
import DriverHome from "./app/screen/driver/home/DriverHome";

export default function App() {
  const { getValueFor } = storage();
  const [initialRoute, setInitialRoute] = useState("");

  useEffect(() => {
    async function getUser() {
      const accountId = await getValueFor("accountId");
      const userType = await getValueFor("userType")
      if (accountId){
        if(userType === "passenger")setInitialRoute("home");
        else if(userType === "driver")  setInitialRoute("driver-home");
        else setInitialRoute("main")
      } 
      else setInitialRoute("main");
      console.log(accountId);
    }
    getUser();
  }, []);

  if (!initialRoute)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="main"
          component={Wellcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="driver-home"
          component={DriverHome}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="driver-login"
          component={DriverLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="driver-register"
          component={DriverRegister}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
