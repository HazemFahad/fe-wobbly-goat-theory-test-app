import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";

const HomeScreen = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width + 40;
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

  return (
    <SafeAreaView>
      <Text style={styles.input}>Welcome ...user</Text>
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
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
          marginLeft: -25,
          marginRight: -25,
        }}
      />
      <Button
        style={styles.input}
        title="Start new test"
        onPress={() => navigation.navigate("Test")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    flex: 1,
  },

  input: {
    fontSize: 22,
    textAlign: "center",
    padding: 10,
  },
});
export default HomeScreen;
