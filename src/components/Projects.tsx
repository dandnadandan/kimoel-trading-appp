import React from "react";
import { MapPin, Award, Clock } from "lucide-react";

const Projects = () => {
  return (
    <section id="projects" className="py-14 md:py-20 bg-muted/30 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10 md:mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-blue-dark mb-4 md:mb-6">
            Our Projects
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 md:mb-8">
            FIRSTANK has successfully delivered water storage solutions across the Philippines,
            serving industrial complexes, commercial establishments, and residential communities.
            Our projects demonstrate our commitment to quality, reliability, and customer satisfaction.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-12">
            {/* Completed Projects */}
            <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <Award className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark mb-1 sm:mb-2">500+</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Completed Projects</p>
            </div>

            {/* Cities Served */}
            <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <MapPin className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark mb-1 sm:mb-2">50+</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Cities Served</p>
            </div>

            {/* Years Experience */}
            <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <Clock className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-blue-dark mb-1 sm:mb-2">15+</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
