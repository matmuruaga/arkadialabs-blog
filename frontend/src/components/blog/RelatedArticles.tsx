"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Article, getStrapiImageUrl, convertContentToText } from "@/lib/strapi";
import { formatDate, calculateReadingTime } from "@/lib/utils";

interface RelatedArticlesProps {
  articles: Article[];
  currentArticleId: number;
  maxArticles?: number;
}

export function RelatedArticles({
  articles,
  currentArticleId,
  maxArticles = 3,
}: RelatedArticlesProps) {
  // Filter out current article and limit results
  const relatedArticles = articles
    .filter((article) => article.id !== currentArticleId)
    .slice(0, maxArticles);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-muted/30 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Artículos Relacionados</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Descubre más contenido que podría interesarte
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {relatedArticles.map((article, index) => {
            const imageUrl = getStrapiImageUrl(article.featuredImage);
            const contentText = convertContentToText(article.content);
            const readingTime = calculateReadingTime(contentText);

            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-500 hover:border-site-accent-blue/50 hover:shadow-xl hover:shadow-site-accent-blue/10"
              >
                <Link href={`/blog/${article.slug}`} className="block">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
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
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </motion.div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Category Badge */}
                    {article.categories && article.categories.length > 0 && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-site-accent-blue/90 backdrop-blur-md text-white text-xs font-semibold rounded-full shadow-lg">
                          {article.categories[0].name}
                        </span>
                      </div>
                    )}

                    {/* Reading Time */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-medium">
                      <Clock className="w-3 h-3" />
                      {readingTime} min
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground line-clamp-2 transition-colors duration-300 group-hover:text-site-accent-blue">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    {article.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {article.publishedAt && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <time dateTime={article.publishedAt}>
                              {formatDate(article.publishedAt)}
                            </time>
                          </div>
                        )}
                      </div>

                      {/* Read More Link */}
                      <div className="flex items-center gap-1 text-xs font-semibold text-site-accent-blue opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                        Leer más
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-site-accent-blue to-site-accent-purple text-white rounded-xl font-semibold shadow-lg shadow-site-accent-blue/30 hover:shadow-xl hover:shadow-site-accent-blue/40 transition-all duration-300"
          >
            Ver todos los artículos
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
