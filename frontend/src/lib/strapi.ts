const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// NUEVO: Tipo para imágenes en formato Strapi v5
interface StrapiImageV5 {
  id: number;
  name: string;
  url: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
  alternativeText?: string | null;
}

interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
}

interface StrapiTag {
  id: number;
  name: string;
  slug: string;
  color?: string;
}

interface StrapiAuthor {
  id: number;
  name: string;
  slug: string;
  email: string;
  bio?: string;
  avatar?: StrapiImageV5 | null;
}

// Strapi v5 Content Block Types
interface StrapiContentChild {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface StrapiContentBlock {
  type: string;
  children?: StrapiContentChild[];
  level?: number;
  format?: string;
}

export type StrapiContent = StrapiContentBlock[] | string;

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: StrapiContent; // Strapi v5 usa formato JSON para el contenido
  seoTitle?: string;
  seoDescription?: string;
  featuredImageAlt?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featuredImage?: StrapiImageV5 | null;
  categories?: StrapiCategory[];
  tags?: StrapiTag[];
  author?: StrapiAuthor | null;
}

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    headers,
    ...options,
    next: { revalidate: 60 }, // Revalidate every minute
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch from Strapi: ${res.statusText}`);
  }

  return res.json();
}

export async function getArticles(
  page: number = 1,
  pageSize: number = 10
): Promise<StrapiResponse<Article[]>> {
  return fetchAPI<StrapiResponse<Article[]>>(
    `/articles?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc`
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const response = await fetchAPI<StrapiResponse<Article[]>>(
    `/articles?filters[slug][$eq]=${slug}&populate=*`
  );

  return response.data[0] || null;
}

export async function getArticlesByCategory(
  categorySlug: string,
  page: number = 1,
  pageSize: number = 10
): Promise<StrapiResponse<Article[]>> {
  return fetchAPI<StrapiResponse<Article[]>>(
    `/articles?filters[categories][slug][$eq]=${categorySlug}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc`
  );
}

export async function getArticlesByTag(
  tagSlug: string,
  page: number = 1,
  pageSize: number = 10
): Promise<StrapiResponse<Article[]>> {
  return fetchAPI<StrapiResponse<Article[]>>(
    `/articles?filters[tags][slug][$eq]=${tagSlug}&populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc`
  );
}

export async function getCategories(): Promise<StrapiResponse<StrapiCategory[]>> {
  return fetchAPI<StrapiResponse<StrapiCategory[]>>(`/categories?populate=*`);
}

export async function getTags(): Promise<StrapiResponse<StrapiTag[]>> {
  return fetchAPI<StrapiResponse<StrapiTag[]>>(`/tags`);
}

export function getStrapiImageUrl(image: StrapiImageV5 | null | undefined): string {
  if (!image || !image.url) return "/placeholder.svg";
  const url = image.url;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

// Helper para convertir el contenido de Strapi v5 a texto plano
export function convertContentToText(content: StrapiContent): string {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';

  return content
    .map((block: StrapiContentBlock) => {
      if (block.type === 'paragraph' && block.children) {
        return block.children
          .map((child: StrapiContentChild) => child.text || '')
          .join('');
      }
      return '';
    })
    .join('\n\n');
}
