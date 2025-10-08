# 🚂 Guía de Deployment: Strapi en Railway

## Paso 1: Preparar tu Cuenta de Railway

1. Ve a [Railway.app](https://railway.app)
2. Click en **"Login"** y conecta con tu cuenta de GitHub
3. Acepta los permisos de Railway para acceder a tus repositorios

## Paso 2: Crear Nuevo Proyecto

1. En el dashboard de Railway, click en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Busca y selecciona: **`arkadialabs-blog`**
4. Railway detectará tu repositorio

## Paso 3: Configurar el Servicio de Strapi

1. Railway preguntará qué quieres deployar
2. Click en **"Add a service"** o **"New Service"**
3. Selecciona **"GitHub Repo"**
4. En "Root Directory", escribe: **`backend`**
   - Esto le dice a Railway que Strapi está en la carpeta `backend`
5. Click en **"Deploy"**

## Paso 4: Añadir Base de Datos PostgreSQL

1. En tu proyecto de Railway, click en **"+ New"**
2. Selecciona **"Database"**
3. Click en **"Add PostgreSQL"**
4. Railway creará automáticamente:
   - Una base de datos PostgreSQL
   - La variable `DATABASE_URL` conectada a tu servicio de Strapi

## Paso 5: Configurar Variables de Entorno

1. Click en tu servicio de **Strapi** (no en la base de datos)
2. Ve a la pestaña **"Variables"**
3. Añade estas variables de entorno:

```bash
# Database
DATABASE_CLIENT=postgres
DATABASE_SSL=true

# Strapi
APP_KEYS=toBeModified,toBeModified,toBeModified,toBeModified
API_TOKEN_SALT=toBeModified
ADMIN_JWT_SECRET=toBeModified
TRANSFER_TOKEN_SALT=toBeModified
JWT_SECRET=toBeModified

# Host
HOST=0.0.0.0
PORT=3000

# Node
NODE_ENV=production
```

### ⚠️ IMPORTANTE: Generar Secrets Seguros

Los valores `toBeModified` son **temporales**. Debes reemplazarlos con valores aleatorios seguros:

**Opción A: Generar en tu terminal (Recomendado)**
```bash
# Ejecuta esto 5 veces para generar 5 secrets diferentes
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

**Opción B: Usar generador online**
- Ve a [RandomKeygen.com](https://randomkeygen.com/)
- Usa las claves de "Fort Knox Passwords" para cada variable

Copia cada secret generado y reemplaza los `toBeModified` en Railway.

## Paso 6: Configurar CORS (Permitir Frontend)

1. En las variables de Railway, añade también:

```bash
# Frontend URL
STRAPI_ADMIN_BACKEND_URL=https://tu-dominio-strapi.railway.app
```

(Reemplaza `tu-dominio-strapi` con la URL que Railway te dará)

## Paso 7: Verificar el Build

1. Railway comenzará a buildear automáticamente
2. Ve a la pestaña **"Deployments"**
3. Click en el deployment activo para ver los logs
4. Espera a que veas: `✓ Strapi started successfully`

**Tiempo estimado:** 2-5 minutos

## Paso 8: Obtener tu URL de Railway

1. En tu servicio de Strapi, ve a **"Settings"**
2. Click en **"Networking"** o **"Domains"**
3. Railway genera automáticamente una URL tipo:
   ```
   https://arkadialabs-blog-backend-production.up.railway.app
   ```
4. **Copia esta URL** - la necesitarás para el siguiente paso

## Paso 9: Acceder al Admin de Strapi

1. Abre tu navegador y ve a:
   ```
   https://tu-url-railway.up.railway.app/admin
   ```
2. Crea tu cuenta de admin (primera vez)
   - Email: tu@email.com
   - Password: (elige uno seguro)
3. ¡Listo! Ya tienes acceso al panel de Strapi

## Paso 10: Migrar Contenido (Artículos y Categorías)

Ahora necesitas pasar tu contenido de desarrollo a producción:

### Opción A: Migrar manualmente (Rápido para poco contenido)

1. En tu Strapi **local** (localhost:1337/admin):
   - Abre cada artículo
   - Copia el contenido
2. En tu Strapi de **Railway** (tu-url.railway.app/admin):
   - Recrea las categorías
   - Recrea los artículos
   - Publica todo

### Opción B: Usar Strapi Transfer (Recomendado para mucho contenido)

```bash
cd backend
npm run strapi transfer -- --to https://tu-url-railway.up.railway.app
```

## Paso 11: Configurar Variables en Vercel

1. Ve a [Vercel Dashboard](https://vercel.com)
2. Selecciona tu proyecto **arkadialabs-blog**
3. Ve a **Settings → Environment Variables**
4. Añade:

```bash
NEXT_PUBLIC_STRAPI_API_URL=https://tu-url-railway.up.railway.app
```

5. Click en **"Save"**
6. Ve a **Deployments** y click **"Redeploy"** en el último deployment

## Paso 12: Configurar Permisos Públicos en Strapi

Para que el frontend pueda leer los artículos sin autenticación:

1. En Strapi Admin (Railway) → **Settings**
2. **Users & Permissions plugin** → **Roles**
3. Click en **"Public"**
4. En **Article**, marca:
   - ✅ `find`
   - ✅ `findOne`
5. En **Category**, marca:
   - ✅ `find`
   - ✅ `findOne`
6. Click **"Save"**

## ✅ Verificación Final

1. Abre tu blog en Vercel: `https://tu-blog.vercel.app/blog`
2. Deberías ver tus artículos cargando
3. Si no aparecen, revisa:
   - La URL en Vercel esté correcta
   - Los permisos públicos en Strapi
   - Los logs de Railway para errores

## 🎉 ¡Listo!

Tu stack está ahora completamente en producción:
- ✅ Frontend: Vercel
- ✅ Backend (Strapi): Railway
- ✅ Base de Datos: PostgreSQL en Railway

## 💰 Costos

- **Railway:** $5 de crédito gratis/mes
- **Vercel:** Gratis (Hobby plan)
- **Total:** $0/mes inicialmente (después ~$1-2/mes en Railway)

## 🔧 Troubleshooting

### Error: "Cannot connect to database"
- Verifica que `DATABASE_URL` esté en las variables de Railway
- Railway la añade automáticamente al crear PostgreSQL

### Error: "CORS policy"
- Añade tu dominio de Vercel a las variables de CORS
- En Railway → Variables → añade `STRAPI_ADMIN_BACKEND_URL`

### Error: "No articles found"
- Verifica permisos públicos en Strapi
- Verifica que `NEXT_PUBLIC_STRAPI_API_URL` esté en Vercel
- Asegúrate de haber publicado los artículos en Strapi

### Railway se queda "Building..."
- Revisa los logs en Railway → Deployments
- Verifica que `backend/` contenga `package.json`
- Asegúrate de que el Root Directory esté configurado a `backend`

## 🚀 Próximos Pasos

1. Configura un dominio personalizado en Railway (opcional)
2. Configura un dominio personalizado en Vercel (opcional)
3. Añade más contenido a tu blog
4. Configura backups automáticos de PostgreSQL

---

**¿Necesitas ayuda?** Revisa los logs en Railway o los errores en la consola del navegador.
