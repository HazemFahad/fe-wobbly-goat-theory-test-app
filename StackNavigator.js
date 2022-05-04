import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import TestScreen from "./screens/TestScreen";
import LoginScreen from "./screens/LoginScreen";
import ActionBarImage from "./components/ActionBarImage";
import { useContext } from "react";
import { UserContext } from "./contexts/user";
import ExampleQuestion from "./screens/ExampleQuestion";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}
      drawerPosition="Right"
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home", //Set Header Title
          headerStyle: {
            backgroundColor: "#d8d8d8", //Set Header color
          },
          headerTintColor: "black", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
          headerRight: () => <ActionBarImage />,
        }}
      />
      <Drawer.Screen
        name="Test"
        component={TestScreen}
        options={{
          title: "Test",
          headerStyle: {
            backgroundColor: "#d8d8d8",
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => <ActionBarImage />,
        }}
      />
      <Drawer.Screen
        name="ExampleQuestion"
        component={ExampleQuestion}
        options={{
          title: "ExampleQuestion",
          headerStyle: {
            backgroundColor: "#d8d8d8",
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => <ActionBarImage />,
        }}
      />
    </Drawer.Navigator>
  );
};

const StackNavigator = () => {
  const { user } = useContext(UserContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="Test" component={TestScreen} />
      <Stack.Screen name="ExampleQuestion" component={ExampleQuestion} />
      {user ? <></> : <Stack.Screen name="Login" component={LoginScreen} />}
    </Stack.Navigator>
  );
};

export default StackNavigator;
