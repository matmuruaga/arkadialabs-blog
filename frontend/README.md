# Arkadia Labs Blog

Blog moderno y minimalista construido con Next.js 15 y Strapi CMS.

## 🚀 Características

- **Next.js 15** con App Router y Server Components
- **Strapi v5** como headless CMS
- **Tailwind CSS v4** para estilos
- **Framer Motion** para animaciones fluidas
- **TypeScript** para type safety
- **Markdown** rendering con syntax highlighting
- **Responsive Design** optimizado para todos los dispositivos

## 🛠️ Tecnologías

- Next.js 15.1.6
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- React Markdown
- Prism.js (syntax highlighting)

## 📦 Instalación

\`\`\`bash
npm install
\`\`\`

## 🔧 Configuración

Crea un archivo \`.env.local\` con:

\`\`\`env
NEXT_PUBLIC_STRAPI_API_URL=tu_url_de_strapi
\`\`\`

## 🚀 Desarrollo

\`\`\`bash
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📝 Estructura del Proyecto

\`\`\`
src/
├── app/
│   ├── blog/              # Páginas del blog
│   │   ├── page.tsx       # Lista de artículos
│   │   └── [slug]/        # Artículo individual
│   ├── globals.css        # Estilos globales
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizables
│   ├── ArticleContent.tsx # Renderizado de contenido Markdown
│   ├── BlogCard.tsx       # Card de artículo
│   ├── CategoryFilter.tsx # Filtro de categorías
│   ├── ReadingProgress.tsx # Barra de progreso
│   └── TableOfContents.tsx # Índice del artículo
└── lib/
    └── strapi.ts          # Cliente API de Strapi
\`\`\`

## 🌐 Deployment

Este proyecto está optimizado para deployment en Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/matmuruaga/arkadialabs-blog)

## 📄 Licencia

MIT

## 👨‍💻 Autor

Arkadia Labs
