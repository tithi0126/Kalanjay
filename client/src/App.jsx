import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream"> {/* Added bg-cream */}
      <Routes>
        <Route
          path="/admin/login"
          element={
            <AdminLogin />
          }
        />
        <Route
          path="/admin"
          element={
            <AdminDashboard />
          }
        />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <main className="flex-1">
                <Home />
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}