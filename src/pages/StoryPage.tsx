import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface StorySection {
  id: string;
  titleKey: string;
  paragraph1Key: string;
  paragraph2Key: string;
  image: string;
  alt: string;
  reverse?: boolean;
}

const StoryPage = () => {
  const { t } = useTranslation();
  
  const storySections: StorySection[] = [
    {
      id: "story-1",
      titleKey: "story.1.title",
      paragraph1Key: "story.1.paragraph1",
      paragraph2Key: "story.1.paragraph2",
      image: "https://images.unsplash.com/photo-1528495612343-9ca9f4a9f67c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      alt: "Premium hookah experience"
    },
    {
      id: "story-2",
      titleKey: "story.2.title",
      paragraph1Key: "story.2.paragraph1",
      paragraph2Key: "story.2.paragraph2",
      image: "https://images.unsplash.com/photo-1551214851-bccdafc5d75a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      alt: "Premium hookah products",
      reverse: true
    },
    {
      id: "story-3",
      titleKey: "story.3.title",
      paragraph1Key: "story.3.paragraph1",
      paragraph2Key: "story.3.paragraph2",
      image: "https://images.unsplash.com/photo-1616077168087-361d8a68fde5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      alt: "Elegant lounge interior"
    },
    {
      id: "story-4",
      titleKey: "story.4.title",
      paragraph1Key: "story.4.paragraph1",
      paragraph2Key: "story.4.paragraph2",
      image: "https://images.unsplash.com/photo-1595121769138-ce7f7cc31882?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      alt: "Luxury hookah setup",
      reverse: true
    }
  ];

  return (
    <section className="pt-24 bg-background">
      {/* Story Page Intro */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("story.pageTitle")}
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-secondary max-w-3xl mx-auto">
            {t("story.pageDescription")}
          </p>
        </motion.div>
      </div>
      
      {/* Story Sections */}
      {storySections.map((section, index) => (
        <section 
          id={section.id} 
          key={section.id} 
          className={`py-16 md:py-24 ${index % 2 !== 0 ? 'bg-light-gray' : ''}`}
        >
          <div className="container mx-auto px-4">
            <div className={`flex flex-col ${section.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: section.reverse ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src={section.image} 
                  alt={section.alt} 
                  className="w-full h-[400px] object-cover rounded-lg shadow-lg" 
                />
              </motion.div>
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: section.reverse ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-gold">{t(section.titleKey)}</h2>
                <p className="text-foreground mb-6 leading-relaxed">
                  {t(section.paragraph1Key)}
                </p>
                <p className="text-secondary leading-relaxed">
                  {t(section.paragraph2Key)}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </section>
  );
};

export default StoryPage;