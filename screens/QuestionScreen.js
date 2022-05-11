import {
  Button,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { RadioButton } from "react-native-rapi-ui";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { sendAnswer, getResults } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/user";
import { CountDown } from "react-native-countdown-component";

const QuestionScreen = (props) => {
  const { user } = useContext(UserContext);
  const [answer, setAnswer] = useState("");
  const [totalResult, setTotalResult] = useState(0);

  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const { email, password } = user;

  const testData = props.route.params.data.data;
  let testId = testData[0].test_id;

  const handleFinish = () => {
    Alert.alert("Your time has ran out");
    getResults(email, password, testData[count].test_id).then((data) => {
      // console.log(data);
      navigation.navigate("Result", { data });
    });
  };

  const handlePress = () => {
    console.log(count);
    if (answer !== "") {
      if (count < testData.length - 1) {
        setCount(count + 1);
      } else {
        getResults(email, password, testData[count].test_id).then((data) => {
          navigation.navigate("Result", { email, password, testId });
        });
      }
      sendAnswer(
        testData[count].test_questions_id,
        email,
        password,
        answer
      ).then((data) => {
        console.log(data.data, "datatime");
        if (data.data === 1) {
          setTotalResult(totalResult + 1);
          console.log(totalResult, "resultytime");
        }
      });
      setAnswer("");
    } else {
      alert("You have to choose an option");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {testData.length === 50 ? (
        <View style={{ padding: 50 }}>
          <CountDown
            size={30}
            until={3420}
            onFinish={handleFinish}
            showSeparator
            timeToShow={["M", "S"]}
            digitStyle={{
              backgroundColor: "transparent",
              borderWidth: 2,
              borderColor: "transparent",
            }}
          />
        </View>
      ) : (
        <></>
      )}
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
      {count < 49 ? (
        <Button title="Next Question" onPress={handlePress} />
      ) : (
        <Button title="RESULTS" onPress={handlePress} />
      )}
      {/* <Button title="Next Question" onPress={onPress} /> */}
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
