import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TestScreen from "./screens/TestScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoadingScreen from "./screens/LoadingScreen";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import QuestionScreen from "./screens/QuestionScreen";
import ResultScreen from "./screens/ResultScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import TestsHistoryScreen from "./screens/TestsHistoryScreen";
import DrawerNavigator from "./components/DrawerNavigator";
import { UserContext } from "./contexts/user";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { user } = useContext(UserContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="Main" component={DrawerNavigator} />
          <Stack.Screen name="Test" component={TestScreen} />
          <Stack.Screen name="Question" component={QuestionScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />

          <Stack.Screen name="TestsHistory" component={TestsHistoryScreen} />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPasswordScreen}
          />
        </>
      )}
      <Stack.Screen name="Loading" component={LoadingScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
