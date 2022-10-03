import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Picker,
  Layout,
  Text,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";

import { getTestsByUser } from "../utils/api";
import { UserContext } from "../contexts/user";
import timeConverter from "../utils/helpers";

const TestsHistoryScreen = () => {
  const navigation = useNavigation();
  const { isDarkmode } = useTheme();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [mockTests, setMockTests] = useState([]);
  const [practiceTests, setPracticeTests] = useState([]);

  const [pickerValue, setPickerValue] = useState(null);
  const { email, password } = user;

  const items = [
    { label: "Mock Tests", value: "2" },
    { label: "Practice Tests", value: "1" },
  ];

  useEffect(() => {
    let mockData = [];
    let practiceData = [];
    getTestsByUser(email, password)
      .then(({ data }) => {
        setIsLoading(true);
        data.reverse().map((test) => {
          if (test.type_id === 2) {
            mockData.push(test);
          } else {
            practiceData.push(test);
          }
        });
        setPracticeTests(practiceData);
        setMockTests(mockData);
        setIsLoading(false);
      })
      .catch((err) => {});
  }, [email, password]);

  if (isLoading === true) {
    return (
      <Layout>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
          }}
        >
          <ActivityIndicator size="large" color={themeColor.primary} />
        </View>
      </Layout>
    );
  } else {
    return (
      <Layout style={{ marginTop: 0 }}>
        <View
          style={{
            margin: 20,
            backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
          }}
        >
          <Text
            size="h3"
            fontWeight="bold"
            style={{
              marginBottom: 20,
              marginTop: 10,
            }}
          >
            Choose your test type:
          </Text>

          <Picker
            items={items}
            value={pickerValue}
            placeholder="Choose your test type"
            onValueChange={(val) => setPickerValue(val)}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            {pickerValue == 2 ? (
              <>
                {mockTests.map((test) => {
                  return (
                    <TouchableOpacity
                      key={test.test_id}
                      style={test.correct >= 43 ? styles.pass : styles.fail}
                      onPress={() => {
                        navigation.navigate("Result", { testId: test.test_id });
                      }}
                    >
                      <Text style={styles.txt}>
                        {timeConverter(test.created_at)}
                      </Text>
                      {test.result ? (
                        <Text style={styles.txt}>Pass</Text>
                      ) : (
                        <Text style={styles.txt}>Fail</Text>
                      )}
                      <Text style={styles.txt}>{test.correct}/50</Text>
                    </TouchableOpacity>
                  );
                })}
              </>
            ) : (
              <></>
            )}

            {pickerValue == 1 ? (
              <>
                {practiceTests.map((test) => {
                  return (
                    <TouchableOpacity
                      key={test.test_id}
                      style={test.correct >= 9 ? styles.pass : styles.fail}
                      onPress={() => {
                        navigation.navigate("Result", { testId: test.test_id });
                      }}
                    >
                      <Text style={styles.txt}>
                        {timeConverter(test.created_at)}
                      </Text>
                      <Text style={styles.txt}>{test.correct}/10</Text>
                    </TouchableOpacity>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
      </Layout>
    );
  }
};

const styles = StyleSheet.create({
  fail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "red",
  },
  pass: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "green",
  },
  txt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default TestsHistoryScreen;
