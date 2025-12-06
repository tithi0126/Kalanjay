import { useState } from "react";
import { 
  FaGift, 
  FaCalendarAlt, 
  FaPhotoVideo, 
  FaBuilding, 
  FaBirthdayCake, 
  FaArrowRight,
  FaCheckCircle,
  FaWhatsapp
} from "react-icons/fa";
import { motion } from "framer-motion";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      title: "Customized Hampers",
      desc: "Curated gift hampers with coordinated packaging, fillers and personalization for birthdays, anniversaries, baby showers and more.",
      features: ["Theme-based curation", "Personalized notes", "Premium packaging", "Custom fillers"],
      color: "from-theme-peach to-theme-gold",
      bgColor: "bg-gradient-to-br from-brand-100 to-brand-200/30",
      examples: ["Romantic Anniversary Hamper", "Baby Shower Bliss Box", "Birthday Surprise Bundle"]
    },
    {
      title: "Occasion-based Gifting",
      desc: "From proposals to housewarmings, we plan thoughtful gift ideas aligned to your theme, colours and budget.",
      features: ["Full event planning", "Color coordination", "Budget management", "Timeline planning"],
      color: "from-brand-500 to-brand-700",
      bgColor: "bg-gradient-to-br from-brand-100 to-brand-200/30",
      examples: ["Wedding Proposal Package", "Housewarming Welcome Kit", "Graduation Celebration"]
    },
    {
      title: "Photo Frames & Keepsakes",
      desc: "Minimal, modern frames, collages and photo-based keepsakes that capture your favourite memories beautifully.",
      features: ["Custom sizing", "Multiple layouts", "Premium materials", "Preservation quality"],
      color: "from-theme-lightBlue to-brand-500",
      bgColor: "bg-gradient-to-br from-brand-100 to-brand-200/30",
      examples: ["Acrylic Photo Blocks", "Floating Frame Collage", "Memory Box Sets"]
    },
    {
      title: "Corporate Gifting",
      desc: "Welcome kits, festive hampers and branded gifts for teams, partners and clients with premium packaging.",
      features: ["Bulk discounts", "Brand customization", "Nationwide delivery", "Gift wrapping"],
      color: "from-brand-600 to-brand-800",
      bgColor: "bg-gradient-to-br from-brand-100 to-brand-200/30",
      examples: ["Employee Welcome Kits", "Client Appreciation Box", "Festival Corporate Hampers"]
    },
    {
      title: "Cake Customization",
      desc: "Theme-based cakes and dessert add-ons that visually match your hamper or event styling.",
      features: ["Design matching", "Flavor customization", "Dietary options", "Delivery setup"],
      color: "from-theme-peach to-brand-600",
      bgColor: "bg-gradient-to-br from-brand-100 to-brand-200/30",
      examples: ["Theme Matching Cakes", "Custom Topper Design","Mini Gift Desserts"]
    },
    {
      title: "Festival Gifting",
      desc: "Diwali, Rakhi, Christmas and more – ready-to-customize gift concepts for individuals and corporates.",
      features: ["Cultural authenticity", "Seasonal themes", "Bulk ordering", "Custom messaging"],
      color: "from-theme-gold to-brand-700",
      bgColor: "bg-gradient-to-br from-brand-100 to-brand-200/30",
      examples: ["Diwali Sweet Hampers", "Rakhi Special Packages","Holi Boxes"]
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
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
          Our Services
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-theme-peach to-theme-lightBlue mx-auto mb-6 rounded-full"></div>
        <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
          Whether you're planning a single surprise or bulk gifting for an event, 
          we help you design cohesive, personalized experiences around your celebration.
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16"
      >
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            variants={fadeInUp}
            whileHover={{ y: -8 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`${service.bgColor} rounded-2xl overflow-hidden border border-brand-100 shadow-sm hover:shadow-xl transition-all duration-300 relative group`}
          >
            <div className="p-6 md:p-8">
              {/* Title & Description */}
              <h3 className="text-xl font-bold text-brand-800 mb-3">
                {service.title}
              </h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                {service.desc}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <FaCheckCircle className="w-4 h-4 text-brand-600 flex-shrink-0" />
                    <span className="text-sm text-neutral-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Examples */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-brand-700 mb-2">Popular Examples:</h4>
                <div className="flex flex-wrap gap-2">
                  {service.examples.map((example, idx) => (
                    <span key={idx} className="text-xs bg-white/80 text-neutral-700 px-3 py-1 rounded-full border border-brand-100">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${service.color} opacity-10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-125 transition-transform duration-500`}></div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center"
      >


        <div className="bg-gradient-to-br from-brand-100 to-brand-200/30 rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Create Something Special?
          </h2>
          <p className="text-[#954901] mb-8 max-w-2xl mx-auto">
  Let's discuss your requirements and create a personalized gifting experience that will be remembered.
</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <button className="px-8 py-3 bg-white text-brand-700 font-semibold rounded-full hover:bg-neutral-100 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg">
              Book a Consultation
              <FaArrowRight className="w-4 h-4" />
            </button> */}
            <WhatsAppButton  />
            {/* <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg">
              
              
            </button> */}
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-brand-800 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: "How long does customization take?",
              a: "Typically7-8 business days for standard customization, and 10-12 days for complex designs."
            },
            {
              q: "Do you offer bulk discounts?",
              a: "Yes, we offer special pricing for bulk orders and corporate gifting. Contact us for quotes."
            },
            {
              q: "What's your delivery coverage?",
              a: "We deliver across India with careful packaging to ensure your gifts arrive perfect."
            },
            {
              q: "Can I see samples before ordering?",
              a: "Yes, we provide digital mockups and can arrange physical samples for bulk orders."
            },
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-brand-100 hover:border-brand-200 transition-colors duration-300 shadow-sm">
              <h3 className="font-semibold text-brand-700 mb-2">{faq.q}</h3>
              <p className="text-neutral-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}