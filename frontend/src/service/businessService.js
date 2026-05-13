const API_BASE = import.meta.env.VITE_API_BASE_URL;
export async function getBusinesses() {

  const response = await fetch(`${API_BASE}/businesses`);

  if (!response.ok) {
    throw new Error("Failed to fetch businesses");
  }

  return response.json();
}
export async function createBusiness(payload) {

  const response = await fetch(`${API_BASE}/businesses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to create business");
  }

  return response.json();
}


export async function deleteBusiness(id) {

  const response = await fetch(`${API_BASE}/businesses/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete business");
  }

  return true;
}