import axios from "axios";

const API = axios.create({
  baseURL: "https://review-service-offer.onrender.com",
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