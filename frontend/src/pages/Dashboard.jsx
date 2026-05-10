import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { motion } from "framer-motion";

import { useDashboard } from "../hooks/useDashboard";

export default function Dashboard() {
  const { summary, ratings, loading, error } = useDashboard();

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

          <p className="text-sm text-white/50 tracking-wide">
            Loading dashboard
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

  const cards = [
    {
      label: "QR Scans",
      value: summary?.total_scans || 0,
    },
    {
      label: "Reviews Generated",
      value: summary?.total_reviews || 0,
    },
    {
      label: "Google Redirects",
      value: summary?.total_redirects || 0,
    },
    {
      label: "Conversion Rate",
      value: `${summary?.conversion_rate || 0}%`,
    },
  ];

  console.log("ratings =", ratings);
  console.log("type =", typeof ratings);

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white px-4 sm:px-6 py-10 overflow-hidden">
      {/* Ambient gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.05),transparent_35%),radial-gradient(circle_at_90%_30%,rgba(255,255,255,0.04),transparent_40%)]" />

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
            Analytics Dashboard
          </h1>

          <p className="text-white/50 mt-3 text-sm md:text-base">
            Monitor review engagement and customer conversion performance
          </p>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {cards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{
                scale: 1.02,
                y: -2,
              }}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
            >
              {/* subtle highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-20 pointer-events-none" />

              <div className="relative p-6">
                <p className="text-white/45 text-sm tracking-wide">
                  {card.label}
                </p>

                <h2 className="text-4xl font-semibold mt-4 tracking-tight">
                  {card.value}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          {/* glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-20 pointer-events-none" />

          <div className="relative p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Rating Distribution
              </h2>

              <p className="text-white/45 text-sm mt-2">
                Breakdown of customer sentiment across ratings
              </p>
            </div>

            <div className="h-[380px] md:h-[420px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ratings}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    stroke="rgba(255,255,255,0.06)"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="rating"
                    tick={{
                      fill: "rgba(255,255,255,0.5)",
                      fontSize: 12,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{
                      fill: "rgba(255,255,255,0.5)",
                      fontSize: 12,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    cursor={{
                      fill: "rgba(255,255,255,0.03)",
                    }}
                    contentStyle={{
                      background: "rgba(15,15,15,0.95)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "16px",
                      color: "white",
                      backdropFilter: "blur(12px)",
                    }}
                  />

                  <Bar
                    dataKey="count"
                    radius={[12, 12, 0, 0]}
                    fill="rgba(255,255,255,0.9)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-neutral-600 tracking-[0.2em] uppercase">
          Real-time business intelligence
        </div>
      </div>
    </div>
  );
}
