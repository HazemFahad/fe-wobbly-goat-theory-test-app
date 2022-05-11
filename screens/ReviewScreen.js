import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Image,
  ImageBackground,
  SafeAreaView, ScrollView
} from "react-native";
import { Button, Text, useTheme } from "react-native-rapi-ui";
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
    <SafeAreaView style={{
      ustifyContent: "center",
      alignItems: "center",
      flex: 1, backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
    }} behavior="padding">
      <View style={{ flex: 1, }}>

        <ScrollView style={{ marginTop: 40, }}>
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

          <Text style={{ fontSize: 20, padding: 15, }}>{testData[count].question}</Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: "center", alignContent: "center", marginLeft: 30, marginTop: 30, }}>
            {testData[count].answers.map(
              ({ answer, answer_id, answer_number, answer_media }) => {

                return (
                  <View key={answer_id}>
                    {answer_media ? (
                      answer_number === correctAnswer ? (
                        <Image
                          style={{
                            height: 150,
                            width: 150,
                            resizeMode: "contain",
                            margin: 20,
                            paddingTop: 10,
                            borderColor: "#33A838",
                            borderWidth: 7,
                          }}
                          source={{
                            uri: `https://theory.sajjel.info/assets/images/${answer_media}`,
                          }}
                        >

                        </Image>
                      ) : answer_number !== correctAnswer &&
                        answer_number === userAnswer ? (
                        <Image
                          style={{
                            height: 150,
                            width: 150,
                            resizeMode: "contain",
                            margin: 20,
                            paddingTop: 10,
                            borderColor: "red",
                            borderWidth: 7,
                          }}
                          source={{
                            uri: `https://theory.sajjel.info/assets/images/${answer_media}`,
                          }}
                        >

                        </Image>
                      ) : (
                        <Image
                          style={{
                            height: 150,
                            width: 150,
                            resizeMode: "contain",
                            margin: 20,
                            paddingTop: 10,
                          }}
                          source={{
                            uri: `https://theory.sajjel.info/assets/images/${answer_media}`,
                          }}
                        ></Image>
                      )
                    ) : answer_number === correctAnswer ? (
                      <>
                        <Button
                          text={answer}
                          width={350}
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
                        width={350}
                        style={{
                          marginTop: 10,
                        }}
                      />
                    ) : (
                      <Button
                        text={answer}
                        width={350}
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



        </ScrollView>

      </View>
      <View>


        {count < testData.length - 1 ? (
          <Button status="info700" width={350} text="Next" onPress={handlePress} />
        ) : (
          <Button
            text="Return Home"
            status="info700"
            width={350}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        )}
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
    height: 230,
    width: "100%",
    resizeMode: "contain",
    justifyContent: "center",
    // flex: 2,
  },
  answerContainer: {
    alignItems: "center"
  }
});
