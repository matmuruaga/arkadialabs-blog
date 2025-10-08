"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";
import { convertContentToText, StrapiContent } from "@/lib/strapi";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface ArticleContentProps {
  content: StrapiContent;
}

// Custom Code Block Component with Copy functionality
function CodeBlock({ inline, className, children, ...props }: ComponentPropsWithoutRef<'code'> & { inline?: boolean }) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const code = String(children).replace(/\n$/, '');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!inline && match) {
    return (
      <div className="relative group my-8">
        <div className="absolute -top-3 left-4 px-3 py-1 bg-site-accent-blue/90 text-white text-xs font-semibold rounded-t-lg z-10">
          {match[1]}
        </div>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background z-10"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        <SyntaxHighlighter
          // @ts-expect-error - vscDarkPlus style type mismatch with react-syntax-highlighter types
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: 0,
            borderRadius: '0.75rem',
            padding: '1.5rem',
            fontSize: '0.9rem',
            lineHeight: '1.7',
            border: '1px solid hsl(var(--border) / 0.5)',
          }}
          {...props}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code
      className="px-2 py-0.5 bg-site-accent-purple/10 text-site-accent-purple rounded-md font-mono text-[0.9em] font-medium border border-site-accent-purple/20"
      {...props}
    >
      {children}
    </code>
  );
}

// Custom Blockquote Component
function Blockquote({ children, ...props }: ComponentPropsWithoutRef<'blockquote'>) {
  return (
    <blockquote
      className="relative my-8 pl-8 pr-6 py-6 bg-gradient-to-r from-site-accent-blue/5 to-transparent border-l-4 border-site-accent-blue rounded-r-xl"
      {...props}
    >
      <div className="absolute top-4 left-4 text-6xl text-site-accent-blue/20 leading-none font-serif">&ldquo;</div>
      <div className="relative z-10 text-lg text-foreground/90 italic leading-relaxed">
        {children}
      </div>
    </blockquote>
  );
}

