"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Article, getStrapiImageUrl, convertContentToText } from "@/lib/strapi";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  article: Article;
  featured?: boolean;
  index?: number;
}

export function BlogCard({ article, featured = false, index = 0 }: BlogCardProps) {
  // Validación: asegurarse de que el artículo tiene la estructura correcta
  if (!article) {
    console.error("Invalid article data:", article);
    return null;
  }

  // Validación adicional de campos requeridos
  if (!article.title || !article.slug) {
    console.error("Missing required article fields:", article);
    return null;
  }

  const imageUrl = getStrapiImageUrl(article.featuredImage);
  const contentText = convertContentToText(article.content);
  const readingTime = calculateReadingTime(contentText);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:border-site-accent-blue/50 hover:shadow-2xl hover:shadow-site-accent-blue/10",
        featured && "md:col-span-2 md:row-span-2"
      )}
    >
      <Link href={`/blog/${article.slug}`} className="block">
        <div className={cn("relative overflow-hidden", featured ? "h-[400px]" : "h-[240px]")}>
          <Image
            src={imageUrl}
            alt={article.featuredImageAlt || article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Categories */}
          {article.categories && article.categories.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {article.categories.map((category) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="bg-site-accent-blue/90 text-white backdrop-blur-sm"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <h3
            className={cn(
              "font-bold text-foreground line-clamp-2 transition-colors group-hover:text-site-accent-blue",
              featured ? "text-3xl" : "text-xl"
            )}
          >
            {article.title}
          </h3>

          <p className={cn("text-muted-foreground line-clamp-3", featured && "text-lg")}>
            {article.excerpt || "Sin descripción disponible"}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {article.publishedAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min lectura</span>
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
