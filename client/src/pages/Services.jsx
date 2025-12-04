// export default function Services() {
//   const services = [
//     {
//       title: "Customized hampers",
//       desc: "Curated gift hampers with coordinated packaging, fillers and personalization for birthdays, anniversaries, baby showers and more.",
//     },
//     {
//       title: "Occasion-based gifting",
//       desc: "From proposals to housewarmings, we plan thoughtful gift ideas aligned to your theme, colours and budget.",
//     },
//     {
//       title: "Photo frames & keepsakes",
//       desc: "Minimal, modern frames, collages and photo-based keepsakes that capture your favourite memories beautifully.",
//     },
//     {
//       title: "Corporate gifting",
//       desc: "Welcome kits, festive hampers and branded gifts for teams, partners and clients with premium packaging.",
//     },
//     {
//       title: "Cake customization",
//       desc: "Theme-based cakes and dessert add-ons that visually match your hamper or event styling.",
//     },
//     {
//       title: "Festival gifting",
//       desc: "Diwali, Rakhi, Christmas and more – ready-to-customize gift concepts for individuals and corporates.",
//     },
//   ];

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
//       <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
//         Services
//       </h1>
//       <p className="text-sm md:text-base text-gray-600 mb-6 max-w-2xl">
//         Whether you&apos;re planning a single surprise or bulk gifting for an
//         event, we help you design cohesive, personalized experiences around your
//         celebration.
//       </p>
//       <div className="grid md:grid-cols-2 gap-4 md:gap-6">
//         {services.map((s) => (
//           <div
//             key={s.title}
//             className="bg-white rounded-2xl border border-pink-50 p-4 md:p-5"
//           >
//             <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-2">
//               {s.title}
//             </h2>
//             <p className="text-xs md:text-sm text-gray-600">{s.desc}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { 
  FaGift, 
  FaCalendarAlt, 
  FaPhotoVideo, 
  FaBuilding, 
  FaBirthdayCake, 
  // FaHoliday,
  FaArrowRight,
  FaCheckCircle,
  FaWhatsapp
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      // icon: <FaGift className="w-6 h-6" />,
      title: "Customized Hampers",
      desc: "Curated gift hampers with coordinated packaging, fillers and personalization for birthdays, anniversaries, baby showers and more.",
      features: ["Theme-based curation", "Personalized notes", "Premium packaging", "Custom fillers"],
      color: "from-pink-400 to-rose-400",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
      examples: ["Romantic Anniversary Hamper", "Baby Shower Bliss Box", "Birthday Surprise Bundle"]
    },
    {
      // icon: <FaCalendarAlt className="w-6 h-6" />,
      title: "Occasion-based Gifting",
      desc: "From proposals to housewarmings, we plan thoughtful gift ideas aligned to your theme, colours and budget.",
      features: ["Full event planning", "Color coordination", "Budget management", "Timeline planning"],
      color: "from-purple-400 to-indigo-400",
      bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
      examples: ["Wedding Proposal Package", "Housewarming Welcome Kit", "Gradition Celebration"]
    },
    {
      // icon: <FaPhotoVideo className="w-6 h-6" />,
      title: "Photo Frames & Keepsakes",
      desc: "Minimal, modern frames, collages and photo-based keepsakes that capture your favourite memories beautifully.",
      features: ["Custom sizing", "Multiple layouts", "Premium materials", "Preservation quality"],
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      examples: ["Acrylic Photo Blocks", "Floating Frame Collage", "Memory Box Sets"]
    },
    {
      // icon: <FaBuilding className="w-6 h-6" />,
      title: "Corporate Gifting",
      desc: "Welcome kits, festive hampers and branded gifts for teams, partners and clients with premium packaging.",
      features: ["Bulk discounts", "Brand customization", "Nationwide delivery", "Gift wrapping"],
      color: "from-emerald-400 to-green-400",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
      examples: ["Employee Welcome Kits", "Client Appreciation Box", "Festival Corporate Hampers"]
    },
    {
      // icon: <FaBirthdayCake className="w-6 h-6" />,
      title: "Cake Customization",
      desc: "Theme-based cakes and dessert add-ons that visually match your hamper or event styling.",
      features: ["Design matching", "Flavor customization", "Dietary options", "Delivery setup"],
      color: "from-amber-400 to-orange-400",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      examples: ["Theme Matching Cakes", "Dessert Table Setup", "Custom Topper Design"]
    },
    {
      // icon: <FaBirthdayCake className="w-6 h-6" />,
      title: "Festival Gifting",
      desc: "Diwali, Rakhi, Christmas and more – ready-to-customize gift concepts for individuals and corporates.",
      features: ["Cultural authenticity", "Seasonal themes", "Bulk ordering", "Custom messaging"],
      color: "from-red-400 to-pink-400",
      bgColor: "bg-gradient-to-br from-red-50 to-pink-50",
      examples: ["Diwali Sweet Hampers", "Christmas Gift Boxes", "Rakhi Special Packages"]
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
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Services
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto mb-6 rounded-full"></div>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
            className={`${service.bgColor} rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative group`}
          >
            <div className="p-6 md:p-8">
              {/* Icon */}
              {/* <div className={`w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm mb-6 ${hoveredIndex === index ? 'scale-110' : ''} transition-transform duration-300`}>
                <div className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                  {service.icon}
                </div>
              </div> */}

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.desc}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Examples */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Popular Examples:</h4>
                <div className="flex flex-wrap gap-2">
                  {service.examples.map((example, idx) => (
                    <span key={idx} className="text-xs bg-white/70 text-gray-700 px-3 py-1 rounded-full">
                      {example}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              {/* <button className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${service.color} hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2`}>
                Explore Service
                <FaArrowRight className="w-4 h-4" />
              </button> */}
            </div>

            {/* Decorative Element */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${service.color} opacity-5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-125 transition-transform duration-500`}></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Process Section */}
      {/* <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-8 md:p-12 mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Consultation", desc: "Share your vision, preferences, and requirements" },
            { step: "02", title: "Design Proposal", desc: "Receive a customized concept with mood boards" },
            { step: "03", title: "Refinement", desc: "Review and fine-tune every detail together" },
            { step: "04", title: "Delivery", desc: "Carefully crafted and delivered to your doorstep" },
          ].map((step, index) => (
            <div key={step.step} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">{step.step}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
              {index < 3 && (
                <div className="hidden md:block absolute top-8 right-0 w-6 h-0.5 bg-gradient-to-r from-pink-300 to-purple-300"></div>
              )}
            </div>
          ))}
        </div>
      </motion.div> */}

      {/* CTA Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-8 md:p-12 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Create Something Special?
          </h2>
          <p className="text-pink-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your requirements and create a personalized gifting experience that will be remembered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center gap-2">
              Book a Consultation
              <FaArrowRight className="w-4 h-4" />
            </button> */}
            <button className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2">
              <FaWhatsapp className="w-5 h-5" />
              Chat on WhatsApp
            </button>
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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: "How long does customization take?",
              a: "Typically 3-5 business days for standard customization, and 7-10 days for complex designs."
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
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:border-pink-200 transition-colors duration-300">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}