import { useState, useEffect } from "react";
import StarRating from "./components/StarRating";
import ReviewList from "./components/ReviewList";
import { useReviews } from "./hooks/useReviews";
import Loader from "./components/Loader";
import { getBusinessConfig } from "./service/api";
import { trackEvent } from "./service/analytics";
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
        trackEvent(businessId, "qr_scan");
      } catch {
        console.error("Invalid business ID");
      }
    };

    fetchConfig();
  }, [businessId]);

  if (!businessId) {
    return (
      <div className="relative min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6 overflow-hidden">

        {/* Ambient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.05),transparent_35%),radial-gradient(circle_at_85%_30%,rgba(255,255,255,0.04),transparent_40%)]" />

        {/* Noise Texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Glow Orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/[0.03] blur-[120px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl text-center"
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl mb-8">

            <div className="w-2 h-2 rounded-full bg-white/70" />

            <span className="text-xs uppercase tracking-[0.2em] text-white/60">
              AI Powered Review Platform
            </span>

          </div>

          {/* Hero */}
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[0.95]">

            Transform Customer
            <br />

            Feedback Into
            <span className="text-white/60"> Growth</span>

          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mt-8 leading-relaxed">

            Generate authentic review suggestions,
            streamline customer feedback, and increase
            review conversion through intelligent
            QR-powered workflows.

          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="/manage"
              className="
              group
              px-7 py-3.5
              rounded-2xl
              bg-white
              text-black
              font-medium
              shadow-[0_10px_30px_rgba(255,255,255,0.08)]
            "
            >
              Business Dashboard
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="/qr"
              className="
              px-7 py-3.5
              rounded-2xl
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-xl
              hover:bg-white/[0.07]
              transition-all
            "
            >
              QR Generator
            </motion.a>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">

              <h3 className="text-3xl font-semibold">
                AI
              </h3>

              <p className="text-sm text-white/45 mt-2">
                Smart review generation
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">

              <h3 className="text-3xl font-semibold">
                QR
              </h3>

              <p className="text-sm text-white/45 mt-2">
                Seamless customer journeys
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">

              <h3 className="text-3xl font-semibold">
                Analytics
              </h3>

              <p className="text-sm text-white/45 mt-2">
                Measure review performance
              </p>

            </div>

          </div>

          {/* Footer Line */}
          <div className="mt-14 text-xs uppercase tracking-[0.25em] text-white/25">

            Built for modern customer engagement

          </div>

        </motion.div>

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
                onClick={async () => {
                  await fetchReviews(rating, businessId);

                  trackEvent(businessId, "review_generated", {
                    rating,
                  });
                }}
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
              <p className="text-red-400 text-center mt-6 text-sm">{error}</p>
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
                  onClick={async () => {
                    await fetchReviews(rating, businessId);

                    trackEvent(businessId, "regenerate_clicked", {
                      rating,
                    });
                  }}
                  className="flex-1 px-5 py-3 rounded-xl border border-white/15 hover:bg-white/5 backdrop-blur-md"
                >
                  Regenerate
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    trackEvent(businessId, "google_redirect");

                    window.open(googleUrl, "_blank");
                  }}
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
