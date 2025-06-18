import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/data/serviceData";

interface ServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal = ({ service, isOpen, onClose }: ServiceModalProps) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            ref={modalRef}
            className="bg-dark-gray w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gold">{service.title}</h3>
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-gold transition-colors"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={service.images[0]} 
                    alt={service.title} 
                    className="w-full h-64 object-cover rounded-lg mb-4" 
                  />
                  <div className="bg-black bg-opacity-50 rounded p-4">
                    <h4 className="font-playfair text-lg font-semibold text-gold mb-3">{t("services.pricing")}</h4>
                    <div className="text-white space-y-2">
                      {service.pricing.map((price, idx) => (
                        <p key={idx} dangerouslySetInnerHTML={{ __html: price }} />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-light-gray mb-6">{service.description}</div>
                  
                  <h4 className="font-playfair text-lg font-semibold text-gold mb-3">{t("services.included")}</h4>
                  <ul className="text-light-gray space-y-2 mb-6">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="font-playfair text-lg font-semibold text-gold mb-3">{t("services.options")}</h4>
                  <ul className="text-light-gray space-y-2 mb-6">
                    {service.options.map((option, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Plus className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                        <span>{option}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full bg-dark-purple hover:bg-opacity-80 text-white py-6 rounded-sm transition-colors duration-300 border border-gold"
                  >
                    {t("services.request")}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
