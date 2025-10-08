"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getArticles, getCategories, Article } from "@/lib/strapi";
import { BlogCard } from "@/components/BlogCard";
import { CategoryFilter } from "@/components/CategoryFilter";

interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [articlesData, categoriesData] = await Promise.all([
          getArticles(1, 20),
          getCategories(),
        ]);

        setArticles(articlesData.data);
        setCategories(categoriesData.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredArticles = activeCategory
    ? articles.filter((article) =>
        article.categories?.some((cat) => cat.slug === activeCategory)
      )
    : articles;

  const featuredArticle = filteredArticles[0];
  const otherArticles = filteredArticles.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 border-4 border-site-accent-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Cargando artículos...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-site-accent-blue/5 via-site-accent-purple/5 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Descubre las últimas tendencias en tecnología, innovación y desarrollo
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-muted-foreground">
              No se encontraron artículos en esta categoría
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
            {/* Featured Article - Full Width */}
            {featuredArticle && (
              <BlogCard article={featuredArticle} featured index={0} />
            )}

            {/* Other Articles */}
            {otherArticles.map((article, index) => (
              <BlogCard key={article.id} article={article} index={index + 1} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
