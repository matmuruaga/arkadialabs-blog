# Strapi Blog API Documentation

## Base URL
- **Local Development**: `http://localhost:1337/api`
- **Production**: `https://your-domain.com/api`

## Authentication
Para crear, actualizar o eliminar contenido, necesitas usar el **API Token** en los headers:

```bash
Authorization: Bearer YOUR_API_TOKEN
```

## Endpoints Principales

### 📄 Articles

#### Listar todos los artículos
```http
GET /api/articles?populate=*
```

**Parámetros de Query:**
- `populate=*` - Incluye todas las relaciones
- `filters[slug][$eq]=mi-articulo` - Filtrar por slug
- `filters[categories][slug][$eq]=tecnologia` - Filtrar por categoría
- `pagination[page]=1&pagination[pageSize]=10` - Paginación
- `sort=createdAt:desc` - Ordenar por fecha descendente

**Respuesta:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Mi Primer Artículo",
        "slug": "mi-primer-articulo",
        "excerpt": "Resumen del artículo...",
        "content": "Contenido completo...",
        "seoTitle": "Mi Primer Artículo - Blog",
        "seoDescription": "Descripción SEO...",
        "featuredImageAlt": "Descripción de imagen",
        "createdAt": "2025-10-07T...",
        "updatedAt": "2025-10-07T...",
        "publishedAt": "2025-10-07T...",
        "featuredImage": {
          "data": {
            "id": 1,
            "attributes": {
              "url": "/uploads/imagen.jpg",
              "formats": {...}
            }
          }
        },
        "categories": {...},
        "tags": {...},
        "author": {...},
        "openGraph": {...}
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 5,
      "total": 50
    }
  }
}
```

#### Obtener un artículo por ID
```http
GET /api/articles/:id?populate=*
```

#### Obtener un artículo por slug
```http
GET /api/articles?filters[slug][$eq]=mi-articulo&populate=*
```

#### Crear un artículo (requiere autenticación)
```http
POST /api/articles
Content-Type: application/json
Authorization: Bearer YOUR_API_TOKEN

{
  "data": {
    "title": "Nuevo Artículo",
    "slug": "nuevo-articulo",
    "excerpt": "Resumen breve del artículo",
    "content": "Contenido completo del artículo en markdown o HTML",
    "seoTitle": "Nuevo Artículo - Blog ArkadiaLabs",
    "seoDescription": "Descripción optimizada para SEO de 150-160 caracteres",
    "seoKeywords": "keyword1, keyword2, keyword3",
    "featuredImageAlt": "Descripción de la imagen destacada",
    "publishedAt": "2025-10-07T10:00:00.000Z",
    "openGraph": {
      "ogTitle": "Nuevo Artículo",
      "ogDescription": "Descripción para compartir en redes sociales",
      "ogType": "article",
      "ogUrl": "https://arkadialabs.io/blog/nuevo-articulo"
    }
  }
}
```

#### Actualizar un artículo
```http
PUT /api/articles/:id
Content-Type: application/json
Authorization: Bearer YOUR_API_TOKEN

{
  "data": {
    "title": "Título Actualizado"
  }
}
```

#### Eliminar un artículo
```http
DELETE /api/articles/:id
Authorization: Bearer YOUR_API_TOKEN
```

### 📁 Categories

#### Listar categorías
```http
GET /api/categories?populate=*
```

#### Crear categoría
```http
POST /api/categories
Content-Type: application/json
Authorization: Bearer YOUR_API_TOKEN

{
  "data": {
    "name": "Tecnología",
    "slug": "tecnologia",
    "description": "Artículos sobre tecnología",
    "seoTitle": "Tecnología - Blog",
    "seoDescription": "Todos los artículos sobre tecnología"
  }
}
```

### 🏷️ Tags

#### Listar tags
```http
GET /api/tags
```

#### Crear tag
```http
POST /api/tags
Content-Type: application/json
Authorization: Bearer YOUR_API_TOKEN

{
  "data": {
    "name": "JavaScript",
    "slug": "javascript",
    "color": "#F7DF1E"
  }
}
```

### 👤 Authors

#### Listar autores
```http
GET /api/authors?populate=*
```

#### Crear autor
```http
POST /api/authors
Content-Type: application/json
Authorization: Bearer YOUR_API_TOKEN

{
  "data": {
    "name": "Juan Pérez",
    "slug": "juan-perez",
    "email": "juan@example.com",
    "bio": "Desarrollador full-stack con 5 años de experiencia",
    "website": "https://juanperez.com",
    "twitter": "@juanperez",
    "linkedin": "https://linkedin.com/in/juanperez"
  }
}
```

### 📤 Upload de Imágenes

#### Subir imagen
```http
POST /api/upload
Content-Type: multipart/form-data
Authorization: Bearer YOUR_API_TOKEN

files: [archivo de imagen]
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "imagen.jpg",
    "url": "/uploads/imagen_abc123.jpg",
    "formats": {
      "thumbnail": {...},
      "small": {...},
      "medium": {...},
      "large": {...}
    }
  }
]
```

#### Vincular imagen a un artículo
```http
PUT /api/articles/:id
Content-Type: application/json
Authorization: Bearer YOUR_API_TOKEN

