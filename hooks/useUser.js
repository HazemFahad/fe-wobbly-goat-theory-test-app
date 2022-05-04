import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUser = () => {
  const [user, setUser] = useState();

  useEffect(async() => {
    console.log("Anything in here is fired on component mount.");
    try {
      const loggedInUser = await AsyncStorage.getItem("userAuth");
      console.log(loggedInUser,'user local data');
      if (loggedInUser !==null) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
      }
    } catch (error) {}
    return () => {
      console.log("Anything in here is fired on component unmount.");
    };
  }, []);

  return { user, setUser };
};

export default useUser;
