import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateBusinessModal({
  open,
  onClose,
  onCreate,
}) {
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xl p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: .96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: .96, y: 10 }}
            transition={{ duration: .3 }}
            className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,.75)] overflow-hidden"
          >
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-20 pointer-events-none" />

            <div className="relative p-8 md:p-10">

              {/* Header */}

              <div className="flex justify-between items-start mb-10">

                <div>

                  <h2 className="text-3xl font-semibold tracking-tight">
                    Create Business
                  </h2>

                  <p className="text-white/45 mt-2">
                    Configure a new business profile for AI review generation.
                  </p>

                </div>

                <motion.button
                  whileHover={{ rotate: 90, scale: 1.08 }}
                  whileTap={{ scale: .9 }}
                  onClick={onClose}
                  type="button"
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.05] hover:bg-white/[0.08] flex items-center justify-center text-white/60"
                >
                  ✕
                </motion.button>

              </div>

              <form onSubmit={handleSubmit}>

                {/* BUSINESS INFORMATION */}

                <div className="mb-10">

                  <h3 className="text-xs uppercase tracking-[0.22em] text-white/35 mb-5">
                    Business Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

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

                </div>

                {/* REVIEW CONFIGURATION */}

                <div>

                  <h3 className="text-xs uppercase tracking-[0.22em] text-white/35 mb-5">
                    Review Configuration
                  </h3>

                  <label
                    htmlFor="keywords"
                    className="group flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/25 transition-all duration-300 cursor-pointer py-10"
                  >

                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">
                      📄
                    </div>

                    <p className="font-medium">
                      Upload Keywords File
                    </p>

                    <p className="text-sm text-white/45 mt-2">
                      TXT, CSV or any text document
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
                      className="mt-5 rounded-2xl border border-green-500/20 bg-green-500/5 p-5"
                    >

                      <div className="flex justify-between items-center">

                        <div>

                          <h4 className="font-medium text-green-300">
                            ✓ {selectedFile}
                          </h4>

                          <p className="text-sm text-white/45 mt-1">
                            {form.keywords.length} keywords successfully imported
                          </p>

                        </div>

                        <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-300 text-xs uppercase tracking-wider">
                          Ready
                        </span>

                      </div>

                    </motion.div>

                  )}

                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: .98 }}
                  disabled={loading}
                  className="mt-10 w-full rounded-2xl bg-white text-black py-4 font-medium shadow-lg disabled:opacity-50"
                >
                  {loading ? "Creating Business..." : "Create Business"}
                </motion.button>

              </form>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Input({
  label,
  ...props
}) {
  return (
    <div className="space-y-2">

      <label className="text-xs uppercase tracking-[0.18em] text-white/35">
        {label}
      </label>

      <input
        {...props}
        required
        className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 focus:ring-2 focus:ring-white/10 transition-all duration-300"
      />

    </div>
  );
}