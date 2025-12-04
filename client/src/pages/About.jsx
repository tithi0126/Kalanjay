// export default function About() {
//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
//       <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
//         About Kalanjay
//       </h1>
//       <p className="text-sm md:text-base text-gray-600 mb-4">
//         Kalanjay was born from a simple idea – every story deserves a thoughtful
//         gift. We create personalized hampers, frames, cakes and keepsakes that
//         feel intimate, aesthetic and warm.
//       </p>
//       <p className="text-sm md:text-base text-gray-600 mb-4">
//         From birthdays and anniversaries to weddings, baby showers and
//         corporate milestones, we handpick every element to match your story,
//         colour palette and budget. Think soft pastels, premium packaging and
//         meaningful details that last beyond the celebration.
//       </p>
//       <div className="grid md:grid-cols-3 gap-4 mt-6">
//         <div className="bg-white rounded-2xl border border-pink-50 p-4">
//           <h2 className="text-sm font-semibold text-gray-900 mb-1">
//             Vision
//           </h2>
//           <p className="text-xs text-gray-600">
//             To become the go-to studio for curated, personalized gifting that
//             feels effortless yet deeply personal.
//           </p>
//         </div>
//         <div className="bg-white rounded-2xl border border-pink-50 p-4">
//           <h2 className="text-sm font-semibold text-gray-900 mb-1">
//             Mission
//           </h2>
//           <p className="text-xs text-gray-600">
//             To design gifts that blend emotion, aesthetics and practicality for
//             modern couples, families and brands.
//           </p>
//         </div>
//         <div className="bg-white rounded-2xl border border-pink-50 p-4">
//           <h2 className="text-sm font-semibold text-gray-900 mb-1">
//             Why choose us
//           </h2>
//           <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
//             <li>Custom designs for every occasion</li>
//             <li>Pastel, premium and clutter-free aesthetics</li>
//             <li>WhatsApp-first, easy communication</li>
//             <li>End-to-end support from idea to delivery</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


import { FaHeart, FaPalette, FaHandsHelping, FaStar, FaGift, FaShippingFast } from "react-icons/fa";
import { motion } from "framer-motion";

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const values = [
    {
      icon: <FaHeart className="w-6 h-6" />,
      title: "Thoughtful Crafting",
      description: "Every gift tells a story. We meticulously design each element to resonate with personal emotions.",
      color: "from-pink-50 to-rose-50",
      iconColor: "text-rose-500"
    },
    {
      icon: <FaPalette className="w-6 h-6" />,
      title: "Aesthetic Excellence",
      description: "Soft pastels, clean designs, and premium materials that create lasting impressions.",
      color: "from-purple-50 to-violet-50",
      iconColor: "text-purple-500"
    },
    {
      icon: <FaHandsHelping className="w-6 h-6" />,
      title: "Personal Partnership",
      description: "We work closely with you to understand your vision and bring it to life perfectly.",
      color: "from-blue-50 to-cyan-50",
      iconColor: "text-blue-500"
    }
  ];

  // const processSteps = [
  //   {
  //     number: "01",
  //     title: "Share Your Story",
  //     description: "Tell us about the occasion, preferences, and special details."
  //   },
  //   {
  //     number: "02",
  //     title: "Curated Design",
  //     description: "We create a personalized concept with mood boards and samples."
  //   },
  //   {
  //     number: "03",
  //     title: "Craft & Refine",
  //     description: "Handcrafted execution with your feedback incorporated at every step."
  //   },
  //   {
  //     number: "04",
  //     title: "Perfect Delivery",
  //     description: "Carefully packaged and delivered to create a memorable unboxing experience."
  //   }
  // ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Story
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto mb-6 rounded-full"></div>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Kalanjay was born from a simple yet powerful belief – every beautiful moment deserves 
          an equally beautiful memory. We're not just creating gifts; we're crafting emotional 
          connections that last a lifetime.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Where Stories Meet Craftsmanship
          </h2>
          <p className="text-gray-600 leading-relaxed">
            What began as a passion project in 2020 has blossomed into a trusted studio 
            for personalized gifting. From intimate birthdays to grand weddings, 
            we've had the privilege of helping thousands celebrate their special moments 
            with thoughtfully designed keepsakes.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our journey is woven with stories of love, friendship, and milestones. 
            Each frame, hamper, and cake we create carries not just aesthetic appeal but 
            the emotional weight of the occasion it celebrates.
          </p>
          <div className="flex items-center gap-8 pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">2K+</div>
              <div className="text-sm text-gray-600">Happy Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Cities Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">4.9</div>
              <div className="text-sm text-gray-600">Customer Rating</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 h-full">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                <FaGift className="w-10 h-10 text-pink-400 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Personalized Gifting</h3>
                <p className="text-sm text-gray-600">Tailored to every story and celebration</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                <FaStar className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
                <p className="text-sm text-gray-600">Handpicked materials & careful craftsmanship</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                <FaPalette className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Aesthetic Design</h3>
                <p className="text-sm text-gray-600">Soft pastels & minimalist elegance</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                <FaShippingFast className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Nationwide Delivery</h3>
                <p className="text-sm text-gray-600">Carefully packaged & timely delivery</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Core Values */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-20"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-gradient-to-br ${value.color} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className={`${value.iconColor} mb-4`}>{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Process */}
      {/* <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
          Our Process
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-4xl font-bold text-gray-200 mb-4">{step.number}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-pink-300 to-purple-300"></div>
              )}
            </div>
          ))}
        </div>
      </motion.div> */}

      {/* Mission & Vision */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 1 }}
        className="bg-gradient-to-r from-pink-50 via-white to-purple-50 rounded-3xl p-8 md:p-12"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="text-lg font-bold text-pink-500">V</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Vision</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To become the most trusted curator of personalized memories, where every 
              gift is not just an object but a tangible piece of emotion that bridges 
              hearts across distances and generations.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="text-lg font-bold text-purple-500">M</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Mission</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              To design experiences that blend emotion, aesthetics, and practicality, 
              making thoughtful gifting effortless for modern couples, families, and 
              brands while maintaining the highest standards of craftsmanship.
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="text-center mt-16"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Ready to Create Something Beautiful?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Share your story with us, and let's create a gift that will be cherished forever.
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
          Start Your Story
        </button>
      </motion.div>
    </div>
  );
}