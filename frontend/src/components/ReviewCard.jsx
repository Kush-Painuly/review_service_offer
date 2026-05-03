import { motion } from "framer-motion";

export default function ReviewCard({ review }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(review);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      className="group relative p-5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] transition-all"
    >
      {/* subtle inner highlight */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-20 pointer-events-none" />

      <p className="relative text-sm leading-relaxed text-neutral-200">
        {review}
      </p>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleCopy}
          className="text-xs text-white/60 hover:text-white transition-colors"
        >
          Copy
        </button>
      </div>
    </motion.div>
  );
}