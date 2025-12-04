import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route
          path="/admin/login"
          element={
            // Admin login has its own full-screen layout
            <AdminLogin />
          }
        />
        <Route
          path="/admin"
          element={
            // Admin dashboard has its own layout as well
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


