import {
  Button,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getQuestionByID } from "../utils/api";
import { useNavigation } from "@react-navigation/native";

const ExampleQuestion = () => {
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState("");
  const navigation = useNavigation();

  let question_id = Math.floor(Math.random() * 500);

  useEffect(() => {
    getQuestionByID(question_id)
      .then((data) => {
        setQuestion(data);
      })
      .catch((err) => {
        setErr("Comments not found!");
      });
  }, []);

  const answers = question.answers;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.input}>{question.question}</Text>
      <View style={styles.answerContainer}>
        {answers ? (
          answers.map(({ answer, answer_id }) => {
            return (
              <View key={answer_id}>
                <TouchableOpacity
                  style={styles.answer}
                  onPress={() => {
                    setAnswer(answer_id);
                  }}
                >
                  <Text>{answer}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text>LOADING...</Text>
        )}
      </View>

      <Button
        style={styles.input}
        title="Back"
        onPress={() => {
          console.log(answer);
          navigation.navigate("Test");
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

export default ExampleQuestion;
