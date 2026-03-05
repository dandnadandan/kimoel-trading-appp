// Services.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getServicesByCategory } from "@/data/services";

// Import category images
import engineeringImage from "@/assets/ENGINEERING SERVICES.jpg";
import machiningImage from "@/assets/MACHINING AND FABRICATION.jpg";
import civilWorksImage from "@/assets/CIVIL WORKS.jpeg";

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10, transition: { duration: 0.18 } },
};

const Services = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTap, setActiveTap] = useState<string | null>(null);

  // Main categories
  const categories = [
    {
      title: "Engineering Services",
      description:
        "Automation & design, electrical works, sheet metal, and control panels.",
      image: engineeringImage,
    },
    {
      title: "Machining & Fabrication",
      description:
        "CNC machining, milling, lathe, bending, shearing, and fabrication services.",
      image: machiningImage,
    },
    {
      title: "Civil Works",
      description:
        "Comprehensive construction and civil engineering services.",
      image: civilWorksImage,
    },
  ];

  const currentServices = activeCategory
    ? getServicesByCategory(activeCategory)
    : [];

  return (
    <section id="services" className="py-14 md:py-20 bg-muted/30 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-blue-dark mb-3 md:mb-4">
            Our Services
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide engineering, machining, and civil works services to support
            industrial and construction needs with precision and reliability.
          </p>
        </div>

        <AnimatePresence initial={false} mode="wait">
          {/* Category Grid */}
          {!activeCategory && (
            <motion.div
              key="categories"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
                variants={gridVariants}
              >
                {categories.map((category, i) => (
                  <motion.button
                    key={category.title}
                    onClick={() => {
                      setActiveCategory(category.title);
                      setActiveTap(category.title);
                    }}
                    variants={itemVariants}
                    transition={{
                      delay: i * 0.03,
                      type: "spring",
                      stiffness: 220,
                      damping: 20,
                    }}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    className="group text-left bg-white rounded-2xl overflow-hidden shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 md:hover:shadow-xl"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <motion.img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.06 }}
                        transition={{ type: "spring", stiffness: 220 }}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3
                        className={`text-lg sm:text-xl font-semibold transition-colors duration-300 ${
                          activeTap === category.title
                            ? "text-[#FFD700]"
                            : "text-brand-blue-dark md:group-hover:text-[#FFD700]"
                        }`}
                      >
                        {category.title}
                      </h3>
                      <p className="mt-1 text-sm sm:text-base text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>

              {/* View All Services */}
              <div className="text-center mt-8">
                <button
                  onClick={() => navigate("/services")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFD700] hover:bg-[#e6c200] text-brand-blue-dark font-semibold rounded-lg transition-colors duration-200"
                >
                  View All Services
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Sub-services Grid */}
          {activeCategory && (
            <motion.div
              key={`services-${activeCategory}`}
              className="mt-8 md:mt-12"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                <button
                  onClick={() => {
                    setActiveCategory(null);
                    setActiveTap(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm sm:text-base"
                  aria-label="Back to categories"
                >
                  ← Back to Categories
                </button>
                <h3 className="text-2xl sm:text-3xl font-bold text-brand-blue-dark text-center w-full sm:w-auto">
                  {activeCategory}
                </h3>
              </div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={gridVariants}
              >
                {currentServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      delay: index * 0.02,
                      type: "spring",
                      stiffness: 220,
                      damping: 20,
                    }}
                    onClick={() => navigate(`/services/${service.id}`)}
                    className="cursor-pointer"
                    layout
                  >
                    <div className="group bg-white rounded-2xl shadow-md overflow-hidden transition-shadow focus-within:ring-2 focus-within:ring-primary/60 hover:shadow-xl">
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={service.images[0]}
                          alt={service.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4 sm:p-5">
                        <h4 className="text-lg font-semibold text-brand-blue-dark transition-colors duration-300 group-hover:text-yellow-500">
                          {service.name}
                        </h4>
                        <p className="mt-1 text-sm sm:text-base text-gray-600">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;
