import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { Layout, themeColor } from "react-native-rapi-ui";
import { getResults } from "../utils/api";

const ResultScreen = (props) => {
  // console.log(props.route.params);
  const [resultsData, setResultsData] = useState([]);
  // const [totalResult, setTotalResult] = useState(0);
  const { email, password, testId } = props.route.params;

  useEffect(() => {
    getResults(email, password, testId).then((data) => {
      setResultsData(data.data);
    });
  }, []);

  // console.log(resultsData);

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* {resultsData.map(() => {
          <Text>Question x: You answered {}</Text>;
        })} */}
      </View>
    </Layout>
  );
};

export default ResultScreen;
