import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../../api.js";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      const { token } = res.data;
      localStorage.setItem("kalanjay_token", token);
      setAuthToken(token);
      navigate("/admin");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-200/50 p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-50 text-brand-600 mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">Welcome back</h1>
          <p className="text-sm text-neutral-500 mt-2">
            Sign in to manage your store
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
              placeholder="admin@kalanjay.com"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-neutral-900 text-white text-sm font-medium px-4 py-3.5 shadow-lg shadow-neutral-200 hover:bg-brand-600 hover:shadow-brand-200 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}


