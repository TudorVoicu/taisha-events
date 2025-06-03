import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useParams, useLocation } from "wouter";
import { getBlogPostBySlug } from "@/data/blogData";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { formatDate } from "@/lib/utils";

interface BlogPostParams {
  slug: string;
}

const BlogPostPage = () => {
  const { t } = useTranslation();
  const params = useParams<BlogPostParams>();
  const [, setLocation] = useLocation();
  const blogPost = params.slug ? getBlogPostBySlug(params.slug) : undefined;

  // Redirect to 404 if blog post not found
  useEffect(() => {
    if (!blogPost) {
      setLocation("/not-found");
    }
  }, [blogPost, setLocation]);

  // If post is loading or not found, show nothing (will redirect)
  if (!blogPost) {
    return null;
  }

  const formattedDate = formatDate(blogPost.date);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Image Background */}
      <div 
        className="relative h-[60vh] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${blogPost.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/blog">
              <Button 
                variant="outline" 
                className="mb-6 border-gold text-gold hover:bg-gold hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("blog.backToBlog")}
              </Button>
            </Link>
            
            <h1 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-5">
              {blogPost.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-secondary">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{blogPost.readTime} min read</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Blog Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-lg max-w-none"
          >
            {blogPost.content.map((paragraph, index) => (
              <p key={index} className="text-secondary mb-6">
                {paragraph}
              </p>
            ))}
          </motion.div>
          
          <div className="mt-12 pt-8 border-t border-muted">
            <Link href="/blog">
              <Button 
                variant="outline" 
                className="border-gold text-gold hover:bg-gold hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("blog.backToBlog")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;