import { useContext } from "react";
import { Image, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme, themeColor } from "react-native-rapi-ui";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import ActionBarImage from "./ActionBarImage";
import TestScreen from "../screens/TestScreen";//TestOrQuizScreen // TestSelecor
import HomeScreen from "../screens/HomeScreen";
import { UserContext } from "../contexts/user";
import TestsHistoryScreen from "../screens/TestsHistoryScreen";
import FindCentersScreen from "../screens/FindCentersScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { isDarkmode, setTheme } = useTheme();
  const { user,setUser } = useContext(UserContext);

  const handleSignOut = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) {}
  }


  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "right",
        headerStyle: { backgroundColor: "red" },
      }}
      drawerPosition="Right"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <View
              style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
            >
              <Image
                source={require("../assets/avatar.png")}
                style={{ width: 70, height: 70, borderRadius: 35 }}
              />
              <Text
                style={{
                  fontSize: 25,
                  margin: 10,
                  alignItems: "center",
                  alignContent: "space-between",
                }}
              >
                {user.name}
              </Text>
            </View>
            <DrawerItemList {...props} />

            <DrawerItem
              label={isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
              icon={(focused, color, size) => {
                <Icon name="g-translate" size={size} color={color} />;
              }}
              onPress={() => {
                if (isDarkmode) {
                  setTheme("light");
                } else {
                  setTheme("dark");
                }
              }}
            />
            <DrawerItem
              label="🚪 Logout"
              icon={(focused, color, size) => {
                <Ionicons name="md-checkmark-circle" size={32} color="green" />;
              }}
              onPress={handleSignOut}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        icon={(focused, color, size) => {
          <Icon name="rowing" size={size} color={color} />;
        }}
        options={{
          title: "🏠 Home", //Set Header Title
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
        icon={<Ionicons name="md-checkmark-circle" size={32} color="green" />}
        options={{
          title: "⁉️ Start new test",
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
        name="TestHistory"
        component={TestsHistoryScreen}
        options={{
          title: "📜 Test History",
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
        name="find"
        component={FindCentersScreen}
        options={{
          title: "🔍 Find center",
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
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          title: "🔑 Change Password",
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

export default DrawerNavigator;
