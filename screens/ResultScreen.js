import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { Layout, themeColor, Button, Ionicons } from "react-native-rapi-ui";
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
      <View style={styles.container}>
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
            PASS
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
            FAIL
          </Text>
        )}
        <Text
          style={{
            color: "black",
            fontSize: 40,
            fontWeight: "bold",
            alignContent: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          Your Score is {result}/{totalCalculator.length}
        </Text>

        <Button
          status="info700"
          style={{ bottom: -50, marginBottom: 150 }}
          text="Review Test"
          onPress={() => {
            navigation.navigate("Review", { resultsData });
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
    </Layout>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    flex: 1,
    padding: 50,
  },
});
