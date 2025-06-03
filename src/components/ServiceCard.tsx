import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface ServiceCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  onOpenDetails: (id: string) => void;
  linkTo?: string;
}

const ServiceCard = ({ id, image, title, description, onOpenDetails, linkTo }: ServiceCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.div 
      className="bg-card rounded-lg overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="h-60 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-playfair text-xl font-semibold text-foreground mb-3">{title}</h3>
        <p className="text-secondary text-sm mb-4 flex-grow">
          {description}
        </p>
        
        {linkTo ? (
          <Link href={linkTo}>
            <Button
              className="mt-auto self-start bg-gold hover:bg-opacity-80 text-white px-4 py-2 rounded-sm text-sm flex items-center gap-2 transition-colors duration-300"
            >
              {t("services.viewDetails")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <Button
            onClick={() => onOpenDetails(id)}
            className="mt-auto self-start bg-gold hover:bg-opacity-80 text-white px-4 py-2 rounded-sm text-sm flex items-center gap-2 transition-colors duration-300"
          >
            {t("services.viewDetails")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ServiceCard;
