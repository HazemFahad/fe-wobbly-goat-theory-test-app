import { useState, useEffect } from "react";

const useTest = (test_id) => {
  const [quiz, setQuiz] = useState();

  useEffect(async() => {
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

  return { quiz, setQuiz };
};

export default useTest;
