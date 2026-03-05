import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';

// Import your image (replace the file name with your actual image)
import aboutImage from '@/assets/ABOUT US.png';

const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/30 scroll-mt-24">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Company Intro */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-blue-dark mb-6">
              About KIMOEL TRADING & <br /> CONSTRUCTION Inc.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Kimoel Trading and Construction, Inc. (formerly Kimoel Trading and Construction Services) 
              was founded by Mr. Leo L. Tagle and Mrs. Kim Karen Tagle in June 2017. The company provides 
              a wide range of services in civil, mechanical, and electrical works, serving industrial, 
              commercial, and residential projects.
              <br /><br />
              As an accredited in-house contractor of PEZA-registered Laguna Technopark Association, Inc. 
              and Mitsubishi-Hitachi Philippines, Inc., Kimoel has built a strong reputation for delivering 
              quality solutions and reliable service.
            </p>
          </div>

          {/* Company image */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={aboutImage}
              alt="About Kimoel Trading & Construction"
              className="w-full h-auto max-h-[75vh] object-contain bg-gray-50 rounded-2xl md:h-[400px] md:object-cover"
            />
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Vision */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <Eye className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-semibold text-brand-blue-dark mb-4">Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our vision is to deliver goods and services that exceed the expectations of our clients, suppliers, 
              management, and manpower who are all part of the growth of this company.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <Target className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-semibold text-brand-blue-dark mb-4">Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To build a long-term and holistic relationship that is the building block of every person’s trust. 
              Guarantee that our competitive prices are rational to the exceptional services provided through 
              innovative and advanced technology.
            </p>
          </div>

          {/* Core Values */}
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <Heart className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-semibold text-brand-blue-dark mb-4">Core Values</h3>
            <p className="text-muted-foreground leading-relaxed">
              Exhibit professionalism, integrity, and honesty in all aspects of the company from management to manpower. 
              Punctual and committed in all negotiations and business meetings. Assuring that we are not only building with 
              our hands but also with our hearts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
