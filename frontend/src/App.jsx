import { useState, useEffect } from "react";
import StarRating from "./components/StarRating";
import ReviewList from "./components/ReviewList";
import { useReviews } from "./hooks/useReviews";
import Loader from "./components/Loader";
import { getBusinessConfig } from "./service/api";
import { motion } from "framer-motion";

export default function App() {
  const [rating, setRating] = useState(null);
  const [businessId, setBusinessId] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [googleUrl, setGoogleUrl] = useState("");

  const { reviews, loading, error, fetchReviews } = useReviews();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("b");
    if (!id) return;
    setBusinessId(id);
  }, []);

  useEffect(() => {
    if (!businessId) return;

    const fetchConfig = async () => {
      try {
        const data = await getBusinessConfig(businessId);
        setBusinessName(data.name);
        setGoogleUrl(data.google_review_url);
      } catch {
        console.error("Invalid business ID");
      }
    };

    fetchConfig();
  }, [businessId]);

  if (!businessId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <div className="text-center max-w-md">

        <h1 className="text-4xl font-semibold tracking-tight mb-4">
           Review Generator
        </h1>

        <p className="text-white/60 leading-relaxed">
          This review page is accessed through a business QR code.
          Please scan a valid QR to continue.
        </p>

      </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4 py-10 overflow-hidden">

      {/* Ambient gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.05),transparent_40%),radial-gradient(circle_at_85%_30%,rgba(255,255,255,0.04),transparent_40%)]" />

      {/* Noise */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-xl z-10"
      >

        {/* Glass Card */}
        <div className="relative rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">

          {/* Inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 pointer-events-none" />

          <div className="relative p-6 sm:p-8 md:p-10">

            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
                Rate{" "}
                <span className="text-white/80">
                  {businessName || "your experience"}
                </span>
              </h1>

              <p className="text-neutral-400 mt-4 text-sm max-w-sm mx-auto">
                Share your feedback and generate a polished review instantly.
              </p>
            </div>

            {/* Rating */}
            <div className="flex justify-center mb-8">
              <StarRating onSelect={setRating} />
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => fetchReviews(rating, businessId)}
                disabled={!rating || loading}
                className="relative group px-8 py-3 rounded-xl font-medium bg-white text-black overflow-hidden disabled:opacity-40"
              >
                <span className="relative z-10">Generate Reviews</span>
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </div>

            {/* Loader */}
            {loading && (
              <div className="flex justify-center mt-8">
                <Loader />
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="text-red-400 text-center mt-6 text-sm">
                {error}
              </p>
            )}

            {/* Reviews */}
            <div className="mt-10">
              <ReviewList reviews={reviews} />
            </div>

            {/* Actions */}
            {reviews.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 mt-10">

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => fetchReviews(rating, businessId)}
                  className="flex-1 px-5 py-3 rounded-xl border border-white/15 hover:bg-white/5 backdrop-blur-md"
                >
                  Regenerate
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => window.open(googleUrl, "_blank")}
                  className="flex-1 px-5 py-3 rounded-xl bg-white text-black font-medium"
                >
                  Post on Google
                </motion.button>

              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-neutral-600 tracking-[0.2em] uppercase">
          Crafted for seamless feedback
        </div>

      </motion.div>
    </div>
  );
}