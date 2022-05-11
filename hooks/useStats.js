import { useState, useEffect } from "react";
import { getStats } from "../utils/api";

const useStats = (email, password) => {
  const data = {
    all: 0,
    practice: {
      pass: 0,
      fail: 0,
    },
    mock: {
      pass: 0,
      fail: 0,
    },
    data: {
      labels: ["05", "04", "03", "02", "01", "12"],
      datasets: {
        data: [0, 7, 5, 0, 12, 6],
        // color: "rgba(134, 65, 244, 1)",
        // strokeWidth: 2,
        // legend: ["Test Progress"],
      },
    },
  };

  const [stats, setStats] = useState(data);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    try {
      setLoading(true);
      const stateData = await getStats(email, password);
      setLoading(false);
      setStats(stateData);
    } catch (error) {
      setLoading(false);
    }
  }, [email, password]);

  return { stats, setStats, loading };
};

export default useStats;
