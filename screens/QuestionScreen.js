import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Alert,
} from "react-native";
import {
  Picker,
  Layout,
  Text,
  Section,
  Button,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { sendAnswer, getResults } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/user";
import { CountDown } from "react-native-countdown-component";
import { SafeAreaView } from "react-native-safe-area-context";

const QuestionScreen = (props) => {
  const { user } = useContext(UserContext);
  const [answer, setAnswer] = useState("");
  const [totalResult, setTotalResult] = useState(0);

  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const { email, password } = user;
  const { isDarkmode } = useTheme();

  const testData = props.route.params.data.data;
  let testId = testData[0].test_id;

  const handleFinish = () => {
    Alert.alert("Your time has ran out");
    getResults(email, password, testData[count].test_id).then((data) => {
      navigation.navigate("Result", { data });
    });
  };

  const handlePress = () => {
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
        if (data.data === 1) {
          setTotalResult(totalResult + 1);
        }
      });
      setAnswer("");
    } else {
      alert("You have to choose an option");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkmode ? "#17171E" : themeColor.white100, }}>
      {/* ******* COUNTDOWN TIMER ******* */}
      {testData.length === 50 ? (
        <View style={{ paddingBottom: 0, marginBottom: 0 }}>
          <CountDown
            size={30}
            until={3420}
            onFinish={handleFinish}
            timeToShow={["M", "S"]}
            digitStyle={{
              backgroundColor: "#0887C9",
              borderColor: "transparent",
            }}
            digitTxtStyle={{ color: "#fff" }}
            timeLabels={{ m: null, s: null }}
            style={styles.countDownTimer}
          />
        </View>
      ) : (
        <></>
      )}

      {/* ******* IS THERE AN IMAGE ATTACHED TO QUESTION? ******* */}
      <View style={{ flex: 1, }}>
        <ScrollView style={{ marginTop: 40, }}>
          <View style={styles.container} behavior="padding">
            {testData[count].media ? (
              <Image
                style={styles.questionImage}
                source={{
                  uri: `https://theory.sajjel.info/assets/images/${testData[count].media}`,
                }}
              />
            ) : (
              // <Image
              //   source={require("../assets/icon.png")}
              //   style={styles.questionImage}
              // />
              <></>
            )}

            {/* ******* THE QUESTION ******* */}

            <Text style={styles.questionText}>{testData[count].question}</Text>

            {/* ******* ANSWER CONTAINER ******* */}

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: "center", alignContent: "center", marginLeft: 30, marginTop: 30, }}>
              {/* ******* ANSWER MAP ******* */}

              {testData[count].answers.map(
                ({ answer, answer_id, answer_number, answer_media }) => {
                  return (
                    <View key={answer_id} style={{}}>
                      <TouchableOpacity
                        style={styles.answer}
                        onPress={() => {
                          setAnswer(answer_number);
                        }}
                      >
                        {answer_media ? (

                          <Image
                            style={{
                              height: 150,
                              width: 150,
                              resizeMode: "contain",
                              margin: 20,


                              paddingTop: 10
                            }}
                            source={{
                              uri: `https://theory.sajjel.info/assets/images/${answer_media}`,
                            }}
                          />

                        ) : (
                          <Button
                            style={styles.button}
                            text={answer}
                            onPress={() => {
                              setAnswer(answer_number);
                            }}
                            status="info700"
                            width={350}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                }
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{ alignItems: "center", }}>
        {count < 49 ? (
          <Button
            text="Next Question"
            style={{ textAlign: "center", margin: 10 }}
            onPress={handlePress}
            status="info800"
            width={350}
          />
        ) : (
          <Button
            width={350}
            text="RESULTS"
            onPress={handlePress}
            status="info800"
            style={{ textAlign: "center", margin: 10 }}
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

export default QuestionScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",

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

  countDownTimer: {
    marginTop: 0,
  },

  questionText: {
    fontSize: 20,
    padding: 15,
  },

  button: {
    margin: 3,
  },
  nextButton: {
    justifyContent: "center",
    alignItems: "center",

  },
});
