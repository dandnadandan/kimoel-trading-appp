import React from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/3.png";

const Hero = () => {
  const scrollToProducts = () => {
    const target = document.getElementById("products");
    if (!target) return;

    const header = document.querySelector("header") as HTMLElement | null;
    const headerHeight = header?.offsetHeight ?? 0;
    const top =
      target.getBoundingClientRect().top + window.scrollY - (headerHeight + 8);

    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[78vh] md:min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      />
      {/* Dark/Gold overlay for readability */}
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 text-center text-white container mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-24">
        <h1
          className="
            mx-auto max-w-[18ch]
            font-extrabold tracking-tight
            leading-tight md:leading-tight
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            mb-4 sm:mb-6
          "
        >
          Explore Our Engineering &amp;
          <span className="block text-primary">Technology Solutions Today!</span>
        </h1>

        <p
          className="
            mx-auto max-w-[60ch] text-white/90
            text-base sm:text-lg md:text-xl
            mb-6 sm:mb-8
          "
        >
          Delivering innovative machines and reliable components from industrial
          equipment to electrical and electronic parts trusted by businesses
          across the Philippines.
        </p>

        <Button
          variant="hero"
          size="lg"
          className="shadow-button w-full sm:w-auto"
          onClick={scrollToProducts}
          aria-label="Scroll to products"
        >
          View Products
        </Button>
      </div>
    </section>
  );
};

export default Hero;
