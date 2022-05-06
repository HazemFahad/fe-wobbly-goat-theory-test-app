import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Button,
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
import { getCategories } from "../utils/api";
import { UserContext } from "../contexts/user";
import MultiSelect from "react-native-multiple-select";
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
      .catch((err) => {
        console.log(err);
      });
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
      <Layout>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
            <Section>
              <Text fontWeight="bold" style={{ textAlign: "center" }}>
                Please choose the categories, or select nothing to get question
                from all categories.
              </Text>
              <SectionContent>
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
                  title="Quiz by category"
                  onPress={handlePressPracticeCat}
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
