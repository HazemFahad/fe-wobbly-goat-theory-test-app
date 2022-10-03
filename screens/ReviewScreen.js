import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Text, themeColor, useTheme } from "react-native-rapi-ui";
import { images } from "../assets/assets";

const ReviewScreen = (props) => {
  const testData = props.route.params.resultsData;
  const [count, setCount] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState(0);
  const { isDarkmode } = useTheme();
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
    <SafeAreaView
      style={{
        ustifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
      }}
      behavior="padding"
    >
      <View style={{ flex: 1 }}>
        <ScrollView style={{ marginTop: 40 }}>
          {testData[count].media ? (
            <Image
              style={styles.questionImage}
              source={images[testData[count].media]}
            />
          ) : (
            <></>
          )}

          <Text style={{ fontSize: 20, padding: 15 }}>
            {testData[count].question}
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            {testData[count].answers.map(
              ({ answer, answer_id, answer_number, answer_media }) => {
                return (
                  <React.Fragment key={answer_id}>
                    {answer_media ? (
                      <TouchableOpacity style={{ width: "50%", padding: 10 }}>
                        <Image
                          style={
                            answer_number === correctAnswer
                              ? styles.answerImgCorrect
                              : answer_number !== correctAnswer &&
                                answer_number === userAnswer
                              ? styles.answerImgIncorrect
                              : styles.answerImg
                          }
                          source={images[answer_media]}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    ) : (
                      <Button
                        text={answer}
                        width={350}
                        status={
                          answer_number === correctAnswer
                            ? "success700"
                            : answer_number !== correctAnswer &&
                              answer_number === userAnswer
                            ? "danger700"
                            : "info700"
                        }
                        style={{
                          margin: 3,
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              }
            )}
          </View>
        </ScrollView>
      </View>
      <View>
        <View style={{ marginBottom: 6 }}>
          <Button
            status="info700"
            width={350}
            text="Next"
            onPress={handlePress}
          />
        </View>
        <Button
          text="Return Home"
          status="info700"
          width={350}
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
        <View>
          <Text style={{ textAlign: "center", margin: 10 }}>
            Question Number: {count + 1} of {testData.length}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  questionImage: {
    height: 230,
    width: "100%",
    resizeMode: "contain",
    justifyContent: "center",
    // flex: 2,
  },
  answerImg: {
    height: undefined,
    aspectRatio: 1,
    width: "100%",
  },
  answerImgCorrect: {
    height: undefined,
    aspectRatio: 1,
    width: "100%",
    borderColor: "#33A838",
    borderWidth: 7,
  },
  answerImgIncorrect: {
    height: undefined,
    aspectRatio: 1,
    width: "100%",
    borderColor: themeColor.danger,
    borderWidth: 7,
  },
});
