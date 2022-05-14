import { useState, useEffect } from "react";
import { getResults } from "../utils/api";

const useTest = (email, password, test_id) => {
  const [test, setTest] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    try {
      setLoading(true);
      const testData = await getResults(email, password, test_id);
      setLoading(false);
      setTest(testData.data);
    } catch (error) {
      setLoading(false);
    }
  }, [email, password, test_id]);

  return { test, setTest, loading };
};

export default useTest;
