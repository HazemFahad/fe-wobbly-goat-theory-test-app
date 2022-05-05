import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/user";
import { getNewTest } from "../utils/api";

const PrePracticeSelector = (props) => {
  const navigation = useNavigation();
  const [quiz, setQuiz] = useState([]);

  const { email, password } = {
    email: "john.doe@toptal.com",
    password: "toptal123",
  };

  const categoryArr = props.route.params.selectedItems;

  useEffect(() => {
    getNewTest(email, password, 1, categoryArr)
      .then((data) => {
        setQuiz(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(categoryArr);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>PracticeSelectorScreen</Text>
      <Button
        style={styles.input}
        title="Start Practice Test"
        onPress={() => navigation.navigate("QuestionPage", { quiz })}
      />
    </KeyboardAvoidingView>
  );
};

export default PrePracticeSelector;

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

  selector: {
    width: "100%",
  },
});
