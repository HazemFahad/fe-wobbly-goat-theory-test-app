import { Button, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/user";

const TestScreen = () => {
  const { setUser } = useContext(UserContext);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.input}>TestScreen</Text>
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
