import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import auth from "../utils/auth";
import { UserContext } from "../contexts/user";

const ForgetPasswordScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const { isDarkmode } = useTheme();

  const { email, password } = { user };

  const handleChange = async () => {
    setLoading(true);
    try {
      let { success, data } = await auth.changePassword(
        email,
        password,
        passwordNew,
        passwordConfirm
      );
      if (success) {
        let userData = { ...user };
        userData.password = passwordNew;
        await AsyncStorage.setItem("userAuth", JSON.stringify(userData));
        setUser(userData);

        alert("Your password has been changed successfully! ");
      } else {
        let mssg = "";
        for (const msg in data) {
          mssg = data[msg];
        }
        alert(mssg);
      }
      setLoading(false);
    } catch (error) {
      //let errorCode = error.code;
      let errorMessage = error.message;
      setLoading(false);
      alert(errorMessage);
    }
  };
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
              source={require("../assets/login.png")}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
              size="h3"
            >
              Change password
            </Text>
            <Text>New password</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your password"
              value={passwordNew}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPasswordNew(text)}
            />

            <Text style={{ marginTop: 15 }}>Password</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your password"
              value={passwordConfirm}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPasswordConfirm(text)}
            />
            <Button
              status="info700"
              text={loading ? "Loading" : "Continue"}
              onPress={handleChange}
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />



          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default ForgetPasswordScreen;
