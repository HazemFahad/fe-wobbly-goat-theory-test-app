import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { Button, Text } from "react-native-rapi-ui";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { UserContext } from "../contexts/user";

const ReviewScreen = (props) => {
  const testData = props.route.params.resultsData;
  const { user } = useContext(UserContext);
  const [count, setCount] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    setCorrectAnswer(testData[count].correct_answer);
    setUserAnswer(testData[count].user_answer_number);
  }, [count]);

  const handlePress = () => {
    if (count < testData.length - 1) {
      setCount(count + 1);
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
            console.log(answer_number, "answer_number");
            console.log(correctAnswer, "correct answer");
            console.log(userAnswer, "user answer");

            return (
              <View key={answer_id}>
                {answer_media ? (
                  answer_number === correctAnswer ? (
                    <ImageBackground
                      style={{ height: 100, width: 100 }}
                      source={{
                        uri: `https://theory.sajjel.info/assets/images/${answer_media}`,
                      }}
                    >
                      <Text
                        style={{
                          backgroundColor: "rgba(124,252,0, 0.7)",
                          lineHeight: 100,
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Correct
                      </Text>
                    </ImageBackground>
                  ) : answer_number !== correctAnswer &&
                    answer_number === userAnswer ? (
                    <ImageBackground
                      style={{ height: 100, width: 100 }}
                      source={{
                        uri: `https://theory.sajjel.info/assets/images/${answer_media}`,
                      }}
                    >
                      <Text
                        style={{
                          backgroundColor: "rgba(200,0,0, 0.7)",
                          lineHeight: 600,
                          textAlign: "center",
                        }}
                      >
                        .
                      </Text>
                    </ImageBackground>
                  ) : (
                    <ImageBackground
                      style={{ height: 100, width: 100 }}
                      source={{
                        uri: `https://theory.sajjel.info/assets/images/${answer_media}`,
                      }}
                    ></ImageBackground>
                  )
                ) : answer_number === correctAnswer ? (
                  <>
                    <Button
                      text={answer}
                      status="success700"
                      style={{
                        marginTop: 10,
                      }}
                    />
                  </>
                ) : answer_number !== correctAnswer &&
                  answer_number === userAnswer ? (
                  <Button
                    text={answer}
                    status="danger700"
                    style={{
                      marginTop: 10,
                    }}
                  />
                ) : (
                  <Button
                    text={answer}
                    status="info700"
                    style={{
                      marginTop: 10,
                    }}
                  />
                )}
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
      {count < testData.length - 1 ? (
        <Button status="info700" text="Next" onPress={handlePress} />
      ) : (
        <Button
          text="Return Home"
          status="info700"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ReviewScreen;

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
