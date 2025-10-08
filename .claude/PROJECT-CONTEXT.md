# 🎯 Contexto del Proyecto - ArkadiaLabs Blog

**Última actualización:** 2025-10-08
**Estado:** ✅ 100% Funcional y Operativo

---

## 📋 Resumen Ejecutivo

Este es un **blog futurista y minimalista** construido con:
- **Frontend:** Next.js 15 + TypeScript + Tailwind CSS v4 + Framer Motion
- **Backend:** Strapi v5 (Headless CMS)
- **Diseño:** Extraído del repositorio principal de ArkadiaLabs

---

## 🚀 Estado Actual del Proyecto

### ✅ Completamente Funcional
- Frontend desarrollado al 100%
- Backend de Strapi configurado
- Integración API funcionando
- Todos los errores corregidos
- Build exitoso
- Listo para producción

### 📱 URLs de Acceso
- **Frontend:** http://localhost:3001 (puede variar si el puerto 3000 está ocupado)
- **Strapi Admin:** http://localhost:1337/admin
- **Strapi API:** http://localhost:1337/api

---

## ⚠️ IMPORTANTE: Strapi v5 - Cambios Críticos

### El Mayor Desafío Resuelto

**Problema:** Strapi v5 cambió completamente la estructura de la API comparado con v4.

### Estructura de Datos

#### ❌ Antigua (Strapi v4):
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Artículo",
        "featuredImage": {
          "data": {
            "attributes": {
              "url": "/uploads/image.jpg"
            }
          }
        }
      }
    }
  ]
}
```

#### ✅ Nueva (Strapi v5):
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123",
      "title": "Artículo",
      "featuredImage": {
        "id": 1,
        "url": "/uploads/image.jpg"
      },
      "categories": [
        {
          "id": 1,
          "name": "Tech",
          "slug": "tech"
        }
      ]
    }
  ]
}
```

### Cambios Clave en Strapi v5:
1. **No más `.attributes`** - Las propiedades están directamente en el objeto
2. **No más `.data` en relaciones** - Las relaciones son arrays u objetos directos
3. **`documentId`** - Nuevo identificador único además de `id`
4. **Contenido JSON** - El campo `content` ahora es un array de objetos JSON, no texto plano

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas
```
arkadiaLabs-blog/
├── backend/              # Strapi v5 CMS
│   ├── config/           # Configuración de Strapi
│   ├── src/              # Content Types y API
│   └── .tmp/             # SQLite database
│
├── frontend/             # Next.js 15 App
│   ├── src/
│   │   ├── app/
│   │   │   ├── blog/
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx      # Artículo individual
│   │   │   │   └── page.tsx          # Lista de artículos
│   │   │   ├── layout.tsx            # Layout raíz
│   │   │   ├── page.tsx              # Redirige a /blog
│   │   │   └── globals.css           # Estilos globales
│   │   │
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   └── badge.tsx
│   │   │   ├── ArticleContent.tsx    # Renderizador Markdown
│   │   │   ├── BlogCard.tsx          # Tarjeta de artículo
│   │   │   ├── CategoryFilter.tsx    # Filtro de categorías
│   │   │   └── ReadingProgress.tsx   # Barra de progreso
│   │   │
│   │   └── lib/
│   │       ├── strapi.ts             # ⭐ Cliente API Strapi v5
│   │       └── utils.ts              # Utilidades
│   │
│   ├── public/
│   │   └── placeholder.svg           # Imagen por defecto
│   ├── .env.local                    # Variables de entorno
│   ├── tailwind.config.js            # Configuración Tailwind
│   └── next.config.ts                # Configuración Next.js
│
├── .claude/
│   ├── PROJECT-CONTEXT.md            # Este archivo
│   └── agents/
│       └── blog-ui-designer.md       # Agente especializado
│
├── START-BACKEND.sh                  # Script para iniciar Strapi
├── START-FRONTEND.sh                 # Script para iniciar Next.js
├── CONFIGURAR-STRAPI.md              # ⭐ Guía completa de Strapi
├── INICIO-RAPIDO.md                  # Guía rápida
├── INSTRUCCIONES.md                  # Instrucciones detalladas
└── README.md                         # Documentación principal
```

