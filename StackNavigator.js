import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import TestScreen from './screens/TestScreen'
import LoginScreen from './screens/LoginScreen'
import { useContext } from 'react'
import { UserContext } from './contexts/user'
import ExampleQuestion from './screens/ExampleQuestion'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Stack = createNativeStackNavigator()

const Drawer = createDrawerNavigator()

const StackNavigator = () => {
  const { user } = useContext(UserContext)

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Test" component={TestScreen} />
      <Drawer.Screen name="ExampleQuestion" component={ExampleQuestion} />
      {user ? <></> : <Drawer.Screen name="Login" component={LoginScreen} />}
    </Drawer.Navigator>
  )
}

export default StackNavigator
