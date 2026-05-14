import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateBusinessModal({
  open,
  onClose,
  onCreate
}) {

  const [form, setForm] = useState({
    business_name: "",
    business_slug: "",
    category: "",
    keywords: "",
    google_review_url: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      setLoading(true);

      await onCreate({
        ...form,
        keywords: form.keywords
          .split(",")
          .map((item) => item.trim())
      });

      onClose();

      setForm({
        business_name: "",
        business_slug: "",
        category: "",
        keywords: "",
        google_review_url: ""
      });

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);
    }
  }

  return (

    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xl px-4"
        >

          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            transition={{
              duration: 0.28,
              ease: "easeOut"
            }}
            className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.75)]"
          >

            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-20 pointer-events-none" />

            <div className="relative p-6 sm:p-8 md:p-10">

              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-10">

                <div>

                  <h2 className="text-3xl font-semibold tracking-tight text-white">
                    Create Business
                  </h2>

                  <p className="text-sm text-white/45 mt-2">
                    Configure a new review collection profile
                  </p>

                </div>

                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] text-white/50 hover:text-white hover:bg-white/[0.08] transition-all flex items-center justify-center"
                >
                  ✕
                </button>

              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Business Name */}
                <div className="space-y-2">

                  <label className="text-xs uppercase tracking-[0.18em] text-white/35">
                    Business Name
                  </label>

                  <input
                    type="text"
                    name="business_name"
                    placeholder="Enter business name"
                    value={form.business_name}
                    onChange={handleChange}
                    className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/15 focus:border-white/20 transition-all"
                    required
                  />

                </div>

                {/* Slug */}
                <div className="space-y-2">

                  <label className="text-xs uppercase tracking-[0.18em] text-white/35">
                    Business Slug
                  </label>

                  <input
                    type="text"
                    name="business_slug"
                    placeholder="your-business-slug"
                    value={form.business_slug}
                    onChange={handleChange}
                    className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/15 focus:border-white/20 transition-all"
                    required
                  />

                </div>

                {/* Category */}
                <div className="space-y-2">

                  <label className="text-xs uppercase tracking-[0.18em] text-white/35">
                    Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    placeholder="Restaurant, Salon, Cafe..."
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/15 focus:border-white/20 transition-all"
                    required
                  />

                </div>

                {/* Keywords */}
                <div className="space-y-2">

                  <label className="text-xs uppercase tracking-[0.18em] text-white/35">
                    Keywords
                  </label>

                  <input
                    type="text"
                    name="keywords"
                    placeholder="friendly staff, quick service, ambience..."
                    value={form.keywords}
                    onChange={handleChange}
                    className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/15 focus:border-white/20 transition-all"
                    required
                  />

                </div>

                {/* URL */}
                <div className="space-y-2">

                  <label className="text-xs uppercase tracking-[0.18em] text-white/35">
                    Google Review URL
                  </label>

                  <input
                    type="text"
                    name="google_review_url"
                    placeholder="https://..."
                    value={form.google_review_url}
                    onChange={handleChange}
                    className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/15 focus:border-white/20 transition-all"
                    required
                  />

                </div>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="relative group w-full rounded-2xl bg-white text-black py-3.5 font-medium overflow-hidden disabled:opacity-50"
                >

                  <span className="relative z-10">
                    {loading ? "Creating..." : "Create Business"}
                  </span>

                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                </motion.button>

              </form>

            </div>

          </motion.div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}