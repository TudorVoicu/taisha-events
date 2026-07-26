import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { reviewsData, getReviewText } from "@/data/reviewsData";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5" aria-hidden="true">
    {Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={
          index < rating
            ? "h-4 w-4 fill-gold text-gold"
            : "h-4 w-4 text-gold-soft"
        }
      />
    ))}
  </div>
);

const Reviews = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language?.split("-")[0] || "en";

  const averageRating =
    reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length;

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat(language, { month: "long", year: "numeric" }).format(date);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("home.reviewsTitle")}
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-secondary max-w-2xl mx-auto mb-6">
            {t("home.reviewsDescription")}
          </p>

          <div className="flex items-center justify-center gap-3">
            <span className="font-playfair text-3xl font-bold text-foreground">
              {averageRating.toFixed(1)}
            </span>
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-secondary text-sm">
              {t("home.reviewsRatingLabel")} · {reviewsData.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsData.map((review, index) => (
            <motion.article
              key={review.id}
              className="bg-card rounded-lg shadow-lg p-6 flex flex-col h-full border border-transparent hover:border-gold-soft transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.4) }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gold-soft border border-gold flex items-center justify-center flex-shrink-0">
                  <span className="font-playfair text-gold font-semibold">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-foreground font-medium truncate">{review.name}</p>
                  <p className="text-secondary text-xs">{formatDate(review.date)}</p>
                </div>
              </div>

              <div className="mb-3">
                <StarRating rating={review.rating} />
                <span className="sr-only">
                  {review.rating} {t("home.reviewsRatingLabel")}
                </span>
              </div>

              <p className="text-secondary text-sm leading-relaxed flex-grow">
                {getReviewText(review, language)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
