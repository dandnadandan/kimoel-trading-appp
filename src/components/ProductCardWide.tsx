import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ProductCardWideProps {
  id: string;
  name: string;
  description: string;
  image: string;
  stock?: number;
  basePath?: string;
}

const ProductCardWide: React.FC<ProductCardWideProps> = ({
  id,
  name,
  description,
  image,
  stock,
  basePath = "/products",
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group cursor-pointer"
      onClick={() => navigate(`${basePath}/${id}`)}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden bg-gray-50">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-brand-blue-dark mb-2 transition-colors duration-300 group-hover:text-[#FFD700]">
            {name}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
            {description}
          </p>

          {/* Stock Badge */}
          {stock !== undefined && (
            <div className="mb-4">
              <Badge
                variant="outline"
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                  stock > 0
                    ? "border-green-300 bg-green-50 text-green-700"
                    : "border-red-300 bg-red-50 text-red-700"
                }`}
              >
                {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
              </Badge>
            </div>
          )}

          {/* CTA Button */}
          <button className="w-full py-2.5 px-4 bg-[#FFD700] hover:bg-[#e6c200] text-brand-blue-dark font-semibold rounded-lg transition-colors duration-200 text-sm sm:text-base">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardWide;
