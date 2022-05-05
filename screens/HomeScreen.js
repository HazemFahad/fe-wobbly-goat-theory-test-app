import React, { useContext, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart } from "react-native-chart-kit";
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
  const screenWidth = Dimensions.get("window").width - 50;
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
        data: [20, 26, 32, 30, 39, 45, 40, 42, 49],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Test Progress"], // optional
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) {}
  }

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
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            <Section>
              <SectionContent>
                <Text fontWeight="bold" style={{ textAlign: "center" }}>
                  These UI components provided by Rapi UI
                </Text>
                <Text>Welcome ...user</Text>
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