---

## 🔑 Archivos Clave

### 1. `frontend/src/lib/strapi.ts` ⭐⭐⭐
**El archivo más importante del proyecto.**

Contiene:
- Tipos de TypeScript para Strapi v5
- Cliente API con `fetchAPI()`
- Funciones: `getArticles()`, `getArticleBySlug()`, `getCategories()`, etc.
- `getStrapiImageUrl()` - Maneja imágenes con nueva estructura
- `convertContentToText()` - Convierte contenido JSON a texto

**IMPORTANTE:** Si hay errores de tipos, este es el primer lugar donde mirar.

### 2. `frontend/src/components/BlogCard.tsx`
Componente principal de tarjeta de artículo.

**Acceso directo a propiedades:**
```typescript
// ✅ Correcto (Strapi v5)
article.title
article.featuredImage
article.categories

// ❌ Incorrecto (Strapi v4)
article.attributes.title
article.attributes.featuredImage?.data
article.attributes.categories?.data
```

### 3. `frontend/.env.local`
```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=
```

**Nota:** El token es opcional para lectura pública si configuraste los permisos correctamente.

---

## 🎨 Design System

### Colores (Extraídos de Arkadia-labs)
```css
--site-bg-light: #F1F3F5
--site-text-dark: #0D1B2A
--site-accent-blue: #1C7ED6
--site-accent-purple: #D0BFFF
--site-accent-green: #69DB7C
```

### Tipografía
- **Font:** Noto Sans (400, 600, 700)
- **Importada desde:** Google Fonts
- **Ubicación:** `frontend/src/app/globals.css`

### Animaciones
- **Librería:** Framer Motion
- **Efectos:**
  - Fade in/out en scroll
  - Transiciones de página
  - Hover effects
  - Progress bar animada
  - Staggered animations (entrada escalonada)

---

## 🐛 Errores Comunes y Soluciones

### Error 1: "Cannot read properties of undefined (reading 'featuredImage')"

**Causa:** Intentar acceder a `article.attributes.featuredImage` en Strapi v5

**Solución:**
```typescript
// ❌ Incorrecto
const imageUrl = getStrapiImageUrl(article.attributes.featuredImage?.data);

// ✅ Correcto
const imageUrl = getStrapiImageUrl(article.featuredImage);
```

### Error 2: "Cannot read properties of undefined (reading 'slug')"

**Causa:** Categorías con estructura v4 en vez de v5

**Solución:**
```typescript
// ❌ Incorrecto
article.attributes.categories?.data.map(cat => cat.attributes.slug)

// ✅ Correcto
article.categories?.map(cat => cat.slug)
```

### Error 3: Imágenes no se muestran

**Causas posibles:**
1. No se subió imagen en Strapi
2. Permisos de Upload no configurados
3. URL de Strapi incorrecta en `.env.local`

**Solución:**
1. Subir imagen en Strapi Content Manager
2. Settings → Roles → Public → Upload: `find`, `findOne`
3. Verificar `NEXT_PUBLIC_STRAPI_API_URL`

### Error 4: Frontend muestra página vacía

**Causas:**
1. Backend no está corriendo
2. Permisos públicos no configurados
3. Artículos en estado Draft

**Solución:**
1. Iniciar backend: `cd backend && npm run develop`
2. Settings → Roles → Public → Article: `find`, `findOne`
3. Publicar artículos desde Strapi admin

---

## 🚀 Cómo Iniciar el Proyecto

### Método 1: Scripts Automáticos (Recomendado)
```bash
# Terminal 1
./START-BACKEND.sh

# Terminal 2
./START-FRONTEND.sh
```

