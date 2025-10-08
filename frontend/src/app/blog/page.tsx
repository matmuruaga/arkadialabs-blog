"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { getArticles, getCategories, Article } from "@/lib/strapi";
import { BlogCard } from "@/components/BlogCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SearchBar } from "@/components/blog/SearchBar";
import { Sparkles } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
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

  // Filter articles by category and search query
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filter by category
    if (activeCategory) {
      filtered = filtered.filter((article) =>
        article.categories?.some((cat) => cat.slug === activeCategory)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((article) => {
        const titleMatch = article.title.toLowerCase().includes(query);
        const excerptMatch = article.excerpt?.toLowerCase().includes(query);
        const categoryMatch = article.categories?.some((cat) =>
          cat.name.toLowerCase().includes(query)
        );
        const tagMatch = article.tags?.some((tag) =>
          tag.name.toLowerCase().includes(query)
        );

        return titleMatch || excerptMatch || categoryMatch || tagMatch;
      });
    }

    return filtered;
  }, [articles, activeCategory, searchQuery]);

  // Asymmetric grid layout - featured + varied sizes
  const featuredArticle = filteredArticles[0];
  const largeArticles = filteredArticles.slice(1, 3);
  const regularArticles = filteredArticles.slice(3);

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
          <p className="text-muted-foreground font-medium">
            Loading articles...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-site-accent-blue/5 via-site-accent-purple/5 to-transparent" />
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(28, 126, 214, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(151, 117, 250, 0.1) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-6 mb-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-site-accent-blue/10 to-site-accent-purple/10 border border-site-accent-blue/20 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-site-accent-blue" />
              <span className="text-sm font-semibold text-foreground">
                Insights & Innovation
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
              <span className="text-gradient">Where Ideas Take Shape</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore the latest in technology, AI, web development, and digital innovation
            </p>
          </motion.div>

          {/* Search Bar */}
          <SearchBar
            articles={articles}
            onSearch={setSearchQuery}
            placeholder="Search by title, category, tag..."
          />
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

        {/* Empty State */}
        {filteredArticles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 space-y-4"
          >
            <div className="w-20 h-20 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              No Articles Found
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {searchQuery
                ? `No results for "${searchQuery}". Try a different search term.`
                : "No articles in this category yet."}
            </p>
            {(searchQuery || activeCategory) && (
              <motion.button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory(null);
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-8 py-3.5 bg-gradient-to-r from-site-accent-blue to-site-accent-purple text-white rounded-full font-bold text-sm uppercase tracking-wide shadow-xl shadow-site-accent-blue/30 hover:shadow-2xl hover:shadow-site-accent-blue/50 transition-all duration-300 border-2 border-white/20"
              >
                View All Articles
              </motion.button>
            )}
          </motion.div>
        ) : (
          <>
            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center text-muted-foreground"
            >
              {searchQuery || activeCategory ? (
                <p>
                  Mostrando{" "}
                  <span className="font-semibold text-foreground">
                    {filteredArticles.length}
                  </span>{" "}
                  {filteredArticles.length === 1 ? "artículo" : "artículos"}
                </p>
              ) : null}
            </motion.div>

            {/* Asymmetric Grid Layout - Warmwind Style */}
            <div className="space-y-8">
              {/* Featured Article - Full Width Hero */}
              {featuredArticle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <BlogCard article={featuredArticle} featured index={0} />
                  </div>
                </motion.div>
              )}

              {/* Large Articles - 2 Column */}
              {largeArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {largeArticles.map((article, index) => (
                    <BlogCard
                      key={article.id}
                      article={article}
                      variant="large"
                      index={index + 1}
                    />
                  ))}
                </div>
              )}

              {/* Regular Articles - 3 Column Grid */}
              {regularArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {regularArticles.map((article, index) => (
                    <BlogCard
                      key={article.id}
                      article={article}
                      variant="compact"
                      index={index + 3}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Load More (Placeholder for future pagination) */}
            {articles.length >= 20 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
              >
                <button
                  disabled
                  className="px-8 py-4 bg-muted/50 text-muted-foreground rounded-xl font-semibold cursor-not-allowed"
                >
                  Próximamente: Cargar más artículos
                </button>
              </motion.div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
