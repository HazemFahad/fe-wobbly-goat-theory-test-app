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

const QuestionScreen = (props) => {
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState("");
  const navigation = useNavigation();

  const testData = props.route.params.quiz.data;

  let count = 0;

  const singleQuestion = testData[count];

  const singleAnswer = testData[count].answers;

  console.log(testData[0]);

  let question_id = testData[0];

  useEffect(() => {
    getQuestionByID(question_id)
      .then((data) => {
        setQuestion(data);
      })
      .catch((err) => {
        setErr("Comments not found!");
      });
  }, [count]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.input}>{testData[0].question}</Text>
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

export default QuestionScreen;
