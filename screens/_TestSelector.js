import { StyleSheet, Text, KeyboardAvoidingView, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { getNewTest } from "../utils/api";
import { UserContext } from "../contexts/user";

const TestSelector = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [fullTest, setFullTest] = useState([]);

  const { email, password } = user;

  useEffect(() => {
    getNewTest(email, password, 2, [])
      .then((data) => {
        setFullTest(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email,password]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {fullTest.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>TestSelectorScreen</Text>

          <Button
            style={styles.input}
            title="New Practice Quiz"
            onPress={() => navigation.navigate("PracticeSelector")}
          />
          <Button
            style={styles.input}
            title="Full Theory test"
            onPress={() => navigation.navigate("QuestionPage", { fullTest })}
          />
        </>
      )}
    </KeyboardAvoidingView>
  );
};

export default TestSelector;

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
