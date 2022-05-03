import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import TestScreen from "./screens/TestScreen";
import LoginScreen from "./screens/LoginScreen";
import { useContext } from "react";
import { UserContext } from "./contexts/user";
import ExampleQuestion from "./screens/ExampleQuestion";
import TestSelector from "./screens/TestOrQuizScreen";
import PracticeSelector from "./screens/ChooseCategoryScreen";
import PrePracticeSelector from "./screens/StartCategoryQuizScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useContext(UserContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Test" component={TestScreen} />
      <Stack.Screen name="ExampleQuestion" component={ExampleQuestion} />
      <Stack.Screen name="TestSelector" component={TestSelector} />
      <Stack.Screen name="PracticeSelector" component={PracticeSelector} />
      <Stack.Screen
        name="PrePracticeSelector"
        component={PrePracticeSelector}
      />

      {user ? <></> : <Stack.Screen name="Login" component={LoginScreen} />}
    </Stack.Navigator>
  );
};

export default StackNavigator;
