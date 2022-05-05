import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
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
import MultiSelect from "react-native-multiple-select";
import { UserContext } from "../contexts/user";
import { useNavigation } from "@react-navigation/native";
import { getCategories,getNewTest } from "../utils/api";

const TestScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { isDarkmode } = useTheme();
  const [categories, setCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState([]);

  const { email, password } = user;

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

const loadQuiz = async(type_id)=>{
  try {
    console.log('0');
    const data = await getNewTest(email, password, type_id, selectedItems);
    console.log('1');
    setQuiz(data);console.log('2');
    setLoading(false);console.log('3');
    navigation.navigate("Question", { questions: data });console.log('4');
  } catch (error) {
    alert("Failed to get the questions from the server.!");
    setLoading(false);
  }
  
}
useEffect(async () => {
  console.log("TestScreen mount.");
  return () => {
    console.log("TestScreen unmount.");
  };
}, []);


  return (
    <View behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
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
              <Text
                fontWeight="bold"
                style={{ marginBottom: 10, textAlign: "center" }}
              >
                Please choose the categories, or select nothing to get question
                from all categories.
              </Text>
              <MultiSelect
                hideTags
                items={categories}
                uniqueKey="category_id"
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Pick Items"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={(text) => console.log(text)}
                tagRemoveIconColor="#888"
                tagBorderColor="#888"
                tagTextColor="#888"
                selectedItemTextColor="#888"
                selectedItemIconColor="#888"
                itemTextColor="#000"
                displayKey="category_name"
                searchInputStyle={{ color: "#888" }}
                submitButtonColor="green"
                submitButtonText="Choose selected categories"
              />

              <Text
                fontWeight="bold"
                style={{ marginTop: 20, textAlign: "center" }}
              >
                Choose your test type
              </Text>

              <Button
                text={loading ? "Loading" :"Practice test"}
                onPress={() => {
                  loadQuiz(1);
                }}
                style={{
                  marginTop: 10,
                }}
                disabled={loading}
              />

              <Button
                text={loading ? "Loading" :"Mock test"}
                onPress={() => {
                  loadQuiz(2);
                }}
                style={{
                  marginTop: 10,
                }}
                disabled={loading}
              />
            </SectionContent>
          </Section>
        </View>
      </Layout>
    </View>
  );
};

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
});

export default TestScreen;
