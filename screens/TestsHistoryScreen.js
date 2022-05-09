import React, { useContext, useCallback, useEffect, useState } from "react";
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

const TestsHistoryScreen = () => {
  const { isDarkmode } = useTheme();
  const { user, setUser } = useContext(UserContext);
  const [testData, setTestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mockTests, setMockTests] = useState([]);
  const [practiceTests, setPracticeTests] = useState([]);

  useEffect(() => {
    getTestsByUser(user.email, user.password)
      .then((data) => {
        setIsLoading(true);
        setTestData(data);
        data.data.map((test) => {
          if (test.type_id === 1) {
            setMockTests((currMockTests) => {
              return [...currMockTests, test];
            });
          } else {
            setPracticeTests((currentPracticeTests) => {
              return [...currentPracticeTests, test];
            });
          }
          setIsLoading(false);
        });
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
          }}
        >
          {console.log("loading")}
          <ActivityIndicator size="large" color={themeColor.primary} />
        </View>
      </Layout>
    );
  } else {
    return (
      <KeyboardAvoidingView>
        <Layout>
          <ScrollView>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {console.log(mockTests)}
              <Text>Mock Tests</Text>
              {mockTests.map((test) => {
                console.log(test);
                return (
                  <View key={test.test_id}>
                    <Text>{test.created_at}</Text>
                    {test.result ? <Text>Pass</Text> : <Text>Fail</Text>}
                    <Text>{test.correct}/50</Text>
                  </View>
                );
              })}
              <Text>Practice Tests</Text>
              {practiceTests.map((test) => {
                return (
                  <View key={test.test_id}>
                    <Text>{test.created_at}</Text>
                    <Text>{test.correct}/10</Text>
                  </View>
                );
              })}
              <ActivityIndicator size="large" color={themeColor.primary} />
            </View>
          </ScrollView>
        </Layout>
      </KeyboardAvoidingView>
    );
  }
};

export default TestsHistoryScreen;
