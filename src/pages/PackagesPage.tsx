import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { packagesData } from "@/data/packageData";
import ServiceCard from "@/components/ServiceCard";

const PackagesPage = () => {
  const { t } = useTranslation();

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
            {t("packages.title")}
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6" />
          <p className="text-secondary max-w-2xl mx-auto">
            {t("packages.subtitle")}
          </p>
        </motion.div>

        <div className="services-grid">
          {Object.values(packagesData).map((pkg) => (
            <div key={pkg.id} className="hover-scale mobile-no-animation">
              <ServiceCard
                id={pkg.id}
                image={pkg.images[0]}
                title={t(`packages.${pkg.id}.title`, pkg.title)}
                description={t(`packages.${pkg.id}.description`, pkg.description)}
                onOpenDetails={() => {}}
                linkTo={`/packages/${pkg.id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesPage;
