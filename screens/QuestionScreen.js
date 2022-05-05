import {
  Button,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { sendAnswer } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/user";

const QuestionScreen = (props) => {
  const { user } = useContext(UserContext);
  const [answer, setAnswer] = useState("");
  const [count, setCount] = useState(0);
  const [quiz, setQuiz] = useState({});
  const navigation = useNavigation();
  const { email, password } = {user};

  const questions = props.route.params.questions;
  //console.log(quiz);
  console.log('5');

  const onPress = () => {
    if (answer !== "") {
      //Next question -- need to increase count and rerender
      if (count < 50) {
        setCount(count + 1);
      } else {
        //tell to go to results screen
      }
      //store answer and send to server
      sendAnswer(quiz?.test_id, email, password, answer).then(
        (data) => {
          console.log(data);
        }
      );
      setAnswer("");
    } else {
      alert("You have to choose an option");
    }
  };
  useEffect(async () => {
    console.log("QuestionScreen mount.");
    setQuiz(props.route.params.questions);
    console.log(quiz);
    return () => {
      console.log("QuestionScreen unmount.");
    };
  }, []);
  //conditional logic 2 x return blocks - one for image 1 without

  //3 end because they type question where u have to pick image

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/*
      {quiz?.media?
      <Image
        style={styles.questionImage}
        source={{
          uri: `../assets/images/${quiz?.media}`
        }}
      />:""}
      <Text>{quiz?.question}jj</Text>
      <View style={styles.answerContainer}>
        {quiz?.answers ? (
          quiz?.answers.map(({ answer, answer_id }) => {
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
      <View>
        <Text>
          Question Number: {count + 1} of {questions.length}
        </Text>
      </View>

      <Button title="Next Question" onPress={onPress} />
      */}
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
