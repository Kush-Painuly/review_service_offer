import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getBusinessConfig = async (businessId) => {
  const res = await API.get(`/business-config/${businessId}`);
  return res.data;
};

export const generateReviews = async (rating, businessId) => {
  const res = await API.post(`/generate-reviews/${businessId}`, {
    rating,
  });
  return res.data.reviews;
};