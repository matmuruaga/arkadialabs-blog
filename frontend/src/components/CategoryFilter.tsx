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
      <button
        onClick={() => onCategoryChange(null)}
        className={cn(
          "px-6 py-2 rounded-full font-medium transition-all duration-300",
          activeCategory === null
            ? "bg-site-accent-blue text-white shadow-lg shadow-site-accent-blue/30"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        )}
      >
        Todos
      </button>
      {validCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={cn(
            "px-6 py-2 rounded-full font-medium transition-all duration-300",
            activeCategory === category.slug
              ? "bg-site-accent-blue text-white shadow-lg shadow-site-accent-blue/30"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          {category.name}
        </button>
      ))}
    </motion.div>
  );
}
