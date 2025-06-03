import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Check } from "lucide-react";
import { serviceData, type Service } from "@/data/serviceData";
import { Button } from "@/components/ui/button";

const ServiceDetailPage = () => {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && serviceData[id]) {
      setService(serviceData[id]);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen pt-24 flex flex-col justify-center items-center bg-background">
        <h2 className="text-2xl font-playfair mb-4">{t("serviceDetail.notFound")}</h2>
        <Button 
          onClick={() => setLocation("/services")}
          className="bg-gold hover:bg-opacity-80 text-white"
        >
          {t("serviceDetail.backToServices")}
        </Button>
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <Button 
          onClick={() => setLocation("/services")}
          variant="outline" 
          className="mb-8 border-gold text-gold hover:bg-gold hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("serviceDetail.backToServices")}
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-[400px] object-cover" 
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t(`services.${id === '1' ? 'event' : id === '2' ? 'private' : id === '3' ? 'vip' : id === '4' ? 'corporate' : id === '5' ? 'flavor' : 'equipment'}.title`)}
            </h1>
            
            <div className="w-16 h-1 bg-gold mb-6"></div>
            
            <p className="text-secondary mb-8">
              {t(`services.${id === '1' ? 'event' : id === '2' ? 'private' : id === '3' ? 'vip' : id === '4' ? 'corporate' : id === '5' ? 'flavor' : 'equipment'}.description`)}
            </p>
            
            <div className="mb-8">
              <h3 className="font-playfair text-xl font-semibold text-foreground mb-4">
                {t("serviceDetail.pricing")}
              </h3>
              <ul className="space-y-3">
                {service.pricing.map((price, index) => (
                  <li key={index} className="text-secondary" dangerouslySetInnerHTML={{ __html: price }} />
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <h3 className="font-playfair text-xl font-semibold text-foreground mb-4">
                {t("serviceDetail.includes")}
              </h3>
              <ul className="space-y-2">
                {service.includes.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-gold h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-playfair text-xl font-semibold text-foreground mb-4">
                {t("serviceDetail.options")}
              </h3>
              <ul className="space-y-2">
                {service.options.map((option, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span className="text-secondary">{option}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button 
              className="mt-8 bg-gold hover:bg-opacity-80 text-white"
              onClick={() => setLocation("/contact")}
            >
              {t("serviceDetail.inquire")}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailPage;