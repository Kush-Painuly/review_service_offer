import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";

export default function QRGenerator() {

  const [businessId, setBusinessId] = useState("");

  const qrRef = useRef();

  const baseUrl =
    "https://review-service-offer.vercel.app";

  useEffect(() => {

    const params = new URLSearchParams(
      window.location.search
    );

    const id = params.get("b");

    if (id) {
      setBusinessId(id);
    }

  }, []);

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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.05),transparent_40%),radial-gradient(circle_at_85%_30%,rgba(255,255,255,0.04),transparent_40%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >

        <div className="rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-8">

          <div className="text-center mb-8">

            <h1 className="text-3xl font-semibold">
              QR Generator
            </h1>

            <p className="text-white/50 mt-2">
              Download business review QR
            </p>

          </div>

          {qrValue && (

            <div className="flex flex-col items-center gap-6">

              <div className="p-4 rounded-2xl bg-white">

                <QRCodeCanvas
                  value={qrValue}
                  size={200}
                  ref={qrRef}
                />

              </div>

              <p className="text-sm text-white/60 text-center">
                {businessId}
              </p>

              <button
                onClick={downloadQR}
                className="
                  w-full
                  rounded-xl
                  bg-white
                  text-black
                  py-3
                  font-medium
                "
              >
                Download QR
              </button>

            </div>

          )}

        </div>
        {/* Footer */} <div className="text-center mt-8 text-xs text-neutral-600 tracking-[0.2em] uppercase"> Built for seamless sharing </div>

      </motion.div>

    </div>
  );
}