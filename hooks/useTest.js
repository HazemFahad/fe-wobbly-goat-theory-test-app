import { useState, useEffect } from "react";
import { getTestById } from "../utils/api";

const useTest = (email, password, test_id) => {
  const [test, setTest] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    try {
      setLoading(true);
      const testData = await getTestById(email, password, test_id);
      setLoading(false);
      setTest(testData);
    } catch (error) {
      setLoading(false);
    }
  }, [email, password, test_id]);

  return { test, setTest, loading };
};

export default useTest;
