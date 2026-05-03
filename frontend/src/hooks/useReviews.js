import { useState } from "react";
import { generateReviews } from "../service/api";

export const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviews = async (rating, businessId) => {
    try {
      setLoading(true);
      setError(null);

      const data = await generateReviews(rating, businessId);
      setReviews(data);
    } catch (err) {
      setError("Failed to generate reviews");
    } finally {
      setLoading(false);
    }
  };

  return { reviews, loading, error, fetchReviews };
};