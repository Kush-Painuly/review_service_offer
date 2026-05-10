import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function getDashboardSummary() {

  const response = await axios.get(
    `${API_BASE}/dashboard/summary`
  );

  return response.data;
}


export async function getRatingDistribution() {

  const response = await axios.get(
    `${API_BASE}/dashboard/ratings`
  );

  return response.data;
}