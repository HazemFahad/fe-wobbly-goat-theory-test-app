import React,{ useContext }  from "react";
import { Button, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { UserContext } from "../contexts/user";
import { useNavigation } from "@react-navigation/native";

const TestScreen = () => {
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.input}>TestScreen</Text>
      <Button
        style={styles.input}
        title="Example Question"
        onPress={() => navigation.navigate("Question")}
      />
      <Button
        style={styles.input}
        title="Log Out"
        onPress={() => {
          setUser(null);
        }}
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

export default TestScreen;
