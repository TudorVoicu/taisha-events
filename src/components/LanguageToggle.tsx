import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    <div className="flex gap-2">
      <button
        className={`relative language-toggle text-sm cursor-pointer hover:text-gold transition-colors duration-300 ${
          language === "en" ? "text-gold" : "text-white"
        }`}
        onClick={() => changeLanguage("en")}
      >
        EN
        {language === "en" && (
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold"></span>
        )}
      </button>
      <span className="text-gray-500 text-sm">/</span>
      <button
        className={`relative language-toggle text-sm cursor-pointer hover:text-gold transition-colors duration-300 ${
          language === "ro" ? "text-gold" : "text-white"
        }`}
        onClick={() => changeLanguage("ro")}
      >
        RO
        {language === "ro" && (
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold"></span>
        )}
      </button>
    </div>
  );
};

export default LanguageToggle;
