import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { serviceData } from "@/data/serviceData";
import ServiceCard from "@/components/ServiceCard";

const HomePage = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  // Only show the first 4 services on the homepage
  const featuredServices = Object.values(serviceData).slice(0, 4);

  return (
    <>
      {/* Hero Section - Full screen height with background image */}
      <section className="hero-section relative">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517914515328-83ea9bd8b353?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Luxury hookah lounge" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/70 to-primary/90 opacity-70"></div>
        </div>
        
        <motion.div 
          className="container mx-auto px-4 z-10 text-center"
          style={{ opacity, scale }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="bg-primary/40 backdrop-blur-sm p-12 rounded-lg border border-gold inline-block mb-8">
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-custom-gray">
              <span className="text-gold">Taisha</span> Events
            </h1>
          </div>
          
          <p className="font-montserrat text-lg md:text-xl text-custom-gray max-w-2xl mx-auto mb-10 drop-shadow-lg">
            {t("hero.description")}
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/services">
              <Button className="bg-gold hover:bg-opacity-80 text-white font-medium py-6 px-8 text-lg hover-button">
                {t("hero.servicesBtn")}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-gold text-gold hover:bg-custom-gray font-medium py-6 px-8 text-lg hover-button">
                {t("hero.contactBtn")}
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("home.featuredServices")}
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-secondary max-w-2xl mx-auto">
              {t("home.featuredServicesDescription")}
            </p>
          </div>
          
          <div className="services-grid">
            {featuredServices.map((service) => (
              <div key={service.id} className="hover-scale mobile-no-animation">
                <ServiceCard
                  id={service.id}
                  image={service.images[0]}
                  title={t(`services.${service.id}.title`)}
                  description={t(`services.${service.id}.description`)}
                  onOpenDetails={() => {}}
                  linkTo={`/services/${service.id}`}
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="outline" className="border-gold text-gold py-8 px-12 text-2xl inline-flex items-center gap-2 hover-button">
                {t("home.viewAllServices")}
                <ArrowRight className="w-8 h-8" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Us Brief Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gold mb-6">
                {t("home.aboutUsTitle")}
              </h2>
              <p className="mb-6 leading-relaxed">
                {t("home.aboutUsDescription1")}
              </p>
              <p className="mb-8 leading-relaxed">
                {t("home.aboutUsDescription2")}
              </p>
              <Link href="/story">
                <Button className="bg-gold hover:bg-opacity-80 text-white inline-flex items-center gap-2 hover-button">
                  {t("home.readOurStory")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1551214851-bccdafc5d75a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Luxury hookah setup" 
                className="rounded-lg shadow-xl w-full" 
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;