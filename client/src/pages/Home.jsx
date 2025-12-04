// import { useEffect, useState } from "react";
// import Hero from "../components/Hero.jsx";
// import ProductCard from "../components/ProductCard.jsx";
// import ProductModal from "../components/ProductModal.jsx";
// import ReviewCard from "../components/ReviewCard.jsx";
// import About from "./About.jsx";
// import Services from "./Services.jsx";
// import ReviewsPage from "./Reviews.jsx";
// import ContactPage from "./Contact.jsx";
// import Products from "./Products.jsx";
// import { api } from "../api.js";

// export default function Home() {
//   const [topProducts, setTopProducts] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [homeReviews, setHomeReviews] = useState([]);

//   useEffect(() => {
//     api
//       .get("/products?top=true")
//       .then((res) => setTopProducts(res.data))
//       .catch(() => {});
//   }, []);

//   useEffect(() => {
//     api
//       .get("/reviews")
//       .then((res) => setHomeReviews(res.data.slice(0, 3)))
//       .catch(() => {});
//   }, []);

//   const topCategories = Array.from(
//     new Set(
//       topProducts
//         .map((p) => p.category && p.category.name)
//         .filter(Boolean)
//     )
//   );

//   return (
//     <div>
//       <Hero />

//       {/* Shop / Top picks section */}
//       <section id="shop" className="max-w-6xl mx-auto px-4 py-10">
//         <div className="flex items-center justify-between mb-2">
//           <div>
//             <h2 className="text-lg md:text-xl font-semibold text-gray-900">
//               Shop all gifts
//             </h2>
//             {topCategories.length > 0 && (
//               <div className="mt-1 flex flex-wrap gap-2">
//                 {topCategories.map((name) => (
//                   <span
//                     key={name}
//                     className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-pink-50 text-[11px] text-pink-700 border border-pink-100"
//                   >
//                     Top picks in {name}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>
//           <a
//             href="#all-products"
//             className="text-xs md:text-sm font-semibold text-brand-dark underline underline-offset-4"
//           >
//             Shop all gifts
//           </a>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {topProducts.map((p) => (
//             <ProductCard
//               key={p._id}
//               product={p}
//               onView={() => setSelected(p)}
//             />
//           ))}
//           {topProducts.length === 0 && (
//             <p className="text-xs text-gray-500">
//               Top picks will appear here once added in the admin panel.
//             </p>
//           )}
//         </div>
//       </section>

//       {/* All products section reusing Products page layout */}
//       <section id="all-products" className="bg-white">
//         <Products />
//       </section>

//       {/* About section */}
//       <section id="about" className="py-10 md:py-14 bg-white">
//         <About />
//       </section>

//       {/* Services section */}
//       <section id="services" className="py-10 md:py-14 bg-theme-lightGreen/10">
//         <Services />
//       </section>

//       {/* Reviews teaser section */}
//       <section id="reviews" className="max-w-6xl mx-auto px-4 py-10">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg md:text-xl font-semibold text-gray-900">
//             What our customers say
//           </h2>
//           <a
//             href="#reviews"
//             className="text-xs text-brand-dark underline underline-offset-4"
//           >
//             View all reviews
//           </a>
//         </div>
//         <div className="grid md:grid-cols-3 gap-4 md:gap-6">
//           {homeReviews.map((r) => (
//             <ReviewCard key={r._id} review={r} />
//           ))}
//         </div>
//         {homeReviews.length === 0 && (
//           <p className="text-xs text-gray-500 mt-2">
//             Reviews will appear here once approved in the admin panel.
//           </p>
//         )}
//       </section>

//       {/* Full reviews + contact as deep sections for scrolling */}
//       <section className="bg-white">
//         <ReviewsPage />
//       </section>

//       <section id="contact" className="bg-theme-lightGreen/10">
//         <ContactPage />
//       </section>

//       <ProductModal product={selected} onClose={() => setSelected(null)} />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import Hero from "../components/Hero.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductModal from "../components/ProductModal.jsx";
import ReviewCard from "../components/ReviewCard.jsx";
import About from "./About.jsx";
import Services from "./Services.jsx";
import ReviewsPage from "./Reviews.jsx";
import ContactPage from "./Contact.jsx";
import Products from "./Products.jsx";
import { api } from "../api.js";
import { Sparkles, ArrowRight, Trophy, Star } from "lucide-react";

export default function Home() {
  const [topProducts, setTopProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [homeReviews, setHomeReviews] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    api
      .get("/products?top=true")
      .then((res) => setTopProducts(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    api
      .get("/reviews")
      .then((res) => setHomeReviews(res.data.slice(0, 3)))
      .catch(() => {});
  }, []);

  const topCategories = Array.from(
    new Set(
      topProducts
        .map((p) => p.category && p.category.name)
        .filter(Boolean)
    )
  );

  // Filter products by category
  const filteredProducts = activeCategory === "all" 
    ? topProducts 
    : topProducts.filter(p => p.category?.name === activeCategory);

  return (
    <div>
      <Hero />

      {/* All products section with enhanced styling */}
<section
  id="all-products"
  className=" min-h-screen relative overflow-hidden 
             bg-gradient-to-br from-theme-salmon/30 via-white to-theme-salmon/20 
             pt-16 md:pt-24 pb-24 md:pb-32"
>
  <div className="max-w mx-auto px-4 sm:px-6 h-full">
    <div className="text-center mb-12">
     <h2
  id="shop"
  className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
>
  Shop All Gifts
</h2>

<p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
  Discover our entire collection of thoughtful gifts for every occasion
</p>

    </div>

    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 h-full">
      <Products />
    </div>
  </div>
</section>


      {/* About section */}
      <section id="about" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <About />
        </div>
      </section>

      {/* Services section */}
      <section id="services" className="py-16 md:py-20 bg-gradient-to-br from-theme-lightGreen/10 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Services />
        </div>
      </section>

      {/* Reviews teaser section */}
      {/* <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-yellow-700">Customer Love</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories from happy customers who found the perfect gifts
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {homeReviews.map((r, index) => (
            <div key={r._id} className={`transform transition-transform duration-300 hover:-translate-y-2 ${index === 1 ? 'md:-translate-y-4' : ''}`}>
              <ReviewCard review={r} />
            </div>
          ))}
        </div>
        
        {homeReviews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
              <Star className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Reviews will appear here once approved in the admin panel.
            </p>
          </div>
        )}

        <div className="text-center mt-10">
          <a
            href="#reviews"
            className="inline-flex items-center gap-2 text-brand-dark font-semibold hover:text-brand-darker underline underline-offset-4 hover:gap-3 transition-all"
          >
            View All Reviews
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section> */}

      {/* Full reviews + contact as deep sections for scrolling */}
      <section className="bg-white">
        <ReviewsPage />
      </section>

      <section id="contact" className="bg-gradient-to-br from-theme-lightGreen/10 to-blue-50">
        <ContactPage />
      </section>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
