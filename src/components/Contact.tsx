import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Facebook } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" aria-hidden="true" />,
      label: "Email",
      value: "kimoel_leotagle@yahoo.com",
      href: "mailto:kimoel_leotagle@yahoo.com",
    },
    {
      icon: <Phone className="w-6 h-6" aria-hidden="true" />,
      label: "Phone",
      value: "+63 (043) 233 - 2566",
      href: "tel:+63432332566",
    },
    {
      icon: <MapPin className="w-6 h-6" aria-hidden="true" />,
      label: "Address",
      value: "Purok 1, Brgy. Lodlod, Lipa City, Batangas 4217 Philippines",
      href: "https://maps.app.goo.gl/xSc6w4EyVPZsqq2t6",
      external: true,
    },
    {
      icon: <Facebook className="w-6 h-6" aria-hidden="true" />,
      label: "Facebook",
      value: "Kimoel Trading and Construction Incorporated",
      href: "https://www.facebook.com/profile.php?id=100075976223841",
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-14 md:py-20 bg-muted/30 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-blue-dark mb-3 md:mb-6">
            Contact Us
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8">
            Ready to discuss your project needs? Get in touch with our team of experts today.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-12">
            {contactInfo.map((info) => {
              const isExternal = Boolean((info as any).external);
              const commonLinkProps = isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <div
                  key={info.label}
                  className="group text-center p-4 sm:p-6 bg-background rounded-2xl shadow-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-white transition-transform duration-300 group-hover:scale-110">
                    {info.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-brand-blue-dark mb-1.5 sm:mb-2 transition-colors duration-300 group-hover:text-primary">
                    {info.label}
                  </h3>

                  {/* Always clickable */}
                  <a
                    href={info.href}
                    className="inline-block text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-300 break-words"
                    aria-label={`${info.label}: ${info.value}`}
                    {...commonLinkProps}
                  >
                    {info.value}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Send a Message Button */}
          <div className="text-center">
            <Button
              variant="hero"
              size="lg"
              className="shadow-button w-full sm:w-auto"
              onClick={() =>
                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=kimoel_leotagle@yahoo.com&su=Inquiry%20from%20Website&body=Hello%20KIMOEL%20Trading%20and%20Construction%2C%0A%0AI%27d%20like%20to%20inquire%20about..."
                )
              }
              aria-label="Send a message via email"
              title="Send a message via email"
            >
              Send a Message
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
