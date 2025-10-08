"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowUpRight, User } from "lucide-react";
import { Article, getStrapiImageUrl, convertContentToText } from "@/lib/strapi";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  article: Article;
  featured?: boolean;
  index?: number;
  variant?: "default" | "compact" | "large";
}

export function BlogCard({
  article,
  featured = false,
  index = 0,
  variant = "default",
}: BlogCardProps) {
  // Validation
  if (!article || !article.title || !article.slug) {
    console.error("Invalid article data:", article);
    return null;
  }

  const imageUrl = getStrapiImageUrl(article.featuredImage);
  const contentText = convertContentToText(article.content);
  const readingTime = calculateReadingTime(contentText);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  // Different card sizes and layouts
  const getCardClasses = () => {
    if (featured) {
      return "md:col-span-2 lg:col-span-3 md:row-span-2";
    }
    if (variant === "large") {
      return "md:col-span-2";
    }
    if (variant === "compact") {
      return "md:col-span-1";
    }
    return "md:col-span-1";
  };

  const getImageHeight = () => {
    if (featured) return "h-[500px] md:h-[600px]";
    if (variant === "large") return "h-[350px]";
    if (variant === "compact") return "h-[200px]";
    return "h-[280px]";
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-3xl bg-card border border-border/50 transition-all duration-500 hover:border-site-accent-blue/50 hover:shadow-2xl hover:shadow-site-accent-blue/10 ${getCardClasses()}`}
    >
      <Link href={`/blog/${article.slug}`} className="block h-full">
        {/* Image Container with Parallax Effect */}
        <div className={`relative overflow-hidden ${getImageHeight()}`}>
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={imageUrl}
              alt={article.featuredImageAlt || article.title}
              fill
              className="object-cover"
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, 80vw"
                  : "(max-width: 768px) 100vw, 33vw"
              }
            />
          </motion.div>

          {/* Multi-layer Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-site-accent-blue/0 via-transparent to-site-accent-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Categories - Top Left */}
          {article.categories && article.categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="absolute top-4 left-4 flex flex-wrap gap-2"
            >
              {article.categories.slice(0, 2).map((category) => (
                <Badge
                  key={category.id}
                  className="bg-site-accent-blue/90 backdrop-blur-md text-white border-0 px-3 py-1 text-xs font-semibold shadow-lg hover:bg-site-accent-blue transition-all duration-300"
                >
                  {category.name}
                </Badge>
              ))}
            </motion.div>
          )}

          {/* Reading Time Badge - Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-medium"
          >
            <Clock className="w-3.5 h-3.5" />
            {readingTime} min
          </motion.div>

          {/* Content Overlay - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            {/* Title */}
            <motion.h3
              className={`font-bold text-white mb-3 line-clamp-2 transition-all duration-300 group-hover:text-site-accent-blue/90 ${
                featured
                  ? "text-3xl md:text-4xl lg:text-5xl leading-tight"
                  : variant === "large"
                  ? "text-2xl md:text-3xl"
                  : "text-xl md:text-2xl"
              }`}
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              {article.title}
            </motion.h3>

            {/* Excerpt - Only for featured and large cards */}
            {(featured || variant === "large") && article.excerpt && (
              <p
                className={`text-white/90 mb-4 line-clamp-2 ${
                  featured ? "text-base md:text-lg" : "text-sm md:text-base"
                }`}
                style={{
                  textShadow: "0 1px 8px rgba(0,0,0,0.4)",
                }}
              >
                {article.excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              {article.author && (
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white/10 backdrop-blur-sm rounded-full">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">{article.author.name}</span>
                </div>
              )}
              {article.publishedAt && (
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white/10 backdrop-blur-sm rounded-full">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <time dateTime={article.publishedAt} className="font-medium">
                    {formatDate(article.publishedAt)}
                  </time>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Read More Arrow - Appears on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute bottom-6 right-6 p-3 bg-site-accent-blue rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <ArrowUpRight className="w-5 h-5 text-white" />
        </motion.div>

        {/* Tags Section - Below Image for Compact Cards */}
        {variant === "compact" && article.tags && article.tags.length > 0 && (
          <div className="p-4 bg-muted/30">
            <div className="flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </Link>
    </motion.article>
  );
}
