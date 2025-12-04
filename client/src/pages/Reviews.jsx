import { useEffect, useState } from "react";
import { api } from "../api.js";
import ReviewCard from "../components/ReviewCard.jsx";
import { FaStar, FaPaperPlane, FaQuoteLeft, FaRegSmile } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    rating: 5,
    text: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    api
      .get("/reviews")
      .then((res) => setReviews(res.data))
      .catch(() => {});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      await api.post("/reviews", form);
      setForm({ customerName: "", rating: 5, text: "" });
      setMessage("Thank you! Your review has been submitted and will appear once approved.");
      fetchReviews();
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (activeFilter === "all") return true;
    if (activeFilter === "5") return review.rating === 5;
    if (activeFilter === "4+") return review.rating >= 4;
    return true;
  });

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-brand-800 mb-4">
          Customer Stories
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-theme-peach to-theme-lightBlue mx-auto mb-6 rounded-full"></div>
        <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
          Real stories from couples, families and brands who trusted us with their celebrations.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Stats & Form */}
        <div className="lg:col-span-1 space-y-8">
          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-theme-peach/20 to-theme-lightBlue/20 rounded-2xl p-6 border border-brand-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FaStar className="w-5 h-5 text-theme-gold" />
                  <span className="text-3xl font-bold text-brand-800">{averageRating}</span>
                </div>
                <p className="text-sm text-neutral-600">Average Rating</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-brand-800">{reviews.length}</div>
                <p className="text-sm text-neutral-600">Total Reviews</p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium text-brand-700">{stars}</span>
                    <FaStar className="w-4 h-4 text-theme-gold" />
                  </div>
                  <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-theme-gold to-theme-peach rounded-full"
                      style={{
                        width: `${(ratingDistribution[stars] / reviews.length) * 100 || 0}%`
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-brand-700 w-8 text-right">
                    {ratingDistribution[stars]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl border border-brand-100 p-4 shadow-sm"
          >
            <h3 className="font-semibold text-brand-700 mb-3">Filter Reviews</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Reviews" },
                { id: "5", label: "5 Stars" },
                { id: "4+", label: "4+ Stars" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === filter.id
                      ? "bg-gradient-to-r from-brand-600 to-brand-700 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Review Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl border border-brand-100 shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl flex items-center justify-center">
                <FaQuoteLeft className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-brand-800 text-lg">Share Your Story</h3>
                <p className="text-sm text-neutral-600">Help others make their choice</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-2">
                  Your Name
                </label>
                <input
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200 hover:border-brand-300"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-700 mb-2">
                  Your Rating
                </label>
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, rating: star }))}
                      className="text-2xl focus:outline-none transition-transform hover:scale-110"
                    >
                      {star <= form.rating ? (
                        <FaStar className="text-theme-gold" />
                      ) : (
                        <FaStar className="text-neutral-300" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-700 mb-2">
                  Your Review
                </label>
                <textarea
                  name="text"
                  rows={4}
                  value={form.text}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200 hover:border-brand-300"
                  placeholder="Share your experience with our products and service..."
                  required
                />
              </div>

              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`rounded-xl p-4 ${
                      message.includes("Thank you")
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    <p className="text-sm">{message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:from-brand-700 hover:to-brand-800"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Review
                    <FaPaperPlane className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-neutral-500 text-center mt-4">
              Reviews are manually approved before they appear on the site.
            </p>
          </motion.div>
        </div>

        {/* Right Column - Reviews List */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-brand-800">
                Customer Reviews
              </h2>
              <p className="text-neutral-600">
                Showing {filteredReviews.length} of {reviews.length} reviews
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaRegSmile className="w-5 h-5 text-theme-gold" />
              <span className="text-sm font-medium text-brand-700">
                {((filteredReviews.filter(r => r.rating >= 4).length / filteredReviews.length) * 100 || 0).toFixed(0)}% positive
              </span>
            </div>
          </motion.div>

          {filteredReviews.length > 0 ? (
            <motion.div
              layout
              className="grid md:grid-cols-2 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {filteredReviews.map((review) => (
                <motion.div
                  key={review._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-gradient-to-br from-neutral-50 to-white rounded-2xl border border-brand-100"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-theme-peach/20 to-theme-lightBlue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaQuoteLeft className="w-12 h-12 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold text-brand-800 mb-2">
                No reviews yet
              </h3>
              <p className="text-neutral-600 max-w-md mx-auto mb-6">
                Be the first to share your experience with Kalanjay!
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}