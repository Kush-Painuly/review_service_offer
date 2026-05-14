import { motion } from "framer-motion";
import { useBusinesses } from "../hooks/useBusinesses";
import { useState } from "react";
import CreateBusinessModal from "../components/CreateBusinessModal";

export default function BusinessManagement() {

  const [openModal, setOpenModal] = useState(false);

  const {
    businesses,
    loading,
    error,
    createBusiness,
    deleteBusiness
  } = useBusinesses();

  if (loading) {

    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        Loading businesses...
      </div>
    );
  }

  if (error) {

    return (
      <div className="min-h-screen bg-neutral-950 text-red-400 flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-neutral-950 text-white px-6 py-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-4xl font-bold">
              Business Management
            </h1>

            <p className="text-white/50 mt-2">
              Manage connected businesses
            </p>

          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="rounded-2xl bg-white text-black px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Create Business
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {businesses.map((business) => (

            <motion.div
              key={business.id}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >

              <h2 className="text-2xl font-semibold">
                {business.business_name}
              </h2>

              <p className="text-white/40 mt-2">
                {business.category}
              </p>

              <div className="mt-6 space-y-3">

                <div>
                  <p className="text-xs text-white/30 uppercase">
                    Slug
                  </p>

                  <p className="text-sm font-mono text-white/70">
                    {business.business_slug}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/30 uppercase">
                    Keywords
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">

                    {business.keywords?.map((keyword, index) => (

                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70"
                      >
                        {keyword}
                      </span>
                    ))}

                  </div>
                </div>

              </div>

              <div className="flex gap-3 mt-8">

                <button
                  className="flex-1 rounded-xl bg-white text-black py-2 text-sm font-medium"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `http://localhost:5173/r/${business.business_slug}`
                    );

                    alert("Review link copied");
                  }}
                >
                  Copy Link
                </button>

                <button
                  onClick={() => deleteBusiness(business.id)}
                  className="rounded-xl border border-red-500/30 text-red-400 px-4 py-2 text-sm"
                >
                  Delete
                </button>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

      <CreateBusinessModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={createBusiness}
      />

    </div>
  );
}