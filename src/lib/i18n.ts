import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "@/translations/en.json";
import roTranslation from "@/translations/ro.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      ro: {
        translation: roTranslation
      }
    },
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
