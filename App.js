import React from "react";
import StackNavigator from "./StackNavigator";
import { ThemeProvider } from "react-native-rapi-ui";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./contexts/user";

export default function App() {


  return (
    <ThemeProvider>
      <NavigationContainer>
        <UserProvider>
          <StackNavigator />
        </UserProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