// Custom Link Component
function CustomLink({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) {
  return (
    <a
      href={href}
      className="relative inline-flex items-center text-site-accent-blue font-semibold group"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      <span className="relative">
        {children}
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-site-accent-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </span>
      {href?.startsWith('http') && (
        <svg className="w-3 h-3 ml-1 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </a>
  );
}

// Custom Image Component
function CustomImage({ src, alt, width, height }: ComponentPropsWithoutRef<'img'>) {
  if (!src || typeof src !== 'string') return null;

  return (
    <figure className="my-12">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 shadow-2xl shadow-black/10">
        <Image
          src={src}
          alt={alt || ''}
          width={typeof width === 'number' ? width : 1200}
          height={typeof height === 'number' ? height : 675}
          className="w-full h-auto"
          loading="lazy"
        />
      </div>
      {alt && (
        <figcaption className="mt-4 text-center text-sm text-muted-foreground italic">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

// Custom Heading Components with Anchor Links
function Heading({ level, children, ...props }: ComponentPropsWithoutRef<'h1'> & { level: 1 | 2 | 3 | 4 | 5 | 6 }) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const id = String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const styles: Record<number, string> = {
    1: "text-4xl md:text-5xl font-bold text-foreground mb-8 mt-16 leading-tight",
    2: "text-3xl md:text-4xl font-bold text-foreground mb-6 mt-14 leading-tight",
    3: "text-2xl md:text-3xl font-bold text-foreground mb-5 mt-12 leading-snug",
    4: "text-xl md:text-2xl font-semibold text-foreground mb-4 mt-10 leading-snug",
    5: "text-lg md:text-xl font-semibold text-foreground mb-3 mt-8",
    6: "text-base md:text-lg font-semibold text-foreground mb-3 mt-6",
  };

  return (
    <Tag id={id} className={`group ${styles[level]}`} {...props}>
      <a href={`#${id}`} className="flex items-center gap-2 no-underline">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-site-accent-blue text-lg">#</span>
        {children}
      </a>
    </Tag>
  );
}

// Custom List Components
function UnorderedList({ children, ...props }: ComponentPropsWithoutRef<'ul'>) {
  return (
    <ul className="my-8 space-y-3 list-none" {...props}>
      {children}
    </ul>
  );
}

function OrderedList({ children, ...props }: ComponentPropsWithoutRef<'ol'>) {
  return (
    <ol className="my-8 space-y-3 list-none counter-reset-item" {...props}>
      {children}
    </ol>
  );
}

function ListItem({ children, ...props }: ComponentPropsWithoutRef<'li'>) {
  const isOrdered = props.className?.includes('ordered');

  return (
    <li className="flex gap-3 text-foreground/90 leading-relaxed" {...props}>
      {isOrdered ? (
        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 mt-0.5 bg-site-accent-blue/10 text-site-accent-blue text-sm font-bold rounded-full counter-increment-item before:content-[counter(item)]" />
      ) : (
        <span className="flex-shrink-0 w-1.5 h-1.5 mt-2.5 bg-site-accent-blue rounded-full" />
      )}
      <div className="flex-1">{children}</div>
    </li>
  );
}

// Custom Paragraph Component
function Paragraph({ children, ...props }: ComponentPropsWithoutRef<'p'>) {
  return (
    <p className="text-lg text-foreground/90 leading-[1.8] mb-6 tracking-normal" {...props}>
      {children}
    </p>
  );
}

// Custom HR Component
function HorizontalRule() {
  return (
    <div className="my-16 flex items-center justify-center">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-4 flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-site-accent-blue/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-site-accent-blue" />
        <div className="w-1.5 h-1.5 rounded-full bg-site-accent-blue/50" />
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

// Custom Table Components
function Table({ children, ...props }: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-border/50">
      <table className="w-full text-left" {...props}>
        {children}
      </table>
    </div>
  );
}

function TableHead({ children, ...props }: ComponentPropsWithoutRef<'thead'>) {
  return (
    <thead className="bg-muted/50 border-b border-border" {...props}>
      {children}
    </thead>
  );
}

function TableRow({ children, ...props }: ComponentPropsWithoutRef<'tr'>) {
  return (
    <tr className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors" {...props}>
      {children}
    </tr>
  );
}

function TableCell({ children, ...props }: ComponentPropsWithoutRef<'td'>) {
  return (
    <td className="px-6 py-4 text-foreground/90" {...props}>
      {children}
    </td>
  );
}

function TableHeader({ children, ...props }: ComponentPropsWithoutRef<'th'>) {
  return (
    <th className="px-6 py-4 font-semibold text-foreground" {...props}>
      {children}
    </th>
  );
}

export function ArticleContent({ content }: ArticleContentProps) {
  const textContent = typeof content === 'string'
    ? content
    : convertContentToText(content);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="article-content"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeBlock,
          blockquote: Blockquote,
          a: CustomLink,
          img: CustomImage,
          h1: (props) => <Heading level={1} {...props} />,
          h2: (props) => <Heading level={2} {...props} />,
          h3: (props) => <Heading level={3} {...props} />,
          h4: (props) => <Heading level={4} {...props} />,
          h5: (props) => <Heading level={5} {...props} />,
          h6: (props) => <Heading level={6} {...props} />,
          p: Paragraph,
          ul: UnorderedList,
          ol: OrderedList,
          li: ListItem,
          hr: HorizontalRule,
          table: Table,
          thead: TableHead,
          tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
          tr: TableRow,
          td: TableCell,
          th: TableHeader,
          strong: ({ children, ...props }) => (
            <strong className="font-bold text-foreground" {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em className="italic text-foreground/95" {...props}>
              {children}
            </em>
          ),
        }}
      >
        {textContent}
      </ReactMarkdown>

      <style jsx global>{`
        .article-content {
          counter-reset: item;
        }

        .counter-reset-item {
          counter-reset: item;
        }

        .counter-increment-item {
          counter-increment: item;
        }

        .counter-increment-item::before {
          content: counter(item);
        }
      `}</style>
    </motion.div>
  );
}
