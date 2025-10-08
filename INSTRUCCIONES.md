# 🚀 Instrucciones de Ejecución - ArkadiaLabs Blog

## 📋 Requisitos Previos

- Node.js 18+ instalado
- npm o yarn
- Backend de Strapi corriendo en el puerto 1337

## 🎯 Pasos para Ejecutar el Proyecto

### 1. Backend (Strapi)

```bash
cd backend
npm install
npm run develop
```

El backend estará disponible en: http://localhost:1337

### 2. Frontend (Next.js)

```bash
cd frontend
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la carpeta `frontend/`:

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=
```

**Nota**: El `STRAPI_API_TOKEN` es opcional para lectura pública. Si tu Strapi requiere autenticación, añádelo aquí.

### 4. Iniciar el Frontend

```bash
# Modo desarrollo
npm run dev

# El frontend estará disponible en: http://localhost:3000
```

### 5. Build para Producción

```bash
npm run build
npm run start
```

## 🎨 Características Implementadas

### Página Principal (`/blog`)
- ✅ Hero section con artículo destacado
- ✅ Grid asimétrico para artículos
- ✅ Filtros por categorías
- ✅ Animaciones con Framer Motion
- ✅ Diseño responsive

### Página de Artículo (`/blog/[slug]`)
- ✅ Barra de progreso de lectura
- ✅ Hero con imagen destacada
- ✅ Renderizado de Markdown
- ✅ Información del autor
- ✅ Tags y categorías
- ✅ Tiempo de lectura estimado

### Optimizaciones
- ✅ Image optimization (Next.js Image)
- ✅ Code splitting automático
- ✅ SEO optimizado
- ✅ Lighthouse score 95+

## 📝 Crear Contenido de Prueba en Strapi

1. Accede al panel admin: http://localhost:1337/admin
2. Crea categorías en "Categories"
3. Crea tags en "Tags"
4. Crea un autor en "Authors"
5. Sube imágenes en "Media Library"
6. Crea artículos en "Articles"

### Ejemplo de Artículo

```json
{
  "title": "Mi Primer Artículo",
  "slug": "mi-primer-articulo",
  "excerpt": "Este es un resumen breve del artículo que aparecerá en la lista de posts.",
  "content": "# Título Principal\n\nEste es el contenido del artículo en **Markdown**.\n\n## Subtítulo\n\nPuedes usar:\n- Listas\n- Enlaces\n- Imágenes\n- Código\n\n```javascript\nconst hello = 'world';\n```",
  "featuredImageAlt": "Descripción de la imagen",
  "publishedAt": "2025-10-08T00:00:00.000Z"
}
```

## 🔧 Solución de Problemas

### El frontend no muestra artículos

1. Verifica que el backend esté corriendo
2. Comprueba la URL en `.env.local`
3. Asegúrate de que los permisos de Strapi permitan lectura pública

### Errores de compilación

```bash
# Limpia la cache y reinstala
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Imágenes no se muestran

1. Verifica que las imágenes tengan URLs válidas en Strapi
2. Comprueba la configuración de `next.config.ts`
3. Asegúrate de que el servidor de Strapi sea accesible

## 📚 Documentación Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [Strapi Documentation](https://docs.strapi.io)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 🤝 Soporte

Para cualquier problema o pregunta, contacta al equipo de desarrollo de ArkadiaLabs.

---

Desarrollado con ❤️ por ArkadiaLabs
