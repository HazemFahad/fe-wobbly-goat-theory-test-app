import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import StackNavigator from "./StackNavigator";
import { ThemeProvider } from "react-native-rapi-ui";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./contexts/user";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <NavigationContainer>
          <UserProvider>
            <StackNavigator />
          </UserProvider>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
