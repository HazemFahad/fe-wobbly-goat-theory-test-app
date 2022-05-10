import React, { useContext, useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart } from "react-native-chart-kit";
import { getTestsByUser } from "../utils/api";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
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
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/user";
import useStats from "../hooks/useStats";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { isDarkmode } = useTheme();
  const { user, setUser } = useContext(UserContext);

  const { email, password } = user;
  const { stats } = useStats(email, password);
  const screenWidth = Dimensions.get("window").width;

  let chartData = {};
  chartData.labels = stats.data.labels.reverse();
  chartData.datasets = [
    {
      data: stats.data.datasets.data.reverse(),
      strokeWidth: 2,
    },
  ];
  chartData.legend = ["Tests per month"];

  console.log(stats.data, "<------ in home");

  const handleSignOut = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) {}
  };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              // justifyContent: "center",
              // alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            <Section>
              <SectionContent>
                <Text fontWeight="bold" style={{ textAlign: "center" }}>
                  Welcome {user.name}
                </Text>
                <Text>Past test results</Text>
                <Text>total test {stats.all}</Text>
                <Text style={{}}>Practice</Text>
                <Text>Passed...{stats.practice.pass}</Text>
                <Text>Failed...{stats.practice.fail}</Text>
                <Text>Mock </Text>
                <Text>Passed...{stats.mock.pass}</Text>
                <Text>Failed...{stats.mock.pass}</Text>

                <LineChart
                  data={chartData}
                  width={screenWidth}
                  height={220}
                  fromZero="True"
                  withVerticalLines="False"
                  withInnerLines="False"
                  marginRight={15}
                  chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    withVerticalLines: "False",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 0,
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: "#ffa726",
                    },
                    legend: ["Number of Tests"],
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    alignItems: "center",
                    alignContent: "center",
                    marginRight: 0,
                    padding: 0,
                  }}
                />

                <Button
                  text="Start new test"
                  onPress={() => {
                    navigation.navigate("Test");
                  }}
                  style={{
                    marginTop: 10,
                  }}
                />
                <Button
                  status="danger"
                  text="Logout"
                  onPress={() => {
                    handleSignOut();
                  }}
                  style={{
                    marginTop: 10,
                  }}
                />
              </SectionContent>
            </Section>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
