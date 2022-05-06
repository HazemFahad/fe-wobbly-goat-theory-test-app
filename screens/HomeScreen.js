import React, { useContext, useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart } from "react-native-chart-kit";
import { getTestsByUser } from "../utils/api";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
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

const HomeScreen = () => {
  const navigation = useNavigation();
  const { isDarkmode } = useTheme();
  const { user, setUser } = useContext(UserContext);
  const [usersTests, setUsersTests] = useState([]);
  const [last8, setLast8] = useState([
    { result: 1 },
    { result: 1 },
    { result: 0 },
    { result: 1 },
    { result: 1 },
    { result: 0 },
    { result: 1 },
    { result: 0 },
  ]);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    getTestsByUser(user.email, user.password)
      .then((data) => {
        setUsersTests(data);
        // setLast8(data.data.slice(-8));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setLast8]);
  const handleSignOut = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) {}
  };

  // const last8 = usersTests.slice(-8);
  // console.log(last8);
  const data = {
    labels: [
      "02/04",
      "04/04",
      "05/04",
      "06/04",
      "08/04",
      "09/04",
      "11/04",
      "13/04",
      "14/04",
    ],
    datasets: [
      {
        data: [
          last8[0].result,
          last8[1].result,
          last8[2].result,
          last8[3].result,
          last8[4].result,
          last8[5].result,
          last8[6].result,
          last8[7].result,
        ],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Test Progress"], // optional
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
                <Text>Practice</Text>
                <Text>Passed...</Text>
                <Text>Failed...</Text>
                <Text>Mock</Text>
                <Text>Passed...</Text>
                <Text>Failed...</Text>

                <LineChart
                  data={data}
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
