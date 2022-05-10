import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import {
  Layout,
  Button,
  Text,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { getTestsByUser } from "../utils/api";
import { UserContext } from "../contexts/user";
import timeConverter from "../utils/helpers";

const TestsHistoryScreen = () => {
  const { isDarkmode } = useTheme();
  const { user, setUser } = useContext(UserContext);
  const [testData, setTestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mockTests, setMockTests] = useState([]);
  const [practiceTests, setPracticeTests] = useState([]);

  useEffect(() => {
    let mockData = [];
    let practiceData = [];
    getTestsByUser(user.email, user.password)
      .then((data) => {
        setIsLoading(true);
        setTestData(data);
        data.data.map((test) => {
          if (test.type_id === 1) {
            mockData.push(test);
          } else {
            practiceData.push(test);
          }
        });
        setPracticeTests(practiceData);
        setMockTests(mockData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setTestData]);

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
      <KeyboardAvoidingView>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            <Text>Mock Tests</Text>
            {mockTests.reverse().map((test) => {
              return (
                <View key={test.test_id}>
                  <Text>{timeConverter(test.created_at)}</Text>
                  {test.result ? <Text>Pass</Text> : <Text>Fail</Text>}
                  <Text>{test.correct}/50</Text>
                </View>
              );
            })}
            <Text>Practice Tests</Text>
            {practiceTests.reverse().map((test) => {
              return (
                <View key={test.test_id}>
                  <Text>{timeConverter(test.created_at)}</Text>
                  <Text>{test.correct}/10</Text>
                </View>
              );
            })}
            <ActivityIndicator size="large" color={themeColor.primary} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
};

export default TestsHistoryScreen;
