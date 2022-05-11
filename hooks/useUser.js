import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUser = () => {
  const [user, setUser] = useState();

  useEffect(async () => {
    try {
      const loggedInUser = await AsyncStorage.getItem("userAuth");
      if (loggedInUser !== null) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
      }
    } catch (error) { }
  }, []);

  return { user, setUser };
};

export default useUser;
