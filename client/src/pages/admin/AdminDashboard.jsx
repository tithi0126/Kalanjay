
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../../api.js";

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">{label}</div>
        {icon && <div className="text-brand-500">{icon}</div>}
      </div>
      <div className="text-2xl font-bold text-neutral-900">{value}</div>
    </div>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${active
        ? "bg-neutral-900 text-white shadow-lg shadow-neutral-200"
        : "bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
        }`}
    >
      {label}
    </button>
  );
}

function ProductsTab() {
  const fileInputRef = useRef(null);
  const emptyForm = {
    name: "",
    slug: "",
    category: "",
    imageUrl: "",
    priceFrom: "",
    priceTo: "",
    isTopPick: false,
    isActive: true,
  };

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([api.get("/products/admin"), api.get("/categories/admin")])
      .then(([p, c]) => {
        setItems(p.data);
        setCategories(c.data);
      })
      .catch(() => {
        setError("Failed to load products.");
      })
      .finally(() => setLoading(false));
  }, []);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name || "",
      slug: item.slug || "",
      category: item.category?._id || "",
      imageUrl: item.images && item.images.length > 0 ? item.images[0] : "",
      priceFrom: item.priceFrom ?? "",
      priceTo: item.priceTo ?? "",
      isTopPick: !!item.isTopPick,
      isActive: !!item.isActive,
    });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((f) => ({
        ...f,
        imageUrl: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      images: form.imageUrl ? [form.imageUrl] : [],
      priceFrom: form.priceFrom ? Number(form.priceFrom) : undefined,
      priceTo: form.priceTo ? Number(form.priceTo) : undefined,
    };

    try {
      if (editingId) {
        const res = await api.put(`/products/${editingId}`, payload);
        setItems((list) =>
          list.map((i) => (i._id === editingId ? res.data : i))
        );
      } else {
        const res = await api.post("/products", payload);
        setItems((list) => [res.data, ...list]);
      }
      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      setError("Failed to save product.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      setItems((list) => list.filter((i) => i._id !== id));
    } catch {
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-neutral-900">Products</h2>
          <p className="text-sm text-neutral-500">Manage your product catalog</p>
        </div>
        {/* <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white text-sm font-medium px-4 py-2 hover:bg-neutral-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add product
        </button> */}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm space-y-5"
      >
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
              required
              placeholder="e.g. Custom Hamper"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide">Slug</label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
              required
              placeholder="e.g. custom-hamper"
            />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide">
              Image URL
            </label>
            <div className="flex gap-3">
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="flex-1 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
              />
            </div>

            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 rounded-xl px-6 py-8 text-sm text-neutral-500 hover:border-brand-300 hover:bg-brand-50/30 cursor-pointer transition-all"
            >
              <svg className="w-8 h-8 text-neutral-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium text-brand-600">Click to upload</span> or drag and drop
              <span className="text-xs text-neutral-400 mt-1">SVG, PNG, JPG or GIF</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
            {form.imageUrl && (
              <div className="mt-3 inline-flex items-center gap-3 p-2 rounded-lg border border-neutral-100 bg-neutral-50">
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="w-16 h-16 rounded-md object-cover border border-neutral-200"
                />
                <button
                  type="button"
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      imageUrl: "",
                    }))
                  }
                  className="text-xs font-medium text-red-500 hover:text-red-600 px-2"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide">
              Category
            </label>
            <div className="relative">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-neutral-200 px-4 py-2.5 text-sm bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
              >
                <option value="">Select a category...</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                Price from
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">₹</span>
                <input
                  type="number"
                  name="priceFrom"
                  value={form.priceFrom}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-200 pl-8 pr-4 py-2.5 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                Price to
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">₹</span>
                <input
                  type="number"
                  name="priceTo"
                  value={form.priceTo}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-200 pl-8 pr-4 py-2.5 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 pt-2">
          <label className="inline-flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
            <input
              type="checkbox"
              name="isTopPick"
              checked={form.isTopPick}
              onChange={handleChange}
              className="w-4 h-4 rounded border-neutral-300 text-brand-600 focus:ring-brand-500"
            />
            Top pick
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="w-4 h-4 rounded border-neutral-300 text-brand-600 focus:ring-brand-500"
            />
            Active
          </label>
        </div>

        {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>}

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-full bg-brand-600 text-white text-sm font-medium px-6 py-2.5 shadow-lg shadow-brand-200 hover:bg-brand-700 hover:shadow-brand-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Saving...
              </>
            ) : editingId ? (
              "Update Product"
            ) : (
              "Create Product"
            )}
          </button>
        </div>
      </form>

      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-neutral-500">Loading products...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">No products found. Start by adding one!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left align-middle">
              <thead className="bg-neutral-50 text-xs font-semibold text-neutral-500 uppercase tracking-wider border-b border-neutral-100">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {items.map((p) => (
                  <tr key={p._id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden flex-shrink-0">
                          {p.images && p.images.length > 0 ? (
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-400">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-neutral-900">{p.name}</div>
                          <div className="text-xs text-neutral-500 font-mono mt-0.5">
                            {p.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {p.category ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                          {p.category.name}
                        </span>
                      ) : (
                        <span className="text-neutral-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600 font-medium">
                      {p.priceFrom != null || p.priceTo != null ? (
                        <span>
                          ₹{p.priceFrom ?? "?"} - ₹{p.priceTo ?? "?"}
                        </span>
                      ) : (
                        <span className="text-neutral-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {p.isTopPick && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                            Top Pick
                          </span>
                        )}
                        {p.isActive ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">
                            Draft
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => startEdit(p)}
                          className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p._id)}
                          className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoriesTab() {
  const emptyForm = { name: "", slug: "", isActive: true };
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get("/categories/admin")
      .then((res) => setItems(res.data))
      .catch(() => setError("Failed to load categories."))
      .finally(() => setLoading(false));
  }, []);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name || "",
      slug: item.slug || "",
      isActive: !!item.isActive,
    });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editingId) {
        const res = await api.put(`/categories/${editingId}`, form);
        setItems((list) =>
          list.map((i) => (i._id === editingId ? res.data : i))
        );
      } else {
        const res = await api.post("/categories", form);
        setItems((list) => [res.data, ...list]);
      }
      setForm(emptyForm);
      setEditingId(null);
    } catch {
      setError("Failed to save category.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await api.delete(`/categories/${id}`);
      setItems((list) => list.filter((i) => i._id !== id));
    } catch {
      alert("Failed to delete category.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-neutral-900">Categories</h2>
          <p className="text-sm text-neutral-500">Organize your products</p>
        </div>
        {/* <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white text-sm font-medium px-4 py-2 hover:bg-neutral-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add category
        </button> */}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm space-y-5"
      >
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
              required
              placeholder="e.g. Hampers"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide">Slug</label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
              required
              placeholder="e.g. hampers"
            />
          </div>
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
            className="w-4 h-4 rounded border-neutral-300 text-brand-600 focus:ring-brand-500"
          />
          Active
        </label>

        {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>}

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-full bg-brand-600 text-white text-sm font-medium px-6 py-2.5 shadow-lg shadow-brand-200 hover:bg-brand-700 hover:shadow-brand-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Saving...
              </>
            ) : editingId ? (
              "Update Category"
            ) : (
              "Create Category"
            )}
          </button>
        </div>
      </form>

      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-neutral-500">Loading categories...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">No categories yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left align-middle">
              <thead className="bg-neutral-50 text-xs font-semibold text-neutral-500 uppercase tracking-wider border-b border-neutral-100">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {items.map((c) => (
                  <tr key={c._id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-neutral-900">{c.name}</td>
                    <td className="px-6 py-4 text-sm text-neutral-500 font-mono">{c.slug}</td>
                    <td className="px-6 py-4">
                      {c.isActive ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">
                          Hidden
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => startEdit(c)}
                          className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(c._id)}
                          className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewsTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get("/reviews/admin")
      .then((res) => setItems(res.data))
      .catch(() => setError("Failed to load reviews."))
      .finally(() => setLoading(false));
  }, []);

  const toggleApproved = async (review) => {
    try {
      const res = await api.put(`/reviews/${review._id}`, {
        isApproved: !review.isApproved,
      });
      setItems((list) =>
        list.map((r) => (r._id === review._id ? res.data : r))
      );
    } catch {
      alert("Failed to update review.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await api.delete(`/reviews/${id}`);
      setItems((list) => list.filter((r) => r._id !== id));
    } catch {
      alert("Failed to delete review.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-neutral-900">Reviews</h2>
        <p className="text-sm text-neutral-500">Manage customer reviews</p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-neutral-500">Loading reviews...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">No reviews yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left align-middle">
              <thead className="bg-neutral-50 text-xs font-semibold text-neutral-500 uppercase tracking-wider border-b border-neutral-100">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {items.map((r) => (
                  <tr key={r._id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-900">{r.customerName}</div>
                      <div className="text-sm text-neutral-500 line-clamp-2 max-w-md mt-0.5">
                        "{r.text}"
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-neutral-900">{r.rating}</span>
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {r.isApproved ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => toggleApproved(r)}
                          className={`text-sm font-medium transition-colors ${r.isApproved
                            ? "text-amber-600 hover:text-amber-700"
                            : "text-emerald-600 hover:text-emerald-700"
                            }`}
                        >
                          {r.isApproved ? "Unapprove" : "Approve"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(r._id)}
                          className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function InquiriesTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get("/inquiries")
      .then((res) => setItems(res.data))
      .catch(() => setError("Failed to load inquiries."))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/inquiries/${id}`, { status });
      setItems((list) =>
        list.map((q) => (q._id === id ? res.data : q))
      );
    } catch {
      alert("Failed to update inquiry.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-neutral-900">Inquiries</h2>
        <p className="text-sm text-neutral-500">Manage customer inquiries</p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-neutral-500">Loading inquiries...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">No inquiries yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left align-middle">
              <thead className="bg-neutral-50 text-xs font-semibold text-neutral-500 uppercase tracking-wider border-b border-neutral-100">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {items.map((q) => (
                  <tr key={q._id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-900">{q.name}</div>
                      <div className="text-sm text-neutral-500">{q.phone}</div>
                      {q.productName && (
                        <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded bg-neutral-100 text-xs text-neutral-600">
                          Product: {q.productName}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="text-sm text-neutral-700 whitespace-pre-wrap line-clamp-3">
                        {q.message}
                      </div>
                      <div className="text-xs text-neutral-400 mt-1">
                        {new Date(q.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {(() => {
                        const status = q.status || "new";
                        const labelMap = {
                          new: "New",
                          in_progress: "In progress",
                          closed: "Closed",
                        };
                        const colorClasses =
                          status === "closed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : status === "in_progress"
                            ? "bg-sky-50 text-sky-700 border border-sky-100"
                            : "bg-amber-50 text-amber-700 border border-amber-100";
                        return (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}
                          >
                            {labelMap[status] || status}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select
                        value={q.status || "new"}
                        onChange={(e) => updateStatus(q._id, e.target.value)}
                        className="text-sm border-none bg-transparent font-medium text-brand-600 focus:ring-0 cursor-pointer hover:text-brand-700"
                      >
                        <option value="new">Mark New</option>
                        <option value="in_progress">Mark In progress</option>
                        <option value="closed">Mark Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const CONTENT_KEYS = [
  {
    key: "hero_banner",
    label: "Hero banner",
    description: "Main banner on the homepage with headline and intro.",
    location: "Homepage top",
  },
  {
    key: "offers_section",
    label: "Offers section",
    description: "Highlight special offers or seasonal collections.",
    location: "Homepage offers strip",
  },
  {
    key: "about_section",
    label: "About section",
    description: "Short story about Kalanjay and what you offer.",
    location: "About page / homepage",
  },
  {
    key: "services_section",
    label: "Services section",
    description: "Overview of gifting / decor services.",
    location: "Services page / homepage",
  },
  {
    key: "homepage_intro",
    label: "Homepage intro",
    description: "Intro text just below hero to explain your brand.",
    location: "Homepage middle",
  },
];

function ContentBlockEditor({ blockKey, label }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get(`/content/${blockKey}`)
      .then((res) => {
        setTitle(res.data.title || "");
        setBody(res.data.body || "");
        setLastSavedAt(res.data.updatedAt || res.data.createdAt || null);
        setHasChanges(false);
      })
      .catch(() => {
        // not found is ok, we'll create on save
      })
      .finally(() => setLoading(false));
  }, [blockKey]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await api.put(`/content/${blockKey}`, {
        key: blockKey,
        title,
        body,
      });
      setLastSavedAt(res.data.updatedAt || new Date().toISOString());
      setHasChanges(false);
    } catch {
      setError("Failed to save content.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSave}
      className="bg-white rounded-2xl border border-pink-50 p-4 space-y-3 text-xs"
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-semibold text-gray-900">{label}</h3>
          {hasChanges && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] border border-amber-100">
              Unsaved changes
            </span>
          )}
        </div>
        <span className="text-[10px] text-gray-400 font-mono">{blockKey}</span>
      </div>
      {loading ? (
        <p className="text-gray-500 text-xs">Loading...</p>
      ) : (
        <>
          <div>
            <label className="block mb-1 text-[11px] text-gray-600">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setHasChanges(true);
              }}
              className="w-full rounded-xl border border-pink-100 px-3 py-2 text-xs focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-[11px] text-gray-600">
              Body
            </label>
            <textarea
              rows={4}
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
                setHasChanges(true);
              }}
              className="w-full rounded-xl border border-pink-100 px-3 py-2 text-xs resize-y min-h-[96px] focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
            />
            <div className="mt-1 flex items-center justify-between text-[10px] text-gray-400">
              <span>{body?.length || 0} characters</span>
              {lastSavedAt && (
                <span>
                  Last saved{" "}
                  {new Date(lastSavedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>
          {error && <p className="text-[11px] text-red-500">{error}</p>}
          {/* <button
            type="submit"
            disabled={saving}
            className="mt-1 inline-flex items-center justify-center rounded-full bg-brand-dark text-white text-xs font-medium px-4 py-2 disabled:opacity-60 hover:bg-brand-700 transition-colors"
          >
            {saving ? "Saving..." : "Save content"}
          </button>
           */}
           <button
  type="submit"
  disabled={saving}
  className="mt-1 inline-flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-medium px-4 py-2 disabled:opacity-60 hover:bg-blue-700 transition-colors"
>
  {saving ? "Saving..." : "Save content"}
</button>

        </>
      )}
    </form>
  );
}

function ContentTab() {
  const [selectedKey, setSelectedKey] = useState(CONTENT_KEYS[0]?.key);
  const [search, setSearch] = useState("");

  const filteredBlocks = CONTENT_KEYS.filter(
    (b) =>
      b.label.toLowerCase().includes(search.toLowerCase()) ||
      b.key.toLowerCase().includes(search.toLowerCase())
  );

  const activeBlock =
    filteredBlocks.find((b) => b.key === selectedKey) || filteredBlocks[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-gray-900">Page content</h2>
        <p className="text-[11px] text-gray-500">
          Edit key homepage sections. Changes show up on the live site
          immediately after saving.
        </p>
      </div>

      <div className="grid md:grid-cols-[220px,minmax(0,1fr)] gap-4">
        {/* Left: content list & search */}
        <aside className="bg-white rounded-2xl border border-pink-50 p-3 space-y-3">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-gray-600">
              Find a section
            </label>
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or key..."
                className="w-full rounded-xl border border-pink-100 px-3 py-1.5 text-[11px] pr-7 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="border-t border-pink-50 pt-2 space-y-1 max-h-[260px] overflow-y-auto">
            {filteredBlocks.map((b) => (
              <button
                key={b.key}
                type="button"
                onClick={() => setSelectedKey(b.key)}
                className={`w-full text-left px-3 py-2 rounded-xl text-[11px] transition-colors ${
                  activeBlock?.key === b.key
                    ? "bg-brand-50 text-brand-700 border border-brand-100"
                    : "hover:bg-neutral-50 text-gray-700 border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{b.label}</span>
                  <span className="text-[9px] text-gray-400 font-mono">
                    {b.key}
                  </span>
                </div>
                {b.location && (
                  <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full bg-neutral-50 text-[9px] text-gray-500 border border-neutral-100">
                    {b.location}
                  </div>
                )}
              </button>
            ))}
            {filteredBlocks.length === 0 && (
              <p className="text-[11px] text-gray-400 italic px-1">
                No sections match your search.
              </p>
            )}
          </div>
        </aside>

        {/* Right: editor + quick preview */}
        <section className="space-y-3">
          {activeBlock && (
            <>
              {activeBlock.description && (
                <div className="bg-brand-50 border border-brand-100 text-[11px] text-brand-800 rounded-2xl px-3 py-2">
                  {activeBlock.description}
                </div>
              )}

              <div className="grid lg:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] gap-3">
                <ContentBlockEditor
                  key={activeBlock.key}
                  blockKey={activeBlock.key}
                  label={activeBlock.label}
                />

                <div className="bg-white rounded-2xl border border-neutral-100 p-4 space-y-2 text-xs hidden lg:block">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[11px] font-semibold text-gray-900">
                      Live preview (approx.)
                    </h3>
                    <span className="text-[10px] text-gray-400">
                      Read-only preview
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500">
                    This is a simple preview of how this content might appear on
                    the site. Actual styling may vary slightly.
                  </p>
                  <div className="mt-2 rounded-xl border border-neutral-100 bg-neutral-50 px-3 py-3 space-y-1.5">
                    <div className="text-xs font-semibold text-gray-900">
                      {/** We intentionally reuse title/body via props key refresh */}
                      {/** The real values are inside ContentBlockEditor; this is a soft placeholder. */}
                      {activeBlock.label}
                    </div>
                    <p className="text-[11px] text-gray-600 line-clamp-4">
                      Content for this block will show here after saving on the
                      live site.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function SettingsTab() {
  const [form, setForm] = useState({
    businessName: "",
    phone: "",
    email: "",
    whatsappNumber: "",
    instagramUrl: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get("/settings")
      .then((res) => {
        if (res.data) {
          setForm((prev) => ({
            ...prev,
            ...res.data,
          }));
        }
      })
      .catch(() => setError("Failed to load settings."))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.put("/settings", form);
    } catch {
      setError("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-gray-900">Site settings</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-pink-50 p-4 space-y-3 text-xs"
      >
        {loading ? (
          <p className="text-gray-500 text-xs">Loading settings...</p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 text-[11px] text-gray-600">
                  Business name
                </label>
                <input
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-pink-100 px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block mb-1 text-[11px] text-gray-600">
                  Phone
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-pink-100 px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block mb-1 text-[11px] text-gray-600">
                  Email
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-pink-100 px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block mb-1 text-[11px] text-gray-600">
                  WhatsApp number
                </label>
                <input
                  name="whatsappNumber"
                  value={form.whatsappNumber}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-pink-100 px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 text-[11px] text-gray-600">
                  Instagram URL
                </label>
                <input
                  name="instagramUrl"
                  value={form.instagramUrl}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-pink-100 px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block mb-1 text-[11px] text-gray-600">
                  Address
                </label>
                <textarea
                  name="address"
                  rows={3}
                  value={form.address}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-pink-100 px-3 py-2 text-xs"
                />
              </div>
            </div>

            {error && <p className="text-[11px] text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="mt-1 inline-flex items-center justify-center rounded-full bg-brand-dark text-white text-xs font-medium px-4 py-2 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save settings"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    reviews: 0,
    inquiries: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("kalanjay_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    setAuthToken(token);

    Promise.all([
      api.get("/products/admin"),
      api.get("/categories/admin"),
      api.get("/reviews/admin"),
      api.get("/inquiries"),
    ])
      .then(([p, c, r, i]) => {
        setStats({
          products: p.data.length,
          categories: c.data.length,
          reviews: r.data.length,
          inquiries: i.data.length,
        });
        setRecentInquiries(i.data.slice(0, 5));
      })
      .catch(() => { });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("kalanjay_token");
    setAuthToken(null);
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#fff5f8]">
      <header className="bg-white border-b border-pink-100 px-4 py-3 flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">Kalanjay Admin</div>
        <button
          type="button"
          onClick={logout}
          className="text-xs text-gray-600 hover:text-gray-900"
        >
          Logout
        </button>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          <div className="flex flex-wrap gap-2">
            <TabButton
              label="Overview"
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <TabButton
              label="Products"
              active={activeTab === "products"}
              onClick={() => setActiveTab("products")}
            />
            <TabButton
              label="Categories"
              active={activeTab === "categories"}
              onClick={() => setActiveTab("categories")}
            />
            <TabButton
              label="Reviews"
              active={activeTab === "reviews"}
              onClick={() => setActiveTab("reviews")}
            />
            <TabButton
              label="Inquiries"
              active={activeTab === "inquiries"}
              onClick={() => setActiveTab("inquiries")}
            />
            <TabButton
              label="Content"
              active={activeTab === "content"}
              onClick={() => setActiveTab("content")}
            />
            <TabButton
              label="Settings"
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
            />
          </div>
        </div>

        {activeTab === "dashboard" && (
          <>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <StatCard label="Total products" value={stats.products} />
              <StatCard label="Total categories" value={stats.categories} />
              <StatCard label="Total reviews" value={stats.reviews} />
              <StatCard label="New inquiries" value={stats.inquiries} />
            </div>
            <section className="bg-white rounded-2xl border border-pink-50 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-900">
                  Latest inquiries
                </h2>
              </div>
              <div className="space-y-2 text-xs text-gray-700">
                {recentInquiries.map((q) => (
                  <div
                    key={q._id}
                    className="flex justify-between gap-4 border-b border-pink-50 pb-2 last:border-0"
                  >
                    <div>
                      <div className="font-semibold">{q.name}</div>
                      <div className="text-gray-500">{q.phone}</div>
                      <div className="text-gray-600 mt-1 line-clamp-2">
                        {q.message}
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-400 whitespace-nowrap">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {recentInquiries.length === 0 && (
                  <p className="text-xs text-gray-500">
                    No inquiries yet. Contact form submissions will appear here.
                  </p>
                )}
              </div>
            </section>
          </>
        )}

        {activeTab === "products" && <ProductsTab />}
        {activeTab === "categories" && <CategoriesTab />}
        {activeTab === "reviews" && <ReviewsTab />}
        {activeTab === "inquiries" && <InquiriesTab />}
        {activeTab === "content" && <ContentTab />}
        {activeTab === "settings" && <SettingsTab />}
      </main>
    </div>
  );
}

