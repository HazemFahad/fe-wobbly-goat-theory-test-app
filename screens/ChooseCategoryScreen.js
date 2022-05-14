import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { getCategories } from "../utils/api";
import { UserContext } from "../contexts/user";
import MultiSelect from "react-native-multiple-select";
import {
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
} from "react-native";
import {
  Button,
  Layout,
  Text,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { getNewTest } from "../utils/api";

const ChooseCategoryScreen = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
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
      .catch((err) => {});
  }, []);

  const handlePressPracticeCat = () => {
    setLoading(true);
    getNewTest(email, password, 1, selectedItems).then((data) => {
      setLoading(false);
      navigation.navigate("Question", { data });
    });
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0887C9",
        }}
      >
        <Image
          source={require("../assets/splash.png")}
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 400,
            width: 400,
          }}
        />
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
          }}
        >
          <Section
            style={{
              width: "90%",
              height: "80%",
            }}
          >
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              Please choose the categories, or select nothing to get question
              from all categories.
            </Text>
            <SectionContent>
              <View
                style={{
                  width: "100%",
                }}
              >
                <MultiSelect
                  hideTags
                  items={categories}
                  uniqueKey="category_id"
                  onSelectedItemsChange={onSelectedItemsChange}
                  selectedItems={selectedItems}
                  selectText="Pick Items"
                  searchInputPlaceholderText="Search Items..."
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#0369a1"
                  selectedItemIconColor="#0369a1"
                  itemTextColor="#000"
                  displayKey="category_name"
                  searchInputStyle={{ color: "#CCC" }}
                  submitButtonColor="#CCC"
                  submitButtonText="Submit"
                  hideSubmitButton
                />
              </View>

              <Button
                style={{
                  fontSize: 22,
                  textAlign: "center",
                  padding: 10,
                }}
                text="Start Quiz!"
                onPress={handlePressPracticeCat}
                status="info700"
              />
            </SectionContent>
          </Section>
        </View>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default ChooseCategoryScreen;