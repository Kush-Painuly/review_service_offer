import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
console.log("API_BASE =", API_BASE);

export async function trackEvent(businessSlug, eventType, metadata = {}) {
  try {
    await axios.post(`${API_BASE}/analytics`, {
      business_slug: businessSlug,
      event_type: eventType,
      metadata,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}
