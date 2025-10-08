"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp } from "lucide-react";
import { Article } from "@/lib/strapi";

interface SearchBarProps {
  articles: Article[];
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({
  articles,
  onSearch,
  placeholder = "Buscar artículos...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Extract popular search terms from articles
  useEffect(() => {
    if (articles.length > 0) {
      const categories = new Set<string>();
      articles.forEach((article) => {
        article.categories?.forEach((cat) => categories.add(cat.name));
      });
      setSuggestions(Array.from(categories).slice(0, 5));
    }
  }, [articles]);

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
    onSearch("");
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setIsFocused(false);
  };

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // Escape to blur
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-12">
      {/* Search Input Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative transition-all duration-300 ${
          isFocused
            ? "ring-2 ring-site-accent-blue/50 shadow-xl shadow-site-accent-blue/10"
            : "shadow-lg"
        }`}
        style={{ borderRadius: "1rem" }}
      >
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Search
            className={`w-5 h-5 transition-colors duration-300 ${
              isFocused ? "text-site-accent-blue" : "text-muted-foreground"
            }`}
          />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="w-full pl-12 pr-24 py-4 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-300"
        />

        {/* Keyboard Shortcut Hint */}
        {!isFocused && !query && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground">
            <kbd className="px-2 py-1 bg-muted/50 rounded border border-border/50 font-mono">
              ⌘K
            </kbd>
          </div>
        )}

        {/* Clear Button */}
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 bg-muted/50 hover:bg-muted rounded-lg transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Search Suggestions */}
      <AnimatePresence>
        {isFocused && !query && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl z-20"
          >
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              Temas populares
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 bg-muted/50 hover:bg-site-accent-blue/10 hover:text-site-accent-blue rounded-lg text-sm font-medium transition-all duration-200 border border-transparent hover:border-site-accent-blue/30"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Results Count */}
      <AnimatePresence>
        {query && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-3 text-sm text-muted-foreground text-center"
          >
            Buscando: <span className="font-semibold text-foreground">{query}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
