import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateBusinessModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({
    business_name: "",
    business_slug: "",
    category: "",
    keywords: [],
    google_review_url: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleKeywordFile(e) {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file.name);

    try {
      const text = await file.text();

      const keywords = text
        .split(/[\n,\r;]+/)
        .map((item) => item.trim())
        .filter(Boolean);

      setForm((prev) => ({
        ...prev,
        keywords,
      }));
    } catch (err) {
      console.error(err);
      alert("Unable to read this file.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await onCreate(form);

      setForm({
        business_name: "",
        business_slug: "",
        category: "",
        keywords: [],
        google_review_url: "",
      });

      setSelectedFile(null);

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create business");
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-5"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.97,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.97,
              y: 20,
            }}
            transition={{
              duration: 0.28,
              ease: "easeOut",
            }}
            className="
              relative
              w-full
              max-w-2xl
              max-h-[90vh]
              overflow-y-auto
              rounded-[30px]
              border border-white/10
              bg-white/[0.05]
              backdrop-blur-3xl
              shadow-[0_30px_100px_rgba(0,0,0,.75)]
            "
          >
            {/* Ambient Glow */}

            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-20 pointer-events-none" />

            <div className="relative p-6 md:p-8">
              {/* Header */}

              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 mb-4">
                    <div className="w-2 h-2 rounded-full bg-white/70" />

                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                      Business Setup
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    Create Business
                  </h2>

                  <p className="text-sm text-white/45 mt-2 max-w-md">
                    Configure a new business profile for AI-powered review
                    generation.
                  </p>
                </div>

                <motion.button
                  whileHover={{
                    rotate: 90,
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.92,
                  }}
                  type="button"
                  onClick={onClose}
                  className="
                    w-10
                    h-10
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.04]
                    hover:bg-white/[0.08]
                    transition-all
                    flex
                    items-center
                    justify-center
                    text-white/60
                  "
                >
                  ✕
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* BUSINESS INFORMATION */}

                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-px bg-white/15" />

                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                      Business Information
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Business Name"
                      name="business_name"
                      value={form.business_name}
                      onChange={handleChange}
                      placeholder="Acme Coffee"
                    />

                    <Input
                      label="Business Slug"
                      name="business_slug"
                      value={form.business_slug}
                      onChange={handleChange}
                      placeholder="acme-coffee"
                    />

                    <Input
                      label="Category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      placeholder="Cafe, Restaurant..."
                    />

                    <Input
                      label="Google Review URL"
                      name="google_review_url"
                      value={form.google_review_url}
                      onChange={handleChange}
                      placeholder="https://g.page/..."
                    />
                  </div>
                </section>

                {/* REVIEW CONFIGURATION */}

                <section>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-px bg-white/15" />

                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                      Review Configuration
                    </p>
                  </div>

                  <label
                    htmlFor="keywords"
                    className="
                      group
                      relative
                      flex
                      flex-col
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-dashed
                      border-white/15
                      bg-white/[0.03]
                      hover:bg-white/[0.05]
                      hover:border-white/25
                      transition-all
                      duration-300
                      cursor-pointer
                      py-7
                      px-6
                    "
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] flex items-center justify-center text-xl mb-3 group-hover:scale-105 transition">
                      📄
                    </div>

                    <p className="font-medium">Upload Keywords File</p>

                    <p className="text-sm text-white/45 mt-1 text-center">
                      TXT, CSV or plain text • One keyword per line
                    </p>

                    <input
                      id="keywords"
                      hidden
                      type="file"
                      accept="*/*"
                      onChange={handleKeywordFile}
                    />
                  </label>
                  {selectedFile && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="
                        mt-4
                        rounded-2xl
                        border
                        border-green-500/20
                        bg-green-500/[0.04]
                        backdrop-blur-xl
                        p-4
                      "
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center text-lg">
                            ✓
                          </div>

                          <div>
                            <h4 className="font-medium text-green-300">
                              {selectedFile}
                            </h4>

                            <p className="text-sm text-white/45 mt-0.5">
                              {form.keywords.length} keywords successfully
                              imported
                            </p>
                          </div>
                        </div>

                        <div className="hidden sm:flex items-center">
                          <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-green-300">
                            Ready
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </section>

                {/* Footer */}

                <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    type="button"
                    onClick={onClose}
                    className="
                      w-full
                      sm:w-auto
                      px-6
                      py-3
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      hover:bg-white/[0.06]
                      transition-all
                    "
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    disabled={loading}
                    type="submit"
                    className="
                      w-full
                      sm:w-auto
                      min-w-[220px]
                      rounded-2xl
                      bg-white
                      text-black
                      py-3.5
                      px-8
                      font-medium
                      shadow-[0_15px_35px_rgba(255,255,255,0.08)]
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    "
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                        Creating Business...
                      </div>
                    ) : (
                      "Create Business"
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] uppercase tracking-[0.18em] text-white/35">
        {label}
      </label>

      <input
        {...props}
        required
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          px-4
          py-3
          text-white
          placeholder:text-white/30
          outline-none
          transition-all
          duration-300
          focus:border-white/20
          focus:bg-white/[0.06]
          focus:ring-2
          focus:ring-white/10
        "
      />
    </div>
  );
}
