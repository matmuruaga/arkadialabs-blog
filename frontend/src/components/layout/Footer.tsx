"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Zap,
  ArrowUpRight,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { href: "/", label: "Home" },
        { href: "/blog", label: "Blog" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/blog", label: "Articles" },
        { href: "/blog", label: "Tutorials" },
        { href: "/blog", label: "Guides" },
        { href: "/blog", label: "Newsletter" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms of Use" },
        { href: "/cookies", label: "Cookies" },
      ],
    },
  ];

  const socialLinks = [
    {
      href: "https://github.com/arkadialabs",
      label: "GitHub",
      icon: Github,
    },
    {
      href: "https://linkedin.com/company/arkadialabs",
      label: "LinkedIn",
      icon: Linkedin,
    },
    {
      href: "https://twitter.com/arkadialabs",
      label: "Twitter",
      icon: Twitter,
    },
    {
      href: "mailto:contact@arkadialabs.io",
      label: "Email",
      icon: Mail,
    },
  ];

  return (
    <footer className="relative bg-background border-t border-border/50 mt-20">
      {/* Decorative gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-site-accent-blue to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center"
              >
                <Image
                  src="https://res.cloudinary.com/dwhidn4z1/image/upload/v1759500046/arcadia_labs_COMPLETO_oggaxg.svg"
                  alt="ArkadiaLabs"
                  width={180}
                  height={40}
                  className="h-8 w-auto"
                />
              </motion.div>
            </Link>

            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Innovation and technology at the service of ideas. Transforming
              concepts into digital realities.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 bg-muted/50 hover:bg-site-accent-blue/10 rounded-lg transition-all duration-300 group border border-transparent hover:border-site-accent-blue/30"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-site-accent-blue transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-muted-foreground hover:text-site-accent-blue transition-colors duration-200"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-y border-border/50 mb-8">
          <div className="max-w-2xl">
            <h3 className="text-lg font-bold mb-2">
              Stay up to date with our latest news
            </h3>
            <p className="text-muted-foreground mb-4">
              Receive the latest updates, articles, and resources directly in
              your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-site-accent-blue/50 focus:border-site-accent-blue transition-all font-medium"
              />
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-3.5 bg-gradient-to-r from-site-accent-blue to-site-accent-purple text-white rounded-full font-bold text-sm uppercase tracking-wide shadow-xl shadow-site-accent-blue/30 hover:shadow-2xl hover:shadow-site-accent-blue/50 transition-all duration-300 whitespace-nowrap border-2 border-white/20"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            © {currentYear} ArkadiaLabs. Powered by
            <Zap className="w-4 h-4 text-site-accent-blue inline animate-pulse" />
            Automation
          </p>
          <p className="text-xs">
            Designed and developed by the ArkadiaLabs team
          </p>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-site-accent-purple to-transparent" />
    </footer>
  );
}
