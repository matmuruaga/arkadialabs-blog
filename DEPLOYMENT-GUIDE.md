# Guía de Deployment - ArkadiaLabs Blog

## ⚠️ IMPORTANTE: Configuración de Producción

### Problema Actual
El blog actualmente apunta a `http://localhost:1337` para Strapi, lo que **NO funcionará en producción**.

### Solución para Producción

#### 1. Deployar Strapi Backend

Tienes varias opciones para deployar Strapi:

**Opción A: Railway (Recomendado - Fácil y Gratis)**
1. Crea cuenta en [Railway.app](https://railway.app)
2. Click en "New Project" → "Deploy from GitHub"
3. Selecciona tu repositorio y la carpeta `backend`
4. Railway detectará automáticamente Strapi
5. Añade las variables de entorno necesarias
6. Railway te dará una URL tipo: `https://your-app.railway.app`

**Opción B: Render.com**
1. Crea cuenta en [Render.com](https://render.com)
2. New → Web Service
3. Conecta tu repo y selecciona la carpeta `backend`
4. Configura:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`
5. Añade variables de entorno

**Opción C: DigitalOcean App Platform**
1. Crea una app en DigitalOcean
2. Conecta tu repositorio
3. Configura el directorio `backend`

**Opción D: Tu servidor con Elestio (como el de N8N)**
Ya tienes experiencia con Elestio. Podrías deployar Strapi allí también.

#### 2. Configurar Variables de Entorno en Vercel

Una vez que tengas Strapi deployado:

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com)
2. Settings → Environment Variables
3. Añade estas variables:

```
NEXT_PUBLIC_STRAPI_API_URL=https://tu-strapi-en-produccion.com
NEXT_PUBLIC_STRAPI_API_TOKEN=tu_token_de_strapi
```

**Para obtener el token de Strapi:**
1. Accede a tu Strapi Admin en producción
2. Settings → API Tokens → Create new API Token
3. Name: "Frontend Production"
4. Token type: "Read-only" (si solo necesitas leer)
5. Copia el token generado

#### 3. Hacer Público el Contenido de Strapi (Alternativa)

Si no quieres usar tokens, puedes hacer público el contenido:

1. En Strapi Admin → Settings → Users & Permissions plugin → Roles
2. Click en "Public"
3. Marca los permisos para `Article` y `Category`:
   - ✅ find
   - ✅ findOne
4. Save

Con esto, no necesitarás `NEXT_PUBLIC_STRAPI_API_TOKEN` (déjalo vacío).

### Configuración Actual

**Desarrollo (Local):**
```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=
```

**Producción (Vercel):**
```env
NEXT_PUBLIC_STRAPI_API_URL=https://tu-strapi-produccion.com
NEXT_PUBLIC_STRAPI_API_TOKEN=tu_token_aqui_si_usas
```

## Checklist de Deployment

- [ ] Deployar Strapi en un servicio cloud
- [ ] Configurar base de datos para Strapi (PostgreSQL recomendado para producción)
- [ ] Crear API Token en Strapi (o hacer público el contenido)
- [ ] Añadir variables de entorno en Vercel
- [ ] Redeploy en Vercel para aplicar cambios
- [ ] Verificar que el blog cargue artículos en producción

## Base de Datos

**Desarrollo:** SQLite (archivo local `.tmp/data.db`)
**Producción:** Debes cambiar a PostgreSQL o MySQL

En Railway/Render, puedes añadir una base de datos PostgreSQL con un click.

Configuración en `backend/config/database.js` para producción:
```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: { rejectUnauthorized: false }
    }
  }
});
```

## Problemas Comunes

### 1. "No se encontraron artículos"
- ✅ Verifica que `NEXT_PUBLIC_STRAPI_API_URL` esté configurada en Vercel
- ✅ Verifica que Strapi esté corriendo en producción
- ✅ Verifica permisos públicos o token de API

### 2. Error CORS
- Configura CORS en Strapi (`config/middlewares.js`):
```javascript
module.exports = [
  // ...
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://tu-dominio-vercel.vercel.app'],
      credentials: true,
    },
  },
];
```

### 3. Imágenes no cargan
- Configura storage provider en Strapi (Cloudinary, AWS S3, etc.)
- O configura CORS en tu servidor de Strapi para servir imágenes

## Recomendación Final

**Para lanzar rápido a producción:**
1. Usa Railway para Strapi (gratis y fácil)
2. Haz público el contenido (no necesitas tokens)
3. Configura la variable `NEXT_PUBLIC_STRAPI_API_URL` en Vercel
4. ¡Listo!

**Tiempo estimado:** 15-30 minutos
