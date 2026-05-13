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

      const data = await getBusinesses();

      setBusinesses(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);
    }
  }


  async function handleCreateBusiness(payload) {

    await createBusiness(payload);

    await loadBusinesses();
  }


  async function handleDeleteBusiness(id) {

    await deleteBusiness(id);

    setBusinesses((prev) =>
      prev.filter((business) => business.id !== id)
    );
  }


  useEffect(() => {

    loadBusinesses();

  }, []);


  return {
    businesses,
    loading,
    error,
    createBusiness: handleCreateBusiness,
    deleteBusiness: handleDeleteBusiness
  };
}