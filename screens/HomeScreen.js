import React, { useContext, useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart } from "react-native-chart-kit";
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
  const screenWidth = Dimensions.get("window").width - 40;

  let chartData = {};
  chartData.labels = stats.data.labels;
  chartData.datasets = [
    {
      data: stats.data.datasets.data,
      strokeWidth: 2,
    },
  ];
  chartData.legend = ["Tests per month"];

  const handleSignOut = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) { }
  };

  return (

    <ScrollView
      style={{
        flex: 1,
        flexGrow: 1,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
      }}
    >
      <Section>
        <SectionContent>
          <Text fontWeight="bold" style={{ textAlign: "center", fontSize: 22 }}>
            Welcome {user.name}
          </Text>

          <Text fontWeight="bold" style={{ textAlign: "center", fontSize: 18, marginTop: 30, }}>Practice</Text>

          <View style={styles.statsBox}>
            <Text style={styles.pass}>Passed Tests</Text>
            <Text style={styles.pass}>{stats.practice.pass}</Text>
          </View>

          <View style={styles.statsBox}>
            <Text style={styles.fail}>Failed Tests</Text>
            <Text style={styles.fail}>{stats.practice.fail}</Text>
          </View>


          <Text fontWeight="bold" style={{ textAlign: "center", fontSize: 18 }}>Mock </Text>

          <View style={styles.statsBox}>
            <Text style={styles.pass}>Passed Tests</Text>
            <Text style={styles.pass}>{stats.mock.pass}</Text>
          </View>

          <View style={styles.statsBox}>
            <Text style={styles.fail}>Failed Tests</Text>
            <Text style={styles.fail}>{stats.mock.fail}</Text>
          </View>


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
              borderRadius: 10,
            }}
          />
          <Text style={{ textAlign: "center", padding: 22, fontWeight: "bold", fontSize: 18, }}>Total Tests: {stats.all}</Text>

          <Button
            text="Start new test"
            status="info700"
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
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  statsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
  },
  pass: {
    color: "green",
    fontWeight: "bold"
  },
  fail: {
    color: "red",
    fontWeight: "bold"
  },

});

export default HomeScreen;
