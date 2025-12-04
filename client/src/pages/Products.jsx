// import { useEffect, useState } from "react";
// import { api } from "../api.js";
// import ProductCard from "../components/ProductCard.jsx";
// import ProductModal from "../components/ProductModal.jsx";

// export default function Products() {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     api
//       .get("/categories")
//       .then((res) => setCategories(res.data))
//       .catch(() => {});
//   }, []);

//   useEffect(() => {
//     const params =
//       activeCategory && activeCategory !== "all"
//         ? { params: { category: activeCategory } }
//         : {};
//     api
//       .get("/products", params)
//       .then((res) => setProducts(res.data))
//       .catch(() => {});
//   }, [activeCategory]);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
//       {/* <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
//         Shop all gifts
//       </h1> */}
//       <div className="grid md:grid-cols-[220px,1fr] gap-6">
//         <aside className="bg-white rounded-2xl border border-pink-50 p-4 h-fit">
//           <h2 className="text-sm font-semibold text-gray-800 mb-2">
//             Categories
//           </h2>
//           <div className="space-y-1">
//             <button
//               type="button"
//               onClick={() => setActiveCategory("all")}
//               className={`text-xs w-full text-left px-2 py-1 rounded-full ${
//                 activeCategory === "all"
//                   ? "bg-brand-light text-gray-900"
//                   : "text-gray-600 hover:bg-pink-50"
//               }`}
//             >
//               All
//             </button>
//             {categories.map((c) => (
//               <button
//                 key={c._id}
//                 type="button"
//                 onClick={() => setActiveCategory(c._id)}
//                 className={`text-xs w-full text-left px-2 py-1 rounded-full ${
//                   activeCategory === c._id
//                     ? "bg-brand-light text-gray-900"
//                     : "text-gray-600 hover:bg-pink-50"
//                 }`}
//               >
//                 {c.name}
//               </button>
//             ))}
//           </div>
//         </aside>
//         <main>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {products.map((p) => (
//               <ProductCard
//                 key={p._id}
//                 product={p}
//                 onView={() => setSelected(p)}
//               />
//             ))}
//           </div>
//           {products.length === 0 && (
//             <p className="text-xs text-gray-500 mt-4">
//               Products will appear here once added in the admin panel.
//             </p>
//           )}
//         </main>
//       </div>
//       <ProductModal product={selected} onClose={() => setSelected(null)} />
//     </div>
//   );
// }


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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Discover Products
        </h1>
        <p className="text-gray-600">
          Find exactly what you're looking for in our curated collection
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Categories Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
              <FiFilter className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeCategory === "all"
                    ? "bg-gradient-to-r from-brand-light to-purple-50 text-gray-900 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50 hover:pl-5"
                }`}
              >
                <span className="font-medium">All Products</span>
                <span className="text-xs bg-white/60 px-2 py-1 rounded-full">
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
                      ? "bg-gradient-to-r from-brand-light to-purple-50 text-gray-900 shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:pl-5"
                  }`}
                >
                  <span className="font-medium">{c.name}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    12
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="lg:hidden flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-200 rounded-xl shadow-sm mb-4"
        >
          <FiFilter className="w-5 h-5" />
          <span className="font-medium">Filter by Category</span>
          <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {activeCategory === "all" ? "All" : 
              categories.find(c => c._id === activeCategory)?.name}
          </span>
        </button>

        {/* Mobile Categories Panel */}
        {showCategories && (
          <div className="lg:hidden bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6">
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("all");
                  setShowCategories(false);
                }}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl ${
                  activeCategory === "all"
                    ? "bg-brand-light text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="font-medium">All Products</span>
                <span className="text-xs bg-white/60 px-2 py-1 rounded-full">
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
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl ${
                    activeCategory === c._id
                      ? "bg-brand-light text-gray-900"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium">{c.name}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
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
              <span className="text-sm text-gray-600">Showing</span>
              <span className="font-semibold text-gray-900">
                {products.length} products
              </span>
              {activeCategory !== "all" && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">
                    in {categories.find(c => c._id === activeCategory)?.name}
                  </span>
                </>
              )}
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <MdGridView className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
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
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 1 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                {activeCategory === "all" 
                  ? "Products will appear here once added in the admin panel."
                  : `No products found in this category. Try selecting "All Products".`}
              </p>
              {activeCategory !== "all" && (
                <button
                  onClick={() => setActiveCategory("all")}
                  className="px-6 py-2 bg-brand-light text-gray-900 font-medium rounded-lg hover:bg-brand-light/80 transition-colors"
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