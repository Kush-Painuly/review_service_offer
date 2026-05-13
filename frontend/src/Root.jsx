import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import QRGenerator from "./pages/QRGenerator";
import Dashboard from "./pages/Dashboard";
import BusinessManagement from "./pages/BusinessManagement";

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/qr" element={<QRGenerator />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage" element={<BusinessManagement />} />
      </Routes>
    </BrowserRouter>
  );
}