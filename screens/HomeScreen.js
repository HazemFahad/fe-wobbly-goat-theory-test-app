import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { UserContext } from "../contexts/user";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.input}>Welcome</Text>
      <Button
        style={styles.input}
        title="TestLink"
        onPress={() => navigation.navigate("Test")}
      />
    </KeyboardAvoidingView>
  );
};

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
});

export default HomeScreen;
