"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { getArticleBySlug, Article, getStrapiImageUrl } from "@/lib/strapi";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ArticleContent } from "@/components/ArticleContent";
import { TableOfContents } from "@/components/TableOfContents";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string>("");
  const { scrollY } = useScroll();

  // Parallax effect - más sutil y con mejor fade out
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.1]);
  const contentY = useTransform(scrollY, [0, 400], [0, -100]);

  useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams.slug);
    });
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    async function fetchArticle() {
      try {
        setLoading(true);
        const data = await getArticleBySlug(slug);
        if (!data) {
          notFound();
        }
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-4 border-site-accent-blue/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-site-accent-blue border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-muted-foreground font-medium">Cargando artículo...</p>
        </motion.div>
      </div>
    );
  }

  if (!article) {
    return notFound();
  }

  const imageUrl = getStrapiImageUrl(article.featuredImage);
  const contentText = typeof article.content === 'string' ? article.content : '';
  const readingTime = calculateReadingTime(contentText);

  return (
    <>
      <ReadingProgress />
      <TableOfContents content={contentText} />

      <article className="min-h-screen bg-background">
        {/* Back Button - Improved design */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-6 left-6 z-50"
        >
          <Link
            href="/blog"
            className="group flex items-center gap-2 px-5 py-2.5 bg-background/95 backdrop-blur-xl border border-border/50 rounded-full hover:border-site-accent-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-site-accent-blue/10"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-semibold text-sm">Volver</span>
          </Link>
        </motion.div>

        {/* Share Button - New */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-6 right-6 z-50"
        >
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: article.title,
                  text: article.excerpt || '',
                  url: window.location.href,
                });
              }
            }}
            className="group flex items-center gap-2 px-5 py-2.5 bg-background/95 backdrop-blur-xl border border-border/50 rounded-full hover:border-site-accent-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-site-accent-blue/10"
          >
            <Share2 className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span className="font-semibold text-sm">Compartir</span>
          </button>
        </motion.div>

        {/* Hero Section - Completely Redesigned */}
        <motion.section
          style={{ opacity: heroOpacity }}
          className="relative h-[85vh] overflow-hidden"
        >
          {/* Image with Parallax */}
          <motion.div
            style={{ scale: heroScale }}
            className="absolute inset-0"
          >
            <Image
              src={imageUrl}
              alt={article.featuredImageAlt || article.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Multi-layer Gradient Overlay for Maximum Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/30" /> {/* Extra overlay for text readability */}

          {/* Content Container */}
          <motion.div
            style={{ y: contentY }}
            className="absolute inset-0 flex items-end"
          >
            <div className="w-full px-6 pb-16 md:pb-20">
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
                      <Badge
                        key={category.id}
                        className="bg-site-accent-blue/90 backdrop-blur-md text-white border-0 px-4 py-1.5 text-sm font-semibold shadow-lg hover:bg-site-accent-blue transition-all duration-300"
                        style={{
                          animation: `fadeInUp 0.5s ease-out ${0.3 + index * 0.1}s both`
                        }}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </motion.div>
                )}

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
                  style={{
                    textShadow: '0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  {article.title}
                </motion.h1>

                {/* Meta Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap items-center gap-6 text-white/95"
                  style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.4)'
                  }}
                >
                  {article.author && (
                    <div className="flex items-center gap-2.5 group">
                      <div className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="font-semibold">
                        {article.author.name}
                      </span>
                    </div>
                  )}
                  {article.publishedAt && (
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <time dateTime={article.publishedAt} className="font-medium">
                        {formatDate(article.publishedAt)}
                      </time>
                    </div>
                  )}
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{readingTime} min de lectura</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Article Content Section */}
        <section className="relative bg-background">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-24">
            {/* Excerpt */}
            {article.excerpt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed font-light pb-12 border-b border-border/50">
                  {article.excerpt}
                </p>
              </motion.div>
            )}

            {/* Main Content */}
            <ArticleContent content={article.content} />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-20 pt-12 border-t border-border/50"
              >
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">
                  Etiquetas
                </h3>
                <div className="flex flex-wrap gap-3">
                  {article.tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant="outline"
                      className="px-4 py-2 text-sm font-medium hover:bg-site-accent-blue/10 hover:border-site-accent-blue/50 transition-all duration-300 cursor-pointer"
                    >
                      #{tag.name}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </article>

      {/* Keyframes for animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
