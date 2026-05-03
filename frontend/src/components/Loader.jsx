import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex flex-col items-center gap-4 mt-6">

      {/* Animated dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut"
            }}
            className="w-2 h-2 rounded-full bg-white/70"
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-xs tracking-wide text-white/50">
        Generating reviews
      </p>

      {/* Subtle shimmer line */}
      <div className="relative w-40 h-[2px] bg-white/10 overflow-hidden rounded-full">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
      </div>

    </div>
  );
}