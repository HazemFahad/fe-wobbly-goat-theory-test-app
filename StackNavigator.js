import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import TestScreen from "./screens/TestScreen";
import LoginScreen from "./screens/LoginScreen";
import { useContext } from "react";
import { UserContext } from "./contexts/user";
import ExampleQuestion from "./screens/ExampleQuestion";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useContext(UserContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Test" component={TestScreen} />
      <Stack.Screen name="ExampleQuestion" component={ExampleQuestion} />
      {user ? <></> : <Stack.Screen name="Login" component={LoginScreen} />}
    </Stack.Navigator>
  );
};

export default StackNavigator;
