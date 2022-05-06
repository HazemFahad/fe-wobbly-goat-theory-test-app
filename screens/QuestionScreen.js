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
import { sendAnswer } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/user";

const QuestionScreen = (props) => {
  const { user } = useContext(UserContext);
  const [answer, setAnswer] = useState("");

  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const { email, password } = user;

  const testData = props.route.params.data.data;
  // ? props.route.params.data.data
  // : console.log(props);

  const onPress = () => {
    if (answer !== "") {
      if (count < 50) {
        setCount(count + 1);
      } else {
        //tell to go to results screen
      }
      sendAnswer(testData[count].test_id, email, password, answer).then(
        (data) => {
          console.log(data);
        }
      );
      setAnswer("");
    } else {
      alert("You have to choose an option");
    }
  };
  //conditional logic 2 x return blocks - one for image 1 without

  //3 end because they type question where u have to pick image

  if (testData[count].media !== "") {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          style={styles.questionImage}
          source={{
            uri: `https://theory.sajjel.info/assets/images/${testData[count].media}`,
          }}
        />
        <Text>{testData[count].question}</Text>
        <View style={styles.answerContainer}>
          {testData[count].answers ? (
            testData[count].answers.map(
              ({ answer, answer_id, answer_media }) => {
                console.log(answer_media);
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
              }
            )
          ) : (
            <Text>LOADING...</Text>
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
  } else {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text>{testData[count].question}</Text>
        <View style={styles.answerContainer}>
          {testData[count].answers ? (
            testData[count].answers.map(({ answer, answer_id }) => {
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
            Question Number: {count + 1} of {testData.length}
          </Text>
        </View>

        <Button title="Next Question" onPress={onPress} />
      </KeyboardAvoidingView>
    );
  }
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
