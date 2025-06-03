import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getAllBlogPosts } from "@/data/blogData";
import BlogCard from "@/components/BlogCard";

const BlogPage = () => {
  const { t } = useTranslation();
  const blogPosts = getAllBlogPosts();
  
  return (
    <section className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("blog.title")}
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-secondary max-w-2xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </motion.div>
        
        <div className="services-grid">
          {blogPosts.map((post) => (
            <div key={post.id} className="hover-scale mobile-no-animation">
              <BlogCard
                id={post.id}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image}
                date={post.date}
                author={post.author}
                readTime={post.readTime}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;