### Método 2: Manual
```bash
# Terminal 1 - Backend
cd backend
npm run develop

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Primera Vez (Instalación)
```bash
# Backend
cd backend
npm install
npm run develop

# Frontend
cd frontend
npm install
npm run dev
```

---

## ⚙️ Configuración de Strapi (CRÍTICO)

### Paso 1: Configurar Permisos Públicos

**OBLIGATORIO para que el frontend funcione:**

1. Accede a http://localhost:1337/admin
2. Settings → Users & Permissions Plugin → Roles → **Public**
3. Expande y marca:
   - **Article:** ✅ `find` ✅ `findOne`
   - **Category:** ✅ `find` ✅ `findOne`
   - **Tag:** ✅ `find` ✅ `findOne`
   - **Author:** ✅ `find` ✅ `findOne`
   - **Upload:** ✅ `find` ✅ `findOne`
4. Click "Save"

### Paso 2: Crear Contenido

**Mínimo requerido:**
- 1 artículo publicado
- 1 imagen subida
- Permisos configurados

**Recomendado:**
- 2-3 categorías
- 5-10 tags
- 1-2 autores
- 3-5 artículos con imágenes

---

## 📝 Content Types en Strapi

### Article
```typescript
{
  id: number;
  documentId: string;
  title: string;              // ✅ Obligatorio
  slug: string;               // ✅ Obligatorio
  excerpt: string;            // ✅ Obligatorio
  content: any;               // ✅ Obligatorio (JSON array)
  featuredImage: Image;       // Recomendado
  featuredImageAlt: string;
  categories: Category[];
  tags: Tag[];
  author: Author;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
}
```

### Category
```typescript
{
  id: number;
  documentId: string;
  name: string;               // ✅ Obligatorio
  slug: string;               // ✅ Obligatorio
  description: string;
}
```

---

## 🎯 Funcionalidades Implementadas

### Página Principal (`/blog`)
- ✅ Hero section con gradiente
- ✅ Artículo destacado (featured) en formato grande
- ✅ Grid asimétrico para otros artículos
- ✅ Filtros por categorías
- ✅ Animaciones de entrada escalonadas
- ✅ Loading states elegantes

### Página de Artículo (`/blog/[slug]`)
- ✅ Barra de progreso de lectura
- ✅ Hero con imagen y parallax effect
- ✅ Renderizado de Markdown/HTML
- ✅ Meta información (autor, fecha, lectura)
- ✅ Tags y categorías
- ✅ Botón "Volver" animado
- ✅ Fade out del header al hacer scroll

### Componentes
- ✅ BlogCard con hover effects
- ✅ CategoryFilter interactivo
- ✅ ReadingProgress con Framer Motion
- ✅ ArticleContent con estilos de prosa
- ✅ Badge component

---

## 🔧 Comandos Útiles

### Desarrollo
```bash
npm run dev          # Iniciar dev server
npm run build        # Build para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Linter
```

### Strapi
```bash
npm run develop      # Dev mode con admin UI
npm run start        # Producción
npm run build        # Build admin panel
```

---

## 📊 Tecnologías y Versiones

### Frontend
- Next.js: 15.5.4
- React: 18+
- TypeScript: 5+
- Tailwind CSS: 4.0 (latest)
- Framer Motion: latest
- React Markdown: latest

### Backend
- Strapi: 5.26.0
- Node.js: 20.19.2
- SQLite: Incluido con Strapi
- Database: `.tmp/data.db`

---

## 🎨 Características de Diseño

### Estética
- Minimalismo moderno
- Gradientes sutiles (azul → púrpura)
- Espaciado generoso
- Tipografía clara y legible

### Animaciones
- Duración: 0.3-0.7s
- Easing: cubic-bezier
- Trigger: scroll, hover, page transitions
- Performance: GPU accelerated

### Responsive
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Max width: 7xl (1280px)

---

## 🚨 Problemas Conocidos y Soluciones

### Warning: "Next.js inferred your workspace root..."
**Causa:** Múltiples package-lock.json en el proyecto

**Solución:** Ignorar el warning o configurar `outputFileTracingRoot` en `next.config.ts`

**Impacto:** Ninguno, es solo un warning

### Puerto 3000 ocupado
**Causa:** Otro proceso usando el puerto

**Solución:** Next.js automáticamente usa el puerto 3001

**URL alternativa:** http://localhost:3001

---

## 📚 Documentación Adicional

### Archivos de Referencia
1. **[CONFIGURAR-STRAPI.md](../CONFIGURAR-STRAPI.md)** - ⭐ Guía paso a paso de Strapi
2. **[INICIO-RAPIDO.md](../INICIO-RAPIDO.md)** - Inicio rápido
3. **[INSTRUCCIONES.md](../INSTRUCCIONES.md)** - Instrucciones detalladas
4. **[frontend/README.md](../frontend/README.md)** - Docs técnicas del frontend

### Enlaces Externos
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Strapi v5 Docs](https://docs.strapi.io)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## 🔐 Credenciales y Accesos

### Strapi Admin
- **URL:** http://localhost:1337/admin
- **Credenciales:** Creadas durante la primera instalación
- **Nota:** No comprometidas en git

### Variables de Entorno
- **Ubicación:** `frontend/.env.local`
- **Git:** Ignorado (no se versiona)
- **Compartir:** Usar `.env.local.example`

---

## 🎯 Próximos Pasos / Roadmap

### Posibles Mejoras
- [ ] Búsqueda de artículos
- [ ] Paginación infinita
- [ ] Modo oscuro
- [ ] Comentarios (Disqus / Giscus)
- [ ] Compartir en redes sociales
- [ ] Artículos relacionados
- [ ] Newsletter subscription
- [ ] PWA support
- [ ] i18n (internacionalización)

### Deploy
- [ ] Configurar para Vercel
- [ ] Configurar Strapi en producción
- [ ] Variables de entorno de producción
- [ ] CDN para imágenes

---

## 🤝 Contribución

### Branching Strategy
- `main` - Producción
- `feature/blog-frontend` - Desarrollo actual
- `feature/*` - Nuevas funcionalidades

### Commits
- Formato: Conventional Commits
- Prefijos: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
- Co-authored: Claude Code

---

## 📞 Soporte

### Para Nuevas Conversaciones con Claude
1. Lee este archivo primero
2. Revisa [CONFIGURAR-STRAPI.md](../CONFIGURAR-STRAPI.md)
3. Verifica que el backend esté corriendo
4. Consulta los errores comunes arriba

### Debugging
1. Verificar logs del servidor: `npm run dev`
2. Verificar consola del navegador: F12
3. Verificar respuesta de API: http://localhost:1337/api/articles?populate=*
4. Verificar tipos en `frontend/src/lib/strapi.ts`

---

## ✅ Checklist de Verificación

Antes de considerar el proyecto funcional:

- [x] Backend de Strapi corriendo
- [x] Frontend de Next.js corriendo
- [x] Permisos públicos configurados
- [x] Al menos 1 artículo publicado
- [x] Imagen subida en el artículo
- [x] Frontend muestra el artículo
- [x] Animaciones funcionando
- [x] Responsive en móvil
- [x] Build exitoso (`npm run build`)
- [x] Sin errores en consola

---

## 🏆 Estado del Proyecto

**Última verificación:** 2025-10-08 00:21

- ✅ Frontend: **FUNCIONAL**
- ✅ Backend: **FUNCIONAL**
- ✅ Integración: **FUNCIONAL**
- ✅ Build: **EXITOSO**
- ✅ Errores: **NINGUNO**
- ✅ Documentación: **COMPLETA**

---

**Desarrollado con ❤️ por ArkadiaLabs**
**Generado con Claude Code**

---

*Este documento se actualiza automáticamente con cada cambio significativo en el proyecto.*