{
  "data": {
    "featuredImage": 1  // ID de la imagen subida
  }
}
```

### 🗺️ SEO Endpoints

#### Sitemap XML
```http
GET /sitemap.xml
```

#### Robots.txt
```http
GET /robots.txt
```

## Ejemplos de Integración con n8n

### Workflow 1: Crear Artículo desde Google Docs

**Nodes:**
1. **Google Docs Trigger** - Detecta nuevo documento
2. **HTTP Request** - Crea el artículo en Strapi

**Configuración HTTP Request Node:**
```
Method: POST
URL: http://localhost:1337/api/articles
Authentication: Generic Credential Type
  Header Auth
  Name: Authorization
  Value: Bearer YOUR_API_TOKEN

Body:
{
  "data": {
    "title": "{{ $json.title }}",
    "slug": "{{ $json.title.toLowerCase().replace(/ /g, '-') }}",
    "content": "{{ $json.body }}",
    "excerpt": "{{ $json.body.substring(0, 150) }}...",
    "seoTitle": "{{ $json.title }} - Blog ArkadiaLabs",
    "seoDescription": "{{ $json.body.substring(0, 160) }}",
    "publishedAt": "{{ $now }}"
  }
}
```

### Workflow 2: Publicar Artículo y Compartir en Redes

**Nodes:**
1. **Webhook** - Recibe notificación de nuevo artículo
2. **HTTP Request** - Obtiene datos del artículo
3. **Twitter Node** - Publica en Twitter
4. **LinkedIn Node** - Publica en LinkedIn

### Workflow 3: Importar Artículos desde CSV

**Nodes:**
1. **Read Binary File** - Lee CSV
2. **Spreadsheet File** - Parsea CSV
3. **Loop Over Items**
4. **HTTP Request** - Crea cada artículo

## Campos Obligatorios por Content Type

### Article
- `title` ✅
- `slug` ✅
- `excerpt` ✅
- `content` ✅
- `featuredImage` ✅
- `featuredImageAlt` ✅

### Category
- `name` ✅
- `slug` ✅

### Tag
- `name` ✅
- `slug` ✅

### Author
- `name` ✅
- `slug` ✅
- `email` ✅

## Best Practices para SEO

1. **SEO Title**: Máximo 60 caracteres
2. **SEO Description**: 150-160 caracteres
3. **Slug**: Usar minúsculas, guiones, sin caracteres especiales
4. **Featured Image**: Optimizada, formato WebP preferible
5. **Alt Text**: Descriptivo y relevante
6. **Content**: Mínimo 300 palabras para buen SEO
7. **Internal Links**: Vincular a otros artículos relacionados
8. **Categories**: Máximo 2-3 categorías por artículo
9. **Tags**: 5-8 tags relevantes
10. **Open Graph**: Siempre completar para redes sociales

## Estructura JSON Completa de un Artículo

```json
{
  "data": {
    "title": "Cómo Construir una API REST con Node.js",
    "slug": "como-construir-api-rest-nodejs",
    "excerpt": "Aprende paso a paso cómo crear una API REST profesional usando Node.js, Express y las mejores prácticas de la industria.",
    "content": "<p>Contenido completo del artículo...</p>",
    "seoTitle": "Cómo Construir una API REST con Node.js | Tutorial Completo",
    "seoDescription": "Guía completa para crear APIs REST con Node.js. Aprende Express, middlewares, autenticación JWT y deploy en producción.",
    "seoKeywords": "nodejs, api rest, express, javascript, backend",
    "canonicalUrl": "https://arkadialabs.io/blog/como-construir-api-rest-nodejs",
    "featuredImageAlt": "Diagrama de arquitectura de una API REST con Node.js",
    "publishedAt": "2025-10-07T10:00:00.000Z",
    "featuredImage": 1,
    "gallery": [2, 3, 4],
    "categories": [1, 2],
    "tags": [1, 3, 5, 7],
    "author": 1,
    "openGraph": {
      "ogTitle": "Cómo Construir una API REST con Node.js",
      "ogDescription": "Tutorial completo con ejemplos prácticos",
      "ogType": "article",
      "ogUrl": "https://arkadialabs.io/blog/como-construir-api-rest-nodejs",
      "ogImage": 1
    }
  }
}
```

## Testing Endpoints

Puedes probar los endpoints usando:

### cURL
```bash
# Listar artículos
curl http://localhost:1337/api/articles?populate=*

# Crear artículo
curl -X POST http://localhost:1337/api/articles \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data":{"title":"Test","slug":"test","excerpt":"test","content":"test"}}'
```

### Postman / Insomnia
Importa esta colección o crea requests manualmente con los ejemplos anteriores.

### JavaScript (Fetch)
```javascript
// Obtener artículos
const response = await fetch('http://localhost:1337/api/articles?populate=*');
const { data } = await response.json();

// Crear artículo
const response = await fetch('http://localhost:1337/api/articles', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    data: {
      title: 'Nuevo Artículo',
      slug: 'nuevo-articulo',
      excerpt: 'Resumen...',
      content: 'Contenido completo...',
    }
  })
});
```

## Errores Comunes

### 401 Unauthorized
- Verifica que el token sea correcto
- Asegúrate de incluir "Bearer " antes del token

### 403 Forbidden
- El rol no tiene permisos para esa acción
- Configura permisos en Settings > Roles

### 400 Bad Request
- Campos obligatorios faltantes
- Formato JSON inválido
- Slug duplicado

### 404 Not Found
- El recurso no existe
- Verifica el ID o slug

## Soporte

Para más información consulta:
- [Documentación oficial de Strapi](https://docs.strapi.io)
- [API Reference](https://docs.strapi.io/dev-docs/api/rest)
