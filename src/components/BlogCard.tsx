import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "wouter";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  readTime: number;
}

const BlogCard = ({ 
  //id, 
  slug, 
  title, 
  excerpt, 
  image, 
  date, 
  author,
  readTime 
}: BlogCardProps) => {
  const { t } = useTranslation();
  const formattedDate = formatDate(date);

  return (
    <motion.div 
      className="bg-card rounded-lg overflow-hidden shadow-lg h-full flex flex-col"
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
        <div className="flex justify-between items-center text-sm text-secondary mb-2">
          <span>{formattedDate}</span>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{readTime} min read</span>
          </div>
        </div>
        
        <h3 className="font-playfair text-xl font-semibold text-foreground mb-3">{title}</h3>
        
        <p className="text-secondary text-sm mb-4 flex-grow">
          {excerpt}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-gold text-sm">{author}</span>
          
          <Link href={`/blog/${slug}`}>
            <Button
              className="bg-gold hover:bg-opacity-80 text-white px-4 py-2 rounded-sm text-sm flex items-center gap-2 transition-colors duration-300 hover-button"
            >
              {t("blog.readMore")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;