import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import {Picker,
  Layout,
  Button,
  Text,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { getCategories } from "../utils/api";
import { UserContext } from "../contexts/user";
import MultiSelect from "react-native-multiple-select";
import { getNewTest } from "../utils/api";

const ChooseCategoryScreen = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const { isDarkmode } = useTheme();

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

  useEffect(() => {
    getNewTest(email, password, 1, [])
      .then((data) => {
        setQuiz(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(selectedItems);

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
                Please choose the categories, or select nothing to get question from all categories.
              </Text>
      <View style={styles.selector}>
        <MultiSelect
          hideTags
          items={categories}
          uniqueKey="category_id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={(text) => console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="category_name"
          searchInputStyle={{ color: "#CCC" }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
      </View>

      <Button
        style={styles.input}
        title="New Practice Test Category from dropdown"
        onPress={() =>
          navigation.navigate("PrePracticeSelector", { categories:selectedItems, })
        }
      />
      <Button
        style={styles.input}
        title="Random Test 10 q"
        onPress={() => navigation.navigate("QuestionPage", { quiz })}
      />
                  </SectionContent>
            </Section>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default ChooseCategoryScreen;

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

  selector: {
    width: "100%",
  },
});
