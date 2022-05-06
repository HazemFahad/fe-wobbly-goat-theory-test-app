import {
  Button,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { RadioButton } from "react-native-rapi-ui";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { sendAnswer, getResults } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/user";

const QuestionScreen = (props) => {
  const { user } = useContext(UserContext);
  const [answer, setAnswer] = useState("");

  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const { email, password } = user;

  const testData = props.route.params.data.data;

  const onPress = () => {
    if (answer !== "") {
      if (count < testData.length - 1) {
        setCount(count + 1);
      } else {
        getResults(email, password, testData[count].test_id).then((data) => {
          console.log(
            data.data.map((q) => {
              return [q.is_correct, q.correct_answer, q.user_answer_number];
            })
          );
          console.log(testData[count].test_id);
        });
      }
      console.log(answer === testData[count].correct_answer);
      console.log(answer, " <--- answer");
      console.log(testData[count].correct_answer, " <--- correct answer");

      sendAnswer(
        testData[count].test_questions_id,
        email,
        password,
        answer
      ).then((data) => {});
      setAnswer("");
    } else {
      alert("You have to choose an option");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {testData[count].media ? (
        <Image
          style={styles.questionImage}
          source={{
            uri: `https://theory.sajjel.info/assets/images/${testData[count].media}`,
          }}
        />
      ) : (
        <></>
      )}

      <Text>{testData[count].question}</Text>

      <View style={styles.answerContainer}>
        {testData[count].answers.map(
          ({ answer, answer_id, answer_number, answer_media }) => {
            return (
              <View key={answer_id}>
                <TouchableOpacity
                  style={styles.answer}
                  onPress={() => {
                    setAnswer(answer_number);
                  }}
                >
                  {answer_media ? (
                    <Image
                      style={{ height: 100, width: 200 }}
                      source={{
                        uri: `https://theory.sajjel.info/assets/images/${answer_media}`,
                      }}
                    />
                  ) : (
                    <Text>{answer}</Text>
                  )}
                </TouchableOpacity>
              </View>
            );
          }
        )}
      </View>
      <View>
        <Text>
          Question Number: {count + 1} of {testData.length}
        </Text>
      </View>

      <Button title="Next Question" onPress={onPress} />
    </KeyboardAvoidingView>
  );
};

export default QuestionScreen;

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

  questionImage: {
    height: "50%",
    width: "100%",
  },
});
