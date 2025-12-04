import { useState } from "react";
import { api } from "../api.js";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaInstagram, 
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaMap,
  FaStore
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");
    try {
      await api.post("/inquiries", form);
      setStatus({
        type: "success",
        message: "Thank you! We've received your inquiry. We'll get back to you on WhatsApp within 24 hours."
      });
      setForm({ name: "", phone: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again or WhatsApp us directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhoneAlt className="w-5 h-5" />,
      title: "Phone / WhatsApp",
      details: "+91-9825600097",
      action: "tel:+919825600097",
      color: "from-brand-600 to-brand-700"
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      title: "Email",
      details: "tithishah26@gmail.com",
      action: "mailto:tithishah26@gmail.com",
color: "from-brand-600 to-brand-700"    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      title: "Instagram",
      details: "@kalanjay_",
      action: "https://instagram.com/kalanjay_",
color: "from-brand-600 to-brand-700"    },
    {
      icon: <FaClock className="w-5 h-5" />,
      title: "Business Hours",
      details: "Monday - Sunday: 10 AM - 7 PM",
color: "from-brand-600 to-brand-700"    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-brand-800 mb-4">
          Get in Touch
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-theme-peach to-theme-lightBlue mx-auto mb-6 rounded-full"></div>
        <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
          Share your occasion, budget and preferences. We'll help you plan the perfect personalized gift or hamper.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Contact Information */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="lg:col-span-1 space-y-6"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              variants={fadeInUp}
              whileHover={{ x: 5 }}
              className={`group cursor-pointer ${
                info.action ? "hover:shadow-lg" : ""
              }`}
            >
              {info.action ? (
                <a
                  href={info.action}
                  target={info.action.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="block"
                >
                  <ContactCard info={info} />
                </a>
              ) : (
                <ContactCard info={info} />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Middle Column - Contact Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-brand-100 p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl flex items-center justify-center">
              <FaPaperPlane className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand-800">Send Your Inquiry</h2>
              <p className="text-neutral-600">We typically respond within 2-4 hours</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200 hover:border-brand-300"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-2">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200 hover:border-brand-300"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">
                Your Requirements *
              </label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200 resize-none hover:border-brand-300"
                placeholder="Tell us about the occasion, budget, preferred colors, timeline, and any specific ideas you have..."
              />
              <p className="text-xs text-neutral-500 mt-2">
                Please include: Occasion type, budget range, preferred colors, and delivery date
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0" />
                <p className="text-sm text-neutral-600">
                  We'll share a design concept and quote within 24 hours of receiving your inquiry.
                </p>
              </div>
              
              {status && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className={`rounded-xl p-4 ${
                    status.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {status.type === "success" ? (
                      <FaCheckCircle className="w-5 h-5" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    )}
                    <p className="text-sm">{status.message}</p>
                  </div>
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:from-brand-700 hover:to-brand-800"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <FaPaperPlane className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex-1">
                  <WhatsAppButton
                    text="Hi Kalanjay, I would like to inquire about a personalized gift. Can you help me with the following requirements?"
                    className="w-full"
                    variant="outline"
                  />
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-brand-700 rounded-lg flex items-center justify-center">
            <FaMap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-800">Find Our Store</h2>
            <p className="text-neutral-600">Visit us at our Surat studio</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-neutral-50 to-white rounded-3xl overflow-hidden border border-brand-100 shadow-lg">
          <div className="aspect-[21/9] md:aspect-[16/6] relative">
            <iframe
              title="Kalanjay Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.769378550783!2d72.82023597599705!3d21.197199980496258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04ef0073f897f%3A0x60616ebc443b1e40!2sDivya%20Jyoti%20Apartments%2C%20Swaminarayan%20Temple%20Rd%2C%20Palanpur%20Patia%2C%20Adajan%2C%20Surat%2C%20Gujarat%20395009!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
            <div className="absolute bottom-4 right-4 bg-white rounded-xl px-4 py-2 shadow-lg border border-brand-100">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4 text-brand-600" />
                <span className="text-sm font-medium text-brand-800">Open in Google Maps</span>
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-brand-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-brand-800 mb-1">Kalanjay Studio</h3>
                <p className="text-sm text-neutral-600">
                  Divya Jyoti Appt, Nr Swaminarayan Temple, Adajan, Surat 395009
                </p>
              </div>
              <a
                href="https://maps.app.goo.gl/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm hover:from-brand-700 hover:to-brand-800"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Contact Card Component
function ContactCard({ info }) {
  return (
    <div className="bg-white rounded-2xl border border-brand-100 p-5 hover:border-transparent group-hover:shadow-xl transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
          <div className="text-white">{info.icon}</div>
        </div>
        <div>
          <h3 className="font-semibold text-brand-800 mb-1">{info.title}</h3>
          <p className="text-sm text-neutral-600">{info.details}</p>
          {info.action && (
            <span className="inline-block mt-2 text-xs font-medium text-brand-600 group-hover:text-brand-700 transition-colors duration-300">
              Click to {info.title.includes("Phone") ? "call" : info.title.includes("Email") ? "email" : "visit"} →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}