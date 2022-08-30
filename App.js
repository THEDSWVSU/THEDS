import "react-native-gesture-handler";

import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Wellcome from "./app/screen/WellcomeScreen/Wellcome";
import Login from "./app/screen/Login/Login";
import Register from "./app/screen/Register/Register";
import Home from "./app/screen/Home/Home";
import DriverLogin from "./app/screen/driver/login/DriverLogin";
import DriverRegister from "./app/screen/driver/register/DriverRegister";

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="main">
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
        <Stack.Screen name="home" component={Home}
        options={{ headerShown: false }} />
        <Stack.Screen name="driver-login" component={DriverLogin}
        options={{ headerShown: false }} />
        <Stack.Screen name="driver-register" component={DriverRegister} 
        options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

