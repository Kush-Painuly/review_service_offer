import { useEffect, useState } from "react";

import {
  getBusinesses,
  createBusiness,
  deleteBusiness
} from "../service/businessService";

export function useBusinesses() {

  const [businesses, setBusinesses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  async function loadBusinesses() {

    try {

      setLoading(true);

      setError(null);

      const data = await getBusinesses();

      setBusinesses(data);

    } catch (err) {

      console.error(err);

      setError("Failed to load businesses");

    } finally {

      setLoading(false);
    }
  }

  async function handleCreateBusiness(payload) {

    try {

      const newBusiness = await createBusiness(payload);

      setBusinesses((prev) => [
        newBusiness,
        ...prev
      ]);

      return newBusiness;

    } catch (err) {

      console.error(err);

      throw err;
    }
  }

  async function handleDeleteBusiness(id) {

    try {

      await deleteBusiness(id);

      setBusinesses((prev) =>
        prev.filter((business) => business.id !== id)
      );

    } catch (err) {

      console.error(err);

      throw err;
    }
  }

  useEffect(() => {

    loadBusinesses();

  }, []);

  return {
    businesses,
    loading,
    error,
    createBusiness: handleCreateBusiness,
    deleteBusiness: handleDeleteBusiness,
    refetch: loadBusinesses
  };
}