import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber = "123456789" // This will be replaced with the actual number later
}) => {
  const handleWhatsAppClick = () => {
    // Format: https://wa.me/<number>
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button 
      onClick={handleWhatsAppClick}
      className="whatsapp-button bg-whatsapp text-white"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
    </button>
  );
};

export default WhatsAppButton;