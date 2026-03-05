import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Truck, ShieldCheck, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InvoiceModal from "@/components/InvoiceModal";
import { Badge } from "@/components/ui/badge";
import { getProductById } from "@/data/products";
import { getServiceById } from "@/data/services";

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [productId]);

  // Try products first, then services
  const product = productId
    ? getProductById(productId) ?? getServiceById(productId)
    : undefined;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-brand-blue-dark mb-2">
              Product Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 bg-[#FFD700] hover:bg-[#e6c200] text-brand-blue-dark font-semibold rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isService = !("stock" in product);
  const stock = "stock" in product ? (product as any).stock : undefined;
  const specs = product.specs;
  const hasSpecs = Object.keys(specs).length > 0;

  const featureChips = [
    { icon: Award, label: "Premium Quality" },
    { icon: Truck, label: "Fast Delivery" },
    { icon: ShieldCheck, label: "Warranty Included" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Breadcrumb / Back */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 pt-6">
          <button
            onClick={() => window.history.length > 1 ? navigate(-1) : navigate(isService ? "/services" : "/products")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-blue-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {isService ? "Services" : "Products"}
          </button>
        </div>

        {/* Product Detail */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Left - Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                {/* Main Image */}
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-6 sm:p-10">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Thumbnail strip (if multiple images) */}
                {product.images.length > 1 && (
                  <div className="border-t border-gray-100 p-3 flex gap-2 overflow-x-auto">
                    {product.images.map((img, i) => (
                      <div
                        key={i}
                        className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg border-2 border-[#FFD700] overflow-hidden bg-gray-50"
                      >
                        <img
                          src={img}
                          alt={`${product.name} ${i + 1}`}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right - Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col"
            >
              {/* Category */}
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-2">
                {product.category}
              </p>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-blue-dark mb-4">
                {product.name}
              </h1>

              {/* Stock Badge */}
              {stock !== undefined && (
                <div className="mb-4">
                  <Badge
                    variant="outline"
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      stock > 0
                        ? "border-green-300 bg-green-50 text-green-700"
                        : "border-red-300 bg-red-50 text-red-700"
                    }`}
                  >
                    {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
                  </Badge>
                </div>
              )}

              {/* Description */}
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Create Invoice Button */}
              <button
                onClick={() => setInvoiceOpen(true)}
                className="w-full py-3.5 px-6 bg-[#FFD700] hover:bg-[#e6c200] text-brand-blue-dark font-bold rounded-lg transition-colors duration-200 text-base sm:text-lg shadow-button"
              >
                Create Invoice
              </button>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-3 mt-5">
                {featureChips.map((chip) => (
                  <div
                    key={chip.label}
                    className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground bg-gray-100 rounded-full px-3 py-1.5"
                  >
                    <chip.icon className="w-3.5 h-3.5 text-[#FFD700]" />
                    {chip.label}
                  </div>
                ))}
              </div>

              {/* Specifications */}
              <div className="mt-8">
                <h2 className="text-lg sm:text-xl font-bold text-brand-blue-dark mb-4">
                  Specifications
                </h2>
                {hasSpecs ? (
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm">
                      <tbody>
                        {Object.entries(specs).map(([key, value], i) => (
                          <tr
                            key={key}
                            className={
                              i % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="px-4 py-3 font-medium text-gray-700 w-1/3 border-r border-gray-100">
                              {key}
                            </td>
                            <td className="px-4 py-3 text-gray-600 text-right">
                              {value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                    <p className="text-muted-foreground text-sm">
                      Specifications are not available for this item yet.
                      Contact us for more details.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={invoiceOpen}
        onClose={() => setInvoiceOpen(false)}
        productId={product.id}
        productName={product.name}
      />
    </div>
  );
};

export default ProductDetails;
