# 🚀 Inicio Rápido - ArkadiaLabs Blog

## ⚡ Opción 1: Scripts Automáticos (Recomendado)

### Terminal 1 - Backend:
```bash
./START-BACKEND.sh
```

### Terminal 2 - Frontend:
```bash
./START-FRONTEND.sh
```

---

## 🔧 Opción 2: Comandos Manuales

### Terminal 1 - Iniciar Backend (Strapi):
```bash
cd backend
npm install          # Solo la primera vez
npm run develop
```

### Terminal 2 - Iniciar Frontend (Next.js):
```bash
cd frontend
npm install          # Solo la primera vez
npm run dev
```

---

## 📱 URLs Importantes

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Blog Frontend** | http://localhost:3000 | Página principal (redirige a /blog) |
| **Lista de Artículos** | http://localhost:3000/blog | Página con todos los artículos |
| **Strapi Admin** | http://localhost:1337/admin | Panel de administración |
| **Strapi API** | http://localhost:1337/api | API REST |

---

## 📝 Primeros Pasos Después de Iniciar

### 1. Crear Contenido en Strapi

1. **Accede al admin:** http://localhost:1337/admin
2. **Ve a:** Content Manager > Article > Create new entry
3. **Rellena los campos:**
   - **Title:** Mi Primer Artículo
   - **Slug:** mi-primer-articulo
   - **Excerpt:** Un resumen breve del artículo
   - **Content:**
   ```markdown
   # Bienvenido a mi blog

   Este es mi **primer artículo** usando Markdown.

   ## Características
   - Soporte completo de Markdown
   - Sintaxis de código
   - Imágenes
   - Enlaces

   ```javascript
   const hello = 'world';
   console.log(hello);
   ```
   ```
   - **Featured Image:** Sube una imagen
   - **Featured Image Alt:** Descripción de la imagen

4. **Guarda y Publica:** Click en "Save" y luego "Publish"

### 2. Configurar Permisos Públicos

1. **Ve a:** Settings > Users & Permissions Plugin > Roles > Public
2. **En Permissions, expande y marca:**
   - ✅ Article: `find`, `findOne`
   - ✅ Category: `find`, `findOne`
   - ✅ Tag: `find`, `findOne`
   - ✅ Author: `find`, `findOne`
3. **Guarda los cambios**

### 3. Ver el Blog

1. **Abre:** http://localhost:3000
2. **Deberías ver** tu artículo en la página del blog

---

## 🎨 Opcional: Crear Categorías y Tags

### Crear Categorías:
1. Content Manager > Category > Create new entry
2. Ejemplos:
   - Tecnología
   - Desarrollo
   - Diseño

### Crear Tags:
1. Content Manager > Tag > Create new entry
2. Ejemplos:
   - JavaScript
   - React
   - Next.js

---

## ❌ Solución de Problemas

### El frontend muestra una página vacía:
1. ✅ Verifica que el backend esté corriendo
2. ✅ Asegúrate de haber creado al menos un artículo
3. ✅ Verifica que el artículo esté publicado (no en borrador)
4. ✅ Comprueba los permisos públicos en Strapi

### Error de conexión al backend:
1. ✅ Verifica que el backend esté en http://localhost:1337
2. ✅ Comprueba el archivo `frontend/.env.local`:
   ```
   NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
   ```

### Las imágenes no se muestran:
1. ✅ Verifica que subiste imágenes en Strapi
2. ✅ Asegúrate de que las imágenes estén asociadas al artículo

---

## 🛑 Detener los Servidores

Presiona **Ctrl+C** en cada terminal para detener los servidores.

---

## 📚 Más Información

- [INSTRUCCIONES.md](INSTRUCCIONES.md) - Guía detallada
- [frontend/README.md](frontend/README.md) - Documentación del frontend
- [API-DOCUMENTATION.md](API-DOCUMENTATION.md) - Documentación de la API

---

**¡Disfruta de tu nuevo blog!** 🎉
