"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { getArticleBySlug, getArticles, Article, getStrapiImageUrl } from "@/lib/strapi";
import { calculateReadingTime } from "@/lib/utils";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ArticleContent } from "@/components/ArticleContent";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleHero } from "@/components/blog/ArticleHero";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { Badge } from "@/components/ui/badge";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string>("");

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
        const [articleData, articlesData] = await Promise.all([
          getArticleBySlug(slug),
          getArticles(1, 10),
        ]);

        if (!articleData) {
          notFound();
        }

        setArticle(articleData);
        setAllArticles(articlesData.data);
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
          <p className="text-muted-foreground font-medium">Loading article...</p>
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
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Table of Contents */}
      <TableOfContents content={contentText} />

      <article className="min-h-screen bg-background">
        {/* Article Hero Section */}
        <ArticleHero article={article} imageUrl={imageUrl} readingTime={readingTime} />

        {/* Article Content Section */}
        <section className="relative bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ArticleContent content={article.content} />
            </motion.div>

            {/* Tags Section */}
            {article.tags && article.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-20 pt-12 border-t border-border/50"
              >
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">
                  Tags
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

            {/* Author Bio Section (if available) */}
            {article.author && article.author.bio && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-16 p-8 bg-muted/30 rounded-2xl border border-border/50"
              >
                <div className="flex items-start gap-6">
                  {/* Author Avatar Placeholder */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-site-accent-blue to-site-accent-purple rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {article.author.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  {/* Author Info */}
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-2">About the Author</h4>
                    <p className="text-lg font-semibold text-site-accent-blue mb-3">
                      {article.author.name}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {article.author.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Related Articles Section */}
        {allArticles.length > 1 && (
          <RelatedArticles
            articles={allArticles}
            currentArticleId={article.id}
            maxArticles={3}
          />
        )}
      </article>
    </>
  );
}
