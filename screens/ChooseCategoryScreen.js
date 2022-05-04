import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { getCategories } from "../utils/api";
import { UserContext } from "../contexts/user";
import MultiSelect from "react-native-multiple-select";
import { getNewTest } from "../utils/api";

const PracticeSelector = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quiz, setQuiz] = useState([]);

  const { email, password } = {
    email: "john.doe@toptal.com",
    password: "toptal123",
  };

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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>PracticeSelectorScreen</Text>
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
          navigation.navigate("PrePracticeSelector", { selectedItems })
        }
      />
      <Button
        style={styles.input}
        title="Random Test 10 q"
        onPress={() => navigation.navigate("QuestionPage", { quiz })}
      />
    </KeyboardAvoidingView>
  );
};

export default PracticeSelector;

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
