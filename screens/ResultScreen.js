import React, { useEffect, useState, useContext } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { themeColor, Button, useTheme } from "react-native-rapi-ui";
import useTest from "../hooks/useTest";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/user";

const ResultScreen = (props) => {
  const { isDarkmode } = useTheme();
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { email, password } = user;

  const { testId } = props.route.params;
  const { test, setTest, loading } = useTest(email, password, testId);

  const totalCalculator = test.map((q) => {
    return q.is_correct;
  });

  const result = totalCalculator.reduce((a, b) => a + b, 0);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
      }}
    >
      <ScrollView style={{}}>
        <View style={{ flex: 1, margin: 40 }}>
          {result / totalCalculator.length >= 0.86 ? (
            <Text
              style={{
                color: "#00FF00",
                fontSize: 100,
                fontWeight: "bold",
                alignContent: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {loading ? "" : "PASS"}
            </Text>
          ) : (
            <Text
              style={{
                color: "#FF0000",
                fontSize: 100,
                fontWeight: "bold",
                alignContent: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {loading ? "" : "FAIL"}
            </Text>
          )}
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              alignContent: "center",
              justifyContent: "center",
              textAlign: "center",
              color: isDarkmode ? themeColor.white100 : "#17171E",
            }}
          >
            Your Score is {result != "undefined" ? result : ""}/
            {totalCalculator ? totalCalculator.length : ""}
          </Text>

          <Button
            status="info700"
            style={{ bottom: -50, marginBottom: 150 }}
            text="Review Test"
            onPress={() => {
              navigation.navigate("Review", { resultsData: test });
            }}
          />
          <Button
            status="info700"
            style={{ bottom: 80, marginBottom: 150 }}
            text="Return Home"
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultScreen;
