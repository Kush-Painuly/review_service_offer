import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import QRGenerator from "./pages/QRGenerator";

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/qr" element={<QRGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}