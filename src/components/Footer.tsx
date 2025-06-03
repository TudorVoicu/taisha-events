import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-dark-purple py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <div className="bg-dark-purple p-2 rounded-lg mr-2">
                <span className="text-gold font-playfair font-bold text-xl">TE</span>
              </div>
              <span className="text-white font-playfair text-lg">Taisha Events</span>
            </Link>
            <p className="text-light-gray text-sm">
              {t("footer.description")}
            </p>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg text-gold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-light-gray hover:text-gold transition-colors duration-300 text-sm">{t("nav.home")}</Link></li>
              <li><Link href="/services" className="text-light-gray hover:text-gold transition-colors duration-300 text-sm">{t("nav.services")}</Link></li>
              <li><Link href="/menu" className="text-light-gray hover:text-gold transition-colors duration-300 text-sm">{t("nav.menu")}</Link></li>
              <li><Link href="/contact" className="text-light-gray hover:text-gold transition-colors duration-300 text-sm">{t("nav.contact")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg text-gold mb-4">{t("footer.services")}</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-light-gray hover:text-gold transition-colors duration-300 text-sm">{t("services.event.title")}</Link></li>
              <li><Link href="/services" className="text-light-gray hover:text-gold transition-colors duration-300 text-sm">{t("services.private.title")}</Link></li>
              <li><Link href="/services" className="text-light-gray hover:text-gold transition-colors duration-300 text-sm">{t("services.vip.title")}</Link></li>
              <li><Link href="/services" className="text-light-gray hover:text-gold transition-colors duration-300 text-sm">{t("services.equipment.title")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg text-gold mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-light-gray hover:text-gold transition-colors duration-300 text-sm">{t("footer.terms")}</Link></li>
              <li><Link href="#" className="text-light-gray hover:text-gold transition-colors duration-300 text-sm">{t("footer.privacy")}</Link></li>
              <li><Link href="#" className="text-light-gray hover:text-gold transition-colors duration-300 text-sm">{t("footer.cookie")}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dark-purple mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-light-gray text-sm mb-4 md:mb-0">
            &copy; {currentYear} Taisha Events. {t("footer.rights")}
          </p>
          
          <div className="flex gap-4">
            <a href="#" className="text-light-gray hover:text-gold transition-colors duration-300" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-light-gray hover:text-gold transition-colors duration-300" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-light-gray hover:text-gold transition-colors duration-300" aria-label="WhatsApp">
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
