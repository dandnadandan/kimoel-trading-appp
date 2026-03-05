import React, { useState, useMemo, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCardWide from "@/components/ProductCardWide";
import { products, productCategories } from "@/data/products";
import { services, serviceCategories } from "@/data/services";

interface ProductListProps {
  type?: "products" | "services";
}

const ProductList: React.FC<ProductListProps> = ({ type = "products" }) => {
  const isProducts = type === "products";
  const items = isProducts ? products : services;
  const categories = isProducts ? productCategories : serviceCategories;
  const basePath = isProducts ? "/products" : "/services";
  const location = useLocation();
  const listingRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    if (location.hash === "#product-listing" && listingRef.current) {
      listingRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  const filteredItems = useMemo(() => {
    if (!activeCategory) return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-16">
          {/* Page Header */}
          <div className="text-center mb-10 md:mb-14">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-blue-dark mb-3"
            >
              {isProducts ? "Our Products" : "Our Services"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {isProducts
                ? "Explore our range of electrical, mechanical, automation, and tooling products."
                : "We provide engineering, machining, and civil works services with precision and reliability."}
            </motion.p>
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-12"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeCategory === null
                  ? "bg-[#FFD700] text-brand-blue-dark shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? null : cat)
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeCategory === cat
                    ? "bg-[#FFD700] text-brand-blue-dark shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Count */}
          <div id="product-listing" ref={listingRef} className="scroll-mt-24" />
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredItems.length} of {items.length}{" "}
            {isProducts ? "products" : "services"}
          </p>

          {/* Product Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
            layout
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCardWide
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  image={item.images[0]}
                  stock={"stock" in item ? (item as any).stock : undefined}
                  basePath={basePath}
                />
              </motion.div>
            ))}
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No {isProducts ? "products" : "services"} found in this
                category.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductList;
