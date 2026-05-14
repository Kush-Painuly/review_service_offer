import { motion } from "framer-motion";
import { useBusinesses } from "../hooks/useBusinesses";
import { useState } from "react";
import CreateBusinessModal from "../components/CreateBusinessModal";

export default function BusinessManagement() {
  const [openModal, setOpenModal] = useState(false);
  const { businesses, loading, error } = useBusinesses();

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
                className="w-2 h-2 rounded-full bg-white/70"
              />
            ))}
          </div>

          <p className="text-sm tracking-wide text-white/50">
            Loading businesses
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-red-300 text-sm backdrop-blur-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white px-4 sm:px-6 py-10 overflow-hidden">
      {/* Ambient gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.05),transparent_40%),radial-gradient(circle_at_85%_30%,rgba(255,255,255,0.04),transparent_40%)]" />

      {/* Noise texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            Business Management
          </h1>

          <button
            onClick={() => setOpenModal(true)}
            className="rounded-2xl bg-white text-black px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Create Business
          </button>

          <p className="text-white/50 mt-3 text-sm md:text-base">
            Manage connected businesses and review collection profiles
          </p>
        </motion.div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {businesses.map((business, index) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
              }}
              whileHover={{
                scale: 1.015,
                y: -2,
              }}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
            >
              {/* subtle glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-20 pointer-events-none" />

              <div className="relative p-6 md:p-7">
                {/* Top Row */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {business.business_name}
                    </h2>

                    <p className="text-white/45 mt-2 text-sm">
                      {business.category}
                    </p>
                  </div>

                  {/* status indicator */}
                  <div className="w-2.5 h-2.5 rounded-full bg-white/60 mt-2" />
                </div>

                {/* Divider */}
                <div className="h-px bg-white/6 my-6" />

                {/* Metadata */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.18em] text-white/30">
                      Business Slug
                    </span>

                    <span className="text-sm text-white/60 font-mono">
                      {business.business_slug}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-xs text-neutral-600 tracking-[0.2em] uppercase">
          Centralized business control
        </div>
      </div>
    </div>
  );
}
