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
    <div className="bg-cream">
      <Hero />

      {/* All products section with updated theme colors */}
      <section
        id="all-products"
        className="min-h-screen relative overflow-hidden 
                   bg-gradient-to-br from-theme-peach/30 via-cream to-theme-lightBlue/20 
                   pt-16 md:pt-24 pb-24 md:pb-32"
      >
        <div className="max-w mx-auto px-4 sm:px-6 h-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-50 to-theme-peach/30 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-theme-gold" />
              <span className="text-sm font-medium text-brand-700">Featured Collection</span>
            </div>
            <h2
              id="shop"
              className="text-4xl md:text-5xl font-bold text-brand-800 mb-4"
            >
              Shop All Gifts
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
              Discover our entire collection of thoughtful gifts for every occasion
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-neutral-200 h-full">
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
      <section id="services" className="py-16 md:py-20 bg-gradient-to-br from-theme-lightBlue/10 to-theme-peach/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Services />
        </div>
      </section>

      {/* Shop / Top picks section */}
      {/* {topProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-theme-gold/20 to-theme-peach/20 px-4 py-2 rounded-full mb-4">
              <Trophy className="w-4 h-4 text-theme-gold" />
              <span className="text-sm font-medium text-brand-700">Top Picks</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-800 mb-3">
              Customer Favorites
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Most loved products in our collection
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === "all" 
                ? "bg-brand-600 text-white" 
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"}`}
            >
              All Categories
            </button>
            {topCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category 
                  ? "bg-brand-600 text-white" 
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onView={() => setSelected(p)}
              />
            ))}
          </div>
        </section>
      )} */}

      {/* Reviews teaser section */}
      <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 bg-white">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-theme-gold/20 to-theme-peach/20 px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4 text-theme-gold fill-theme-gold" />
            <span className="text-sm font-medium text-brand-700">Customer Love</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-800 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
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
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-theme-gold/20 to-theme-peach/20 flex items-center justify-center">
              <Star className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-neutral-600 max-w-md mx-auto">
              Reviews will appear here once approved in the admin panel.
            </p>
          </div>
        )}

        {homeReviews.length > 0 && (
          <div className="text-center mt-10">
            <a
              href="#reviews"
              className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold underline underline-offset-4 hover:gap-3 transition-all"
            >
              View All Reviews
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </section>

      {/* Full reviews + contact as deep sections for scrolling */}
      <section className="bg-white">
        <ReviewsPage />
      </section>

      <section id="contact" className="bg-gradient-to-br from-theme-lightBlue/10 to-theme-peach/10">
        <ContactPage />
      </section>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}