import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";

export default function QRGenerator() {
  const [businessId, setBusinessId] = useState("");
  const qrRef = useRef();

  const baseUrl = "https://review-service-offer.vercel.app/";

  const qrValue = businessId
    ? `${baseUrl}/?b=${businessId}`
    : "";

  const downloadQR = () => {
    const canvas = qrRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = url;
    link.download = `${businessId}-qr.png`;
    link.click();
  };

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
        className="relative w-full max-w-md z-10"
      >

        {/* Glass Card */}
        <div className="relative rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">

          {/* Inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 pointer-events-none" />

          <div className="relative p-6 sm:p-8 md:p-10">

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold tracking-tight">
                QR Code Generator
              </h1>
              <p className="text-neutral-400 mt-3 text-sm">
                Generate and download a scannable review link
              </p>
            </div>

            {/* Input */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter Business ID (e.g. abc123)"
                value={businessId}
                onChange={(e) => setBusinessId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              />
            </div>

            {/* QR + Actions */}
            {qrValue && (
              <div className="flex flex-col items-center gap-6 mt-6">

                {/* QR */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="p-4 rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
                >
                  <QRCodeCanvas value={qrValue} size={180} ref={qrRef} />
                </motion.div>

                {/* Actions */}
                <div className="flex w-full gap-3">

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={downloadQR}
                    className="flex-1 px-4 py-3 rounded-xl bg-white text-black font-medium"
                  >
                    Download QR
                  </motion.button>

                </div>

                {/* URL */}
                <p className="text-xs text-white/50 text-center break-all max-w-xs">
                  {qrValue}
                </p>

              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-neutral-600 tracking-[0.2em] uppercase">
          Built for seamless sharing
        </div>

      </motion.div>
    </div>
  );
}