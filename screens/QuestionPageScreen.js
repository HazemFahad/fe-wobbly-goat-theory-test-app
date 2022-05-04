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

const QuestionPage = (props) => {
  const [answer, setAnswer] = useState("");
  const [count, setCount] = useState(0);

  const navigation = useNavigation();

  // const { setUser } = useContext(UserContext);

  const { email, password } = {
    email: "john.doe@toptal.com",
    password: "toptal123",
  };

  const testData = props.route.params.fullTest.data
    ? props.route.params.fullTest.data
    : props.route.params.quiz.data;

  console.log(testData[count].test_id);

  const onPress = () => {
    if (answer !== "") {
      //Next question -- need to increase count and rerender
      if (count < 50) {
        setCount(count + 1);
      } else {
        //tell to go to results screen
      }
      //store answer and send to server
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

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        style={styles.questionImage}
        source={{
          uri: testData[count].media
            ? `https://theory.sajjel.info/assets/images/${testData[count].media}`
            : "https://www.biography.com/.image/t_share/MTQ3NTI2Nzg2MzYyNjQ4MDQ2/lauryn_hill_photo_by_anthony_barboza_archive_photos_getty_114465492.jpg",
        }}
      />
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
};

export default QuestionPage;

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
