import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { serviceData } from "@/data/serviceData";
import ServiceCard from "@/components/ServiceCard";

const ServicesPage = () => {
  const { t } = useTranslation();
  
  // We'll now direct users to individual service pages instead of using a modal
  const handleOpenDetails = (id: string) => {
    // This is now just a backup handler - we're using direct links
    console.log("Opening service details for:", id);
  };

  return (
    <section className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("services.title")}
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-secondary max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>
        
        <div className="services-grid">
          {Object.values(serviceData).map((service) => (
            <div key={service.id} className="hover-scale mobile-no-animation">
              <ServiceCard
                id={service.id}
                image={service.image}
                title={t(`services.${service.id === '1' ? 'event' : service.id === '2' ? 'private' : service.id === '3' ? 'vip' : service.id === '4' ? 'corporate' : service.id === '5' ? 'flavor' : 'equipment'}.title`)}
                description={t(`services.${service.id === '1' ? 'event' : service.id === '2' ? 'private' : service.id === '3' ? 'vip' : service.id === '4' ? 'corporate' : service.id === '5' ? 'flavor' : 'equipment'}.description`)}
                onOpenDetails={handleOpenDetails}
                linkTo={`/services/${service.id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
