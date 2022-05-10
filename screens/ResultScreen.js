import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, Button } from "react-native";
import { Layout, themeColor } from "react-native-rapi-ui";
import { getResults } from "../utils/api";
import { useNavigation } from "@react-navigation/native";

const ResultScreen = (props) => {
  const [resultsData, setResultsData] = useState([]);

  const { email, password, testId } = props.route.params;
  const navigation = useNavigation();

  useEffect(() => {
    getResults(email, password, testId).then((data) => {
      setResultsData(data.data);
    });
  }, []);

  const totalCalculator = resultsData.map((q) => {
    return q.is_correct;
  });

  const result = totalCalculator.reduce((a, b) => a + b, 0);

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {result / totalCalculator.length >= 0.86 ? (
          <Text
            style={{
              color: "#00FF00",
            }}
          >
            PASS
          </Text>
        ) : (
          <Text
            style={{
              color: "#FF0000",
            }}
          >
            FAIL
          </Text>
        )}
        <Text>
          Your Score is {result}/{totalCalculator.length}
        </Text>

        <Button
          title="Review Test"
          onPress={() => {
            navigation.navigate("Review", { resultsData });
          }}
        />
        <Button
          title="Return Home"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
    </Layout>
  );
};

export default ResultScreen;
