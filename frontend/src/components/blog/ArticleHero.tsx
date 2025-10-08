"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, User, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Article } from "@/lib/strapi";
import { formatDate } from "@/lib/utils";

interface ArticleHeroProps {
  article: Article;
  imageUrl: string;
  readingTime: number;
}

export function ArticleHero({ article, imageUrl, readingTime }: ArticleHeroProps) {
  const { scrollY } = useScroll();

  // Parallax effects with smooth transitions
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.15]);
  const contentY = useTransform(scrollY, [0, 400], [0, -80]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt || "",
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      {/* Back and Share Buttons */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-20 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Back Button */}
          <Link
            href="/blog"
            className="group flex items-center gap-2 px-5 py-2.5 bg-background/95 backdrop-blur-xl border border-border/50 rounded-full hover:border-site-accent-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-site-accent-blue/10"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-semibold text-sm">Volver</span>
          </Link>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="group flex items-center gap-2 px-5 py-2.5 bg-background/95 backdrop-blur-xl border border-border/50 rounded-full hover:border-site-accent-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-site-accent-blue/10"
          >
            <Share2 className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span className="font-semibold text-sm hidden sm:inline">Compartir</span>
          </button>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative h-[85vh] min-h-[600px] overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={article.featuredImageAlt || article.title}
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </motion.div>

        {/* Sophisticated Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-site-accent-blue/5 via-transparent to-site-accent-purple/5" />

        {/* Content Container */}
        <motion.div
          style={{ y: contentY }}
          className="absolute inset-0 flex items-end"
        >
          <div className="w-full px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Categories */}
              {article.categories && article.categories.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-wrap gap-2"
                >
                  {article.categories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Badge className="bg-site-accent-blue/90 backdrop-blur-md text-white border-0 px-4 py-1.5 text-sm font-semibold shadow-lg hover:bg-site-accent-blue transition-all duration-300">
                        {category.name}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
                style={{
                  textShadow:
                    "0 4px 20px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {article.title}
              </motion.h1>

              {/* Excerpt */}
              {article.excerpt && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg md:text-xl text-white/95 max-w-3xl leading-relaxed"
                  style={{
                    textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                  }}
                >
                  {article.excerpt}
                </motion.p>
              )}

              {/* Meta Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center gap-4 md:gap-6 text-white/95"
                style={{
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {article.author && (
                  <div className="flex items-center gap-2.5 group">
                    <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full transition-all group-hover:bg-white/20">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-sm md:text-base">
                      {article.author.name}
                    </span>
                  </div>
                )}
                {article.publishedAt && (
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <time
                      dateTime={article.publishedAt}
                      className="font-medium text-sm md:text-base"
                    >
                      {formatDate(article.publishedAt)}
                    </time>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm md:text-base">
                    {readingTime} min de lectura
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-xs font-medium uppercase tracking-wider">
              Scroll
            </span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 bg-white/60 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}
