import { useState, useEffect, useRef } from "react";
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

  //slideshow behaviour
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const cycleNext = () => {
    if (!service?.images.length) return;
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % service.images.length);
  };

  const cyclePrevious = () => {
    if (!service?.images.length) return;
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + service.images.length) % service.images.length
    );
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      cycleNext();
    }, 10000);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!service?.images.length || !imageRef.current) return;

    const { left, width } = imageRef.current.getBoundingClientRect();
    const clickX = e.clientX - left;

    const isLeft = clickX < width / 2;
    isLeft ? cyclePrevious() : cycleNext();
    resetTimer();
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [service]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const translatedList = (key: string, fallback: string[]): string[] => {
    const value: unknown = t(`services.${service?.id}.${key}`, { returnObjects: true, defaultValue: fallback });
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : fallback;
  };

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

  const pricing = translatedList("pricing", service.pricing);
  const includes = translatedList("includes", service.includes);
  const options = translatedList("options", service.options);

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
            ref={imageRef}
            key={service.images[currentImageIndex]}
            onClick={handleImageClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-lg overflow-hidden shadow-lg w-full h-[400px] select-none"
          >
            <img
              src={service.images[currentImageIndex]}
              alt={`${service.title} image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t(`services.${service.id}.title`)}
            </h1>
            
            <div className="w-16 h-1 bg-gold mb-6"></div>
            
            <p className="text-secondary mb-8">
              {t(`services.${service.id}.description`)}
            </p>
            
            {pricing.length > 0 && (
              <div className="mb-8">
                <h3 className="font-playfair text-xl font-semibold text-foreground mb-4">
                  {t("services.pricing")}
                </h3>
                <ul className="space-y-3">
                  {pricing.map((price, index) => (
                    <li key={index} className="text-secondary" dangerouslySetInnerHTML={{ __html: price }} />
                  ))}
                </ul>
              </div>
            )}

            {includes.length > 0 && (
              <div className="mb-8">
                <h3 className="font-playfair text-xl font-semibold text-foreground mb-4">
                  {t("services.includes")}
                </h3>
                <ul className="space-y-2">
                  {includes.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-gold h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {options.length > 0 && (
              <div>
                <h3 className="font-playfair text-xl font-semibold text-foreground mb-4">
                  {t("services.options")}
                </h3>
                <ul className="space-y-2">
                  {options.map((option, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-gold mr-2">•</span>
                      <span className="text-secondary">{option}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button 
              className="mt-8 bg-gold hover:bg-opacity-80 text-white"
              onClick={() => setLocation("/contact")}
            >
              {t("services.inquire")}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailPage;