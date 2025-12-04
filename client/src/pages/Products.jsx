import { useEffect, useState } from "react";
import { api } from "../api.js";
import ProductCard from "../components/ProductCard.jsx";
import ProductModal from "../components/ProductModal.jsx";
import { FiFilter } from "react-icons/fi";
import { MdGridView, MdViewList } from "react-icons/md";

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const params =
      activeCategory && activeCategory !== "all"
        ? { params: { category: activeCategory } }
        : {};
    api
      .get("/products", params)
      .then((res) => setProducts(res.data))
      .catch(() => {});
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-800 mb-2">
          Discover Products
        </h1>
        <p className="text-neutral-600">
          Find exactly what you're looking for in our curated collection
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Categories Sidebar - Desktop */}
        {/* <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-brand-700">Categories</h2>
              <FiFilter className="w-5 h-5 text-neutral-400" />
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeCategory === "all"
                    ? "bg-gradient-to-r from-brand-50 to-theme-peach/20 text-brand-700 shadow-sm border border-brand-100"
                    : "text-neutral-700 hover:bg-neutral-50 hover:pl-5 hover:text-brand-600"
                }`}
              >
                <span className="font-medium">All Products</span>
                <span className="text-xs bg-white/80 px-2 py-1 rounded-full text-brand-600 border border-brand-100">
                  {products.length}
                </span>
              </button>
              {categories.map((c) => (
                <button
                  key={c._id}
                  type="button"
                  onClick={() => setActiveCategory(c._id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeCategory === c._id
                      ? "bg-gradient-to-r from-brand-50 to-theme-lightBlue/20 text-brand-700 shadow-sm border border-brand-100"
                      : "text-neutral-700 hover:bg-neutral-50 hover:pl-5 hover:text-brand-600"
                  }`}
                >
                  <span className="font-medium">{c.name}</span>
                  <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full border border-neutral-200">
                    12
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside> */}

        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="lg:hidden flex items-center justify-center gap-2 w-full py-3 bg-white border border-neutral-200 rounded-xl shadow-sm mb-4 hover:border-brand-300 transition-colors"
        >
          <FiFilter className="w-5 h-5 text-brand-600" />
          <span className="font-medium text-brand-700">Filter by Category</span>
          <span className="ml-auto text-sm text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            {activeCategory === "all" ? "All" : 
              categories.find(c => c._id === activeCategory)?.name}
          </span>
        </button>

        {/* Mobile Categories Panel */}
        {showCategories && (
          <div className="lg:hidden bg-white rounded-2xl shadow-lg border border-neutral-200 p-4 mb-6">
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("all");
                  setShowCategories(false);
                }}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors ${
                  activeCategory === "all"
                    ? "bg-brand-50 text-brand-700 border border-brand-100"
                    : "text-neutral-700 hover:bg-neutral-50 hover:text-brand-600"
                }`}
              >
                <span className="font-medium">All Products</span>
                <span className="text-xs bg-white/80 px-2 py-1 rounded-full text-brand-600">
                  {products.length}
                </span>
              </button>
              {categories.map((c) => (
                <button
                  key={c._id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(c._id);
                    setShowCategories(false);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors ${
                    activeCategory === c._id
                      ? "bg-brand-50 text-brand-700 border border-brand-100"
                      : "text-neutral-700 hover:bg-neutral-50 hover:text-brand-600"
                  }`}
                >
                  <span className="font-medium">{c.name}</span>
                  <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full">
                    12
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-600">Showing</span>
              <span className="font-semibold text-brand-700">
                {products.length} products
              </span>
              {activeCategory !== "all" && (
                <>
                  <span className="text-neutral-400">•</span>
                  <span className="text-sm text-neutral-600">
                    in {categories.find(c => c._id === activeCategory)?.name}
                  </span>
                </>
              )}
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-neutral-50 p-1 rounded-xl border border-neutral-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-brand-600 border border-neutral-300"
                    : "text-neutral-500 hover:text-brand-600 hover:bg-white"
                }`}
                aria-label="Grid view"
              >
                <MdGridView className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-brand-600 border border-neutral-300"
                    : "text-neutral-500 hover:text-brand-600 hover:bg-white"
                }`}
                aria-label="List view"
              >
                <MdViewList className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {products.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onView={() => setSelected(p)}
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-theme-peach/20 to-theme-lightBlue/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 1 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-brand-800 mb-2">
                No products found
              </h3>
              <p className="text-neutral-600 max-w-md mx-auto mb-6">
                {activeCategory === "all" 
                  ? "Products will appear here once added in the admin panel."
                  : `No products found in this category. Try selecting "All Products".`}
              </p>
              {activeCategory !== "all" && (
                <button
                  onClick={() => setActiveCategory("all")}
                  className="px-6 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors shadow-sm hover:shadow"
                >
                  View All Products
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}