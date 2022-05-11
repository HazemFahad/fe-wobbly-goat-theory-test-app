/* TestScreen_my  */

import {
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  View,
  Image,
  ImageBackground,
} from "react-native";
import {
  Picker,
  Layout,
  Text,
  Section,
  Button,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { getNewTest } from "../utils/api";
import { UserContext } from "../contexts/user";

const TestScreen = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { email, password } = user;
  const { isDarkmode } = useTheme();
  
  const handlePressFullTest = () => {
    setLoading(true);

    getNewTest(email, password, 2, []).then((data) => {
      setLoading(false);
      // console.log(data);
      navigation.navigate("Question", { data });
    });
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0887C9",
        }}
      >
        <Image
          source={require("../assets/splash.png")}
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 400,
            width: 400,
          }}
        />
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1, backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,}}>
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
            
          }}
        >
          <Image
          source={require("../assets/icon.png")}
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 200,
            width: 200,
            marginBottom:30,
          }}></Image>
          <Text fontWeight="bold" style={{ textAlign: "center" ,fontSize:22,marginBottom:20,}}>Choose the type of test</Text>
          <Button
            status="info700"
            style={styles.button}
            text="Practice Quiz (10 Questions)"
            onPress={() => navigation.navigate("PracticeSelector")}
            width={350}
          />

          <Button
            style={styles.button}
            text="Mock Theory Test (50 Questions)"
            onPress={handlePressFullTest}
            status="info700"
            width={350}
          />
        </View>
      </ScrollView>
      <View style={{alignItems: "center",marginBottom:30}}>
      <Button
            status="info700"
            style={styles.button}
            text="Return To Home"
            onPress={() => navigation.navigate("Home")}
            width={350}
          />

      </View>

    </KeyboardAvoidingView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  input: {
    fontSize: 22,
    textAlign: "center",
    padding: 10,
  },

  button: {
    margin: 10,
    width: "70%",
  },
});
