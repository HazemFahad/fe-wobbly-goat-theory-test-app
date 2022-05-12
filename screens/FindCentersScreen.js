import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { getCenters } from "../utils/api";

const FindCentersScreen = () => {
  const { isDarkmode } = useTheme();
  const [postcode, setPostCode] = useState("");
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      let { success, data } = await getCenters(postcode);

      if (success) {
        setCenters(data);
      } else {
        let mssg = "";
        for (const msg in data) {
          mssg = data[msg];
        }
        alert(mssg);
      }
      setLoading(false);
    } catch (error) {
      //let errorCode = error.code;
      let errorMessage = error.message;
      setLoading(false);
      alert(errorMessage);
    }
  };
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <View style={{ marginRight: 20, marginLeft: 20 }}>
          <Text
            size="h3"
            fontWeight="bold"
            style={{
              marginBottom: 20,
            }}
          >
            Find your nearest test center
          </Text>
          <Text>Your postcode</Text>
          <TextInput
            containerStyle={{ marginTop: 15 }}
            placeholder="Enter your postcode"
            value={postcode}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            onChangeText={(text) => setPostCode(text)}
          />
          <Button
            status="info700"
            text={loading ? "Loading" : "Search"}
            onPress={() => {
              handleSearch();
            }}
            style={{
              marginTop: 20,
            }}
            disabled={loading}
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
              padding: 20,
            }}
          >




            {centers.map((center) => {
              return <View
                style={{
                  marginTop: 10,
                }}
                key={center.postcode}
              >
                <Text size="h3" fontWeight="bold">
                  {center.title}
                </Text>
                <Text><Text fontWeight="bold">Street address:</Text> {center.street_address}</Text>
                <Text><Text fontWeight="bold">locality:</Text> {center.locality}</Text>
                <Text><Text fontWeight="bold">Postcode:</Text> {center.postcode}</Text>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginTop: 10,
                  }}
                />
              </View>
            })

            }
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};

export default FindCentersScreen;
