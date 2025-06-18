import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Check } from "lucide-react";
import { packagesData, type Package } from "@/data/packageData";
import { Button } from "@/components/ui/button";

const PackageDetailPage = () => {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && packagesData[id]) {
      setPackageData(packagesData[id]);
    }
    setLoading(false);
  }, [id]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const cycleNext = () => {
    if (!packageData?.images?.length) return;
    setCurrentImageIndex((prev) => (prev + 1) % packageData.images.length);
  };

  const cyclePrevious = () => {
    if (!packageData?.images?.length) return;
    setCurrentImageIndex((prev) =>
      (prev - 1 + packageData.images.length) % packageData.images.length
    );
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      cycleNext();
    }, 10000);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!packageData?.images?.length || !imageRef.current) return;
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
  }, [packageData]);


  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen pt-24 flex flex-col justify-center items-center bg-background">
        <h2 className="text-2xl font-playfair mb-4">{t("packageDetail.notFound")}</h2>
        <Button 
          onClick={() => setLocation("/packages")}
          className="bg-gold hover:bg-opacity-80 text-white"
        >
          {t("packageDetail.backToPackages")}
        </Button>
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <Button 
          onClick={() => setLocation("/packages")}
          variant="outline" 
          className="mb-8 border-gold text-gold hover:bg-gold hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("packageDetail.backToPackages")}
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            ref={imageRef}
            key={packageData.images[currentImageIndex]}
            onClick={handleImageClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-lg overflow-hidden shadow-lg w-full h-[400px] cursor-pointer select-none"
          >
            <img
              src={packageData.images[currentImageIndex]}
              alt={`${t(`packages.${packageData.id}.title`)} image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t(`packages.${packageData.id}.title`)}
            </h1>
            
            <div className="w-16 h-1 bg-gold mb-6"></div>
            
            <p className="text-secondary mb-8">
              {t(`packages.${packageData.id}.description`)}
            </p>
            
            <div className="mb-8">
              <h3 className="font-playfair text-xl font-semibold text-foreground mb-4">
                {t("packages.pricing")}
              </h3>
              <ul className="space-y-3">
                {packageData.pricing.map((price, index) => (
                  <li key={index} className="text-secondary" dangerouslySetInnerHTML={{ __html: price }} />
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <h3 className="font-playfair text-xl font-semibold text-foreground mb-4">
                {t("packages.includes")}
              </h3>
              <ul className="space-y-2">
                {packageData.includes.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-gold h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-playfair text-xl font-semibold text-foreground mb-4">
                {t("packages.options")}
              </h3>
              <ul className="space-y-2">
                {packageData.options.map((option, index) => (
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
              {t("packages.inquire")}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PackageDetailPage;
