import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { CountDown } from "react-native-countdown-component";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Alert,
} from "react-native";
import { Text, Button, useTheme, themeColor } from "react-native-rapi-ui";
import { sendAnswer } from "../utils/api";
import { UserContext } from "../contexts/user";
import { images } from "../assets/assets";

const QuestionScreen = (props) => {
  const { user } = useContext(UserContext);
  const [answer, setAnswer] = useState();
  const [counter, setCounter] = useState(0);
  const [selected, setSelected] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
  });
  const [loading, setLoading] = useState(false);
  const { isDarkmode } = useTheme();
  const navigation = useNavigation();

  const { email, password } = user;
  const testData = props.route.params.data.data;
  let testId = testData[0].test_id;

  const [question, setQuestion] = useState(testData[0]);

  const handleFinish = () => {
    Alert.alert("Your time has ran out");
    navigation.navigate("Result", { testId: testId });
  };

  const toggleSelected = (id) => {
    let sel = {};
    setAnswer(id);
    for (let i = 0; i < 4; i++) {
      if (i === id) {
        sel[i] = true;
      } else {
        sel[i] = false;
      }
    }
    setSelected(sel);
  };

  const handlePress = async () => {
    if (answer !== "") {
      setLoading(true);
      if (counter < testData.length - 1) {
        let count = counter + 1;
        setCounter(count);
        setAnswer("");
        setSelected({ 0: false, 1: false, 2: false, 3: false });
        setQuestion(testData[count]);
        setLoading(false);
      }
      try {
        let { success, data } = await sendAnswer(
          question.test_questions_id,
          email,
          password,
          answer
        );

        if (success) {
          if (counter >= testData.length - 1) {
            setLoading(false);
            navigation.navigate("Result", { testId: testId });
          }
        } else {
          let mssg = "";
          for (const msg in data) {
            mssg = data[msg];
          }
          alert(mssg);
        }
      } catch (error) {
        //let errorCode = error.code;
        let errorMessage = error.message;
        setLoading(false);
        alert(errorMessage);
      }
    } else {
      alert("You have to choose an option");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
      }}
    >
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
      <View style={{ flex: 1 }}>
        <ScrollView style={{ marginTop: 40 }}>
          <View style={styles.container} behavior="padding">
            {question.media ? (
              <Image
                style={styles.questionImage}
                source={images[question.media]}
              />
            ) : (
              // <Image
              //   source={require("../assets/icon.png")}
              //   style={styles.questionImage}
              // />
              <></>
            )}

            {/* ******* THE QUESTION ******* */}

            <Text style={styles.questionText}>{question.question}</Text>

            {/* ******* ANSWER CONTAINER ******* */}

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              {/* ******* ANSWER MAP ******* */}

              {question.answers.map(
                ({ answer, answer_id, answer_number, answer_media }) => {
                  return (
                    <React.Fragment key={answer_id}>
                      {answer_media ? (
                        <TouchableOpacity
                          style={{
                            width: "50%",
                            padding: 10,
                            textAlign: "center",
                          }}
                          onPress={() => {
                            toggleSelected(answer_number);
                          }}
                        >
                          <Image
                            style={
                              selected[answer_number] == true
                                ? styles.answerImgSelected
                                : styles.answerImg
                            }
                            source={images[answer_media]}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      ) : (
                        <Button
                          style={{
                            margin: 3,
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                          text={answer}
                          onPress={() => {
                            toggleSelected(answer_number);
                          }}
                          status={
                            selected[answer_number] == true
                              ? "warning500"
                              : "info700"
                          }
                          width={350}
                        />
                      )}
                    </React.Fragment>
                  );
                }
              )}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{ alignItems: "center" }}>
        {counter < 49 ? (
          <Button
            text={loading ? "Loading" : "Next Question"}
            style={{ textAlign: "center", margin: 10 }}
            onPress={handlePress}
            status="info800"
            width={350}
            disabled={loading}
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
            Question Number: {counter + 1} of {testData.length}
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
  answerImgSelected: {
    height: undefined,
    aspectRatio: 1,
    width: "100%",
    borderColor: themeColor.warning500,
    borderWidth: 7,
  },
  countDownTimer: {
    marginTop: 0,
  },
  questionText: {
    fontSize: 20,
    padding: 15,
  },
});
