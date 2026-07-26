import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { serviceData } from "@/data/serviceData";
import ServiceCard from "@/components/ServiceCard";

const B2BPage = () => {
  const { t } = useTranslation();

  const b2bServices = Object.values(serviceData).filter(service => service.section === "b2b");

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
            {t("services.b2bTitle")}
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-secondary max-w-2xl mx-auto">
            {t("services.b2bSubtitle")}
          </p>
        </motion.div>

        <div className="services-grid">
          {b2bServices.map((service) => (
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
      </div>
    </section>
  );
};

export default B2BPage;
