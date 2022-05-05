import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TestScreen from "./screens/TestScreen";//TestOrQuizScreen TestSelector
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoadingScreen from "./screens/LoadingScreen";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
//import QuestionScreen from "./screens/QuestionScreen";
import ResultScreen from "./screens/ResultScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import TestsHistoryScreen from "./screens/TestsHistoryScreen";
import DrawerNavigator from "./components/DrawerNavigator";
import { UserContext } from "./contexts/user";

import ExampleQuestion from "./screens/ExampleQuestion";
import PracticeSelector from "./screens/ChooseCategoryScreen";
import PrePracticeSelector from "./screens/StartCategoryQuizScreen";
import QuestionPage from "./screens/QuestionPageScreen";

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
          {/*
          <Stack.Screen name="Test" component={TestScreen} />
          <Stack.Screen name="Question" component={QuestionScreen} />
          */}

          <Stack.Screen name="Result" component={ResultScreen} />

          <Stack.Screen name="TestsHistory" component={TestsHistoryScreen} />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
                <Stack.Screen name="ExampleQuestion" component={ExampleQuestion} />
      <Stack.Screen name="Test" component={TestScreen} />
      <Stack.Screen name="PracticeSelector" component={PracticeSelector} />
      <Stack.Screen
        name="PrePracticeSelector"
        component={PrePracticeSelector}
      />
      <Stack.Screen name="QuestionPage" component={QuestionPage} />


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
