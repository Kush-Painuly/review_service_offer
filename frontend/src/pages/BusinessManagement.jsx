import { motion } from "framer-motion";
import { useBusinesses } from "../hooks/useBusinesses";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateBusinessModal from "../components/CreateBusinessModal";

export default function BusinessManagement() {

  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

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

        {/* Header */}
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
            className="
              rounded-2xl
              bg-white
              text-black
              px-5 py-3
              font-medium
              hover:opacity-90
              transition
            "
          >
            Create Business
          </button>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {businesses.map((business) => (

            <motion.div
              key={business.id}
              whileHover={{
                y: -4,
                scale: 1.01
              }}
              className="
                relative overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/[0.05]
                backdrop-blur-2xl
                p-6
                shadow-[0_10px_40px_rgba(0,0,0,0.45)]
              "
            >

              {/* Glow */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-br
                  from-white/10
                  via-transparent
                  to-transparent
                  opacity-20
                  pointer-events-none
                "
              />

              {/* Content */}
              <div className="relative z-10">

                <h2 className="text-2xl font-semibold">
                  {business.business_name}
                </h2>

                <p className="text-white/40 mt-2">
                  {business.category}
                </p>

                {/* Divider */}
                <div className="h-px bg-white/10 my-6" />

                {/* Slug */}
                <div>

                  <p className="text-xs text-white/30 uppercase">
                    Slug
                  </p>

                  <p className="text-sm font-mono text-white/70 mt-1">
                    {business.business_slug}
                  </p>

                </div>

                {/* Keywords */}
                <div className="mt-5">

                  <p className="text-xs text-white/30 uppercase">
                    Keywords
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">

                    {business.keywords?.map((keyword, index) => (

                      <span
                        key={index}
                        className="
                          text-xs
                          px-3 py-1.5
                          rounded-full
                          bg-white/10
                          text-white/70
                          border border-white/10
                        "
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => {

                      const reviewLink =
                        `${window.location.origin}/r/${business.business_slug}`;

                      navigator.clipboard.writeText(reviewLink);

                      alert("Review link copied");
                    }}
                    className="
                      flex-1 min-w-[120px]
                      rounded-2xl
                      bg-white text-black
                      py-3 px-4
                      text-sm font-medium
                      hover:scale-[1.02]
                      active:scale-[0.98]
                      transition-all
                    "
                  >
                    Copy Link
                  </button>

                  {/* Open */}
                  <a
                    href={`/?b=${business.business_slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      px-4 py-3
                      rounded-2xl
                      border border-white/10
                      bg-white/[0.04]
                      text-sm text-white/80
                      hover:bg-white/[0.08]
                      transition
                    "
                  >
                    Open
                  </a>

                  {/* Analytics */}
                  <button
                    className="
                      px-4 py-3
                      rounded-2xl
                      border border-white/10
                      bg-white/[0.04]
                      text-sm text-white/80
                      hover:bg-white/[0.08]
                      transition
                    "
                  >
                    Analytics
                  </button>

                  {/* QR */}
                  <button
                   onClick={() =>
                          navigate(`/qr?b=${business.business_slug}`)
                        }
                    className="
                      px-4 py-3
                      rounded-2xl
                      border border-white/10
                      bg-white/[0.04]
                      text-sm text-white/80
                      hover:bg-white/[0.08]
                      transition
                    "
                  >
                    QR
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteBusiness(business.id)}
                    className="
                      px-4 py-3
                      rounded-2xl
                      border border-red-500/20
                      bg-red-500/10
                      text-red-300 text-sm
                      hover:bg-red-500/20
                      transition
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

      {/* Modal */}
      <CreateBusinessModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={createBusiness}
      />

    </div>
  );
}