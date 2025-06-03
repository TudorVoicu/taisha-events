import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Download, Eye, Mail } from "lucide-react";
import { Link } from "wouter";

const MenuPage = () => {
  const { t } = useTranslation();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/menu.pdf';
    link.download = 'Lux_Hookah_Menu.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreviewToggle = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  return (
    <section className="min-h-screen py-28 bg-dark-gray relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat opacity-30" style={{ backgroundImage: "url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22%3E%3Cg fill=%22%23D4AF37%22 fill-opacity=%220.3%22%3E%3Cpath d=%22M0 0h4v4H0V0zm10 0h4v4h-4V0zM0 10h4v4H0v-4zm10 0h4v4h-4v-4z%22/%3E%3C/g%3E%3C/svg%3E')" }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">{t("menu.title")}</h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-light-gray max-w-2xl mx-auto">
            {t("menu.subtitle")}
          </p>
        </motion.div>
        
        <div className="flex flex-col items-center justify-center">
          <motion.div 
            className="bg-dark-gray border border-gold rounded-lg overflow-hidden shadow-2xl max-w-3xl w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="aspect-w-8 aspect-h-11 bg-black w-full relative">
              <div className="absolute inset-0 flex items-center justify-center">
                {isPreviewOpen ? (
                  <iframe 
                    src="/menu.pdf" 
                    className="w-full h-full" 
                    title="Menu Preview"
                  />
                ) : (
                  <div className="w-full h-full bg-black flex flex-col items-center justify-center p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gold mb-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <h3 className="font-playfair text-2xl text-white mb-4">{t("menu.catalog.title")}</h3>
                    <p className="text-light-gray mb-8 max-w-md">
                      {t("menu.catalog.description")}
                    </p>
                    <Button 
                      onClick={handlePreviewToggle}
                      className="text-sm bg-dark-purple hover:bg-opacity-80 text-white py-2 px-6 rounded-sm flex items-center gap-2 transition-colors duration-300 border border-gold"
                    >
                      <Eye className="h-4 w-4" />
                      {t("menu.preview")}
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 bg-black">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleDownloadPDF}
                  className="bg-dark-purple hover:bg-opacity-80 text-white py-6 px-6 rounded-sm flex items-center justify-center gap-2 transition-colors duration-300 border border-gold"
                >
                  <Download className="h-5 w-5" />
                  {t("menu.download")}
                </Button>
                <Link href="/contact">
                  <Button 
                    className="bg-transparent hover:bg-dark-purple text-gold py-6 px-6 rounded-sm flex items-center justify-center gap-2 transition-colors duration-300 border border-gold"
                  >
                    <Mail className="h-5 w-5" />
                    {t("menu.request")}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-black p-5 rounded-lg border border-dark-purple">
              <h4 className="font-playfair text-lg font-semibold text-gold mb-3">{t("menu.sections.flavors.title")}</h4>
              <p className="text-light-gray text-sm">
                {t("menu.sections.flavors.description")}
              </p>
            </div>
            
            <div className="bg-black p-5 rounded-lg border border-dark-purple">
              <h4 className="font-playfair text-lg font-semibold text-gold mb-3">{t("menu.sections.hookahs.title")}</h4>
              <p className="text-light-gray text-sm">
                {t("menu.sections.hookahs.description")}
              </p>
            </div>
            
            <div className="bg-black p-5 rounded-lg border border-dark-purple">
              <h4 className="font-playfair text-lg font-semibold text-gold mb-3">{t("menu.sections.packages.title")}</h4>
              <p className="text-light-gray text-sm">
                {t("menu.sections.packages.description")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MenuPage;
