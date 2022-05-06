/* TestScreen_my  */

import {
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  ScrollView,
  View,
  Image,
} from "react-native";
import {
  Picker,
  Layout,
  Text,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { getNewTest } from "../utils/api";
import { UserContext } from "../contexts/user";

const TestScreen = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { email, password } = user;
  const { isDarkmode } = useTheme();

  const handlePressFullTest = () => {
    setLoading(true);

    getNewTest(email, password, 2, []).then((data) => {
      setLoading(false);
      // console.log(data);
      navigation.navigate("Question", { data });
    });
  };

  if (loading) {
    return (
      <Layout>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{
              uri: `https://cdn.booooooom.com/wp-content/uploads/2018/01/igor-bastidas-8.gif`,
            }}
            style={styles.questionImage}
          />
          <ActivityIndicator size="large" color={themeColor.primary} />
        </View>
      </Layout>
    );
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
            <Button
              style={styles.input}
              title="New Practice Quiz"
              onPress={() => navigation.navigate("PracticeSelector")}
            />
            <Button
              style={styles.input}
              title="Full Theory test"
              onPress={handlePressFullTest}
            />
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  input: {
    fontSize: 22,
    textAlign: "center",
    padding: 10,
  },

  questionImage: {
    height: "50%",
    width: "100%",
  },
});
