"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Category {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  // Filter out invalid categories
  const validCategories = categories?.filter(
    (category) => category && category.name && category.slug
  ) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-3 mb-12"
    >
      <motion.button
        onClick={() => onCategoryChange(null)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "px-8 py-3 rounded-full font-bold transition-all duration-300 text-sm uppercase tracking-wide relative overflow-hidden",
          activeCategory === null
            ? "bg-gradient-to-r from-site-accent-blue to-site-accent-purple shadow-lg shadow-site-accent-blue/40 border-2 border-transparent"
            : "bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-site-accent-blue/50"
        )}
      >
        <span className={cn(
          activeCategory === null
            ? "text-white"
            : "text-gradient"
        )}>
          All
        </span>
      </motion.button>
      {validCategories.map((category, index) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={cn(
            "px-8 py-3 rounded-full font-bold transition-all duration-300 text-sm uppercase tracking-wide relative overflow-hidden",
            activeCategory === category.slug
              ? "bg-gradient-to-r from-site-accent-blue to-site-accent-purple shadow-lg shadow-site-accent-blue/40 border-2 border-transparent"
              : "bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-site-accent-blue/50"
          )}
        >
          <span className={cn(
            activeCategory === category.slug
              ? "text-white"
              : "text-gradient"
          )}>
            {category.name}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}
