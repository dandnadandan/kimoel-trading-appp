import React from "react";
import { Facebook } from "lucide-react";
import logo from "@/assets/Back.png";

const Footer = () => {
  return (
    <footer className="bg-brand-blue-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-8">
          {/* Company Info (span 2 cols on small for better balance) */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logo}
                alt="Kimoel Trading Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
              <span className="text-xl sm:text-2xl font-bold leading-tight">
                KIMOEL TRADING Inc.
              </span>
            </div>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base max-w-prose">
              Delivering reliable industrial products and engineering solutions —
              from automation systems to fabrication and construction services —
              trusted across the Philippines.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer Quick Links">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="#home" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:text-primary transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-primary transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-white/80">
              <li>
                <a
                  href="https://maps.app.goo.gl/xSc6w4EyVPZsqq2t6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 hover:text-primary transition-colors"
                >
                  <span aria-hidden>📍</span>
                  <span>
                    Purok 1, Brgy. Lodlod, Lipa City, Batangas 4217 Philippines
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+63432332566"
                  className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <span aria-hidden>📞</span>
                  <span>+63 (043) 233 - 2566</span>
                </a>
              </li>
              <li className="break-all">
                <a
                  href="mailto:kimoel_leotagle@yahoo.com"
                  className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <span aria-hidden>📧</span>
                  <span>kimoel_leotagle@yahoo.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100075976223841"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Facebook className="w-5 h-5 text-[#1877F2]" aria-hidden />
                  <span>Kimoel Trading and Construction Incorporated</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 pt-5 text-left text-xs sm:text-sm text-white/70">
          © {new Date().getFullYear()} KIMOEL TRADING Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
