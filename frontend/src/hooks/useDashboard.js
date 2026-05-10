import { useEffect, useState } from "react";

import {
  getDashboardSummary,
  getRatingDistribution
} from "../service/dashboard";


export function useDashboard() {

  const [summary, setSummary] = useState(null);

  const [ratings, setRatings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);


  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const summaryData =
          await getDashboardSummary();

        const ratingsData =
          await getRatingDistribution();

        setSummary(summaryData);

        setRatings(ratingsData);

      } catch (err) {

        setError("Failed to load dashboard");

      } finally {

        setLoading(false);

      }
    };

    loadDashboard();

  }, []);


  return {
    summary,
    ratings,
    loading,
    error
  };
}