import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useScrollEffect } from "@/hooks/useScrollEffect";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import LanguageToggle from "@/components/LanguageToggle";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceData } from "@/data/serviceData";

interface NavLink {
  href: string;
  label: string;
  dropdown?: {
    href: string;
    label: string;
  }[];
}

const Header = () => {
  const [isScrolled, _setIsScrolled] = useScrollEffect(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [location] = useLocation();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const servicesDropdown = Object.values(serviceData).map(service => ({
    href: `/services/${service.id}`,
    label: t(`services.${service.id === '1' ? 'event' : service.id === '2' ? 'private' : service.id === '3' ? 'vip' : service.id === '4' ? 'corporate' : service.id === '5' ? 'flavor' : 'equipment'}.title`)
  }));

  const navLinks: NavLink[] = [
    { href: "/", label: t("nav.home") },
    { 
      href: "/services", 
      label: t("nav.services"),
      dropdown: servicesDropdown 
    },
    { href: "/story", label: t("nav.story") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleDropdownToggle = (href: string) => {
    if (isMobile) {
      setActiveDropdown(activeDropdown === href ? null : href);
    }
  };

  const handleDropdownHover = (href: string, isHovering: boolean) => {
    if (isMobile) return;
    
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    
    if (isHovering) {
      setActiveDropdown(href);
    } else {
      dropdownTimeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 300);
    }
  };

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out flex items-center justify-between px-4 md:px-12 ${
        isScrolled
          ? "h-16 bg-black/90 shadow-lg"
          : "h-20 bg-black backdrop-blur-sm"
      }`}
    >
      <motion.div
        className="transition-transform duration-500 ease-in-out"
        animate={{ scale: isScrolled ? 0.7 : 1 }}
      >
        <Link href="/" className="flex items-center">
          <div className="bg-primary p-2 rounded-lg mr-2 border border-gold">
            <span className="text-gold font-playfair font-bold text-2xl">TE</span>
          </div>
          <span className="text-white font-playfair text-xl">Taisha Events</span>
        </Link>
      </motion.div>

      {/* Desktop Navigation Menu - Centered */}
      <nav className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
        <ul className="flex space-x-8">
          {navLinks.map((link) => (
            <li key={link.href} className="relative">
              {link.dropdown ? (
                <div
                  onMouseEnter={() => handleDropdownHover(link.href, true)}
                  onMouseLeave={() => handleDropdownHover(link.href, false)}
                >
                  <button
                    onClick={() => handleDropdownToggle(link.href)}
                    className={`flex items-center text-white hover:text-gold transition-colors duration-300 ${
                      location === link.href || location.startsWith(`${link.href}/`) ? "text-gold" : ""
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  
                  {activeDropdown === link.href && (
                    <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-background border border-gold py-1 z-50">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-gold hover:text-white transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href}
                  className={`text-white hover:text-gold transition-colors duration-300 ${
                    location === link.href ? "text-gold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <LanguageToggle />
        <Button
          variant="ghost" 
          className="md:hidden text-white p-1"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-primary bg-opacity-95 shadow-lg py-4 z-50">
          <div className="flex flex-col items-center gap-2 py-4">
            {navLinks.map((link) => (
              <div key={link.href} className="w-full text-center">
                {link.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(link.href)}
                      className={`flex items-center justify-center mx-auto text-white hover:text-gold transition-colors duration-300 py-2 ${
                        location === link.href || location.startsWith(`${link.href}/`) ? "text-gold" : ""
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${activeDropdown === link.href ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {activeDropdown === link.href && (
                      <div className="py-2 w-full">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block py-2 text-white hover:text-gold text-sm"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`block py-2 text-white hover:text-gold transition-colors duration-300 ${
                      location === link.href ? "text-gold" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
