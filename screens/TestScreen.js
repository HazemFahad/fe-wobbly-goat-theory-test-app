/* TestScreen_my  */

import { StyleSheet, Text, KeyboardAvoidingView, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { getNewTest } from "../utils/api";
import { UserContext } from "../contexts/user";

const TestScreen = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const { email, password } = user;

  const handlePressFullTest = () => {
    getNewTest(email, password, 2, []).then((data) => {
      navigation.navigate("Question", { data });
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* <Text>TestSelectorScreen</Text> */}

      <Button
        style={styles.input}
        title="New Practice Quiz"
        onPress={() => navigation.navigate("PracticeSelector")}
      />
      <Button
        style={styles.input}
        title="Full Theory test"
        onPress={handlePressFullTest}
      />
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
});
