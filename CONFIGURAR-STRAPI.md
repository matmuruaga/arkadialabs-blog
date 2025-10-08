# 🔧 Guía Completa: Configurar Strapi para el Blog

## ✅ Errores Solucionados

Todos los errores de "Cannot read properties of undefined" han sido corregidos. El blog ahora maneja correctamente:
- ✅ Artículos sin imagen (muestra placeholder)
- ✅ Categorías vacías
- ✅ Tags faltantes
- ✅ Datos incompletos

---

## 📋 Paso 1: Configurar Permisos Públicos

**MUY IMPORTANTE**: Sin esto, el frontend no podrá leer los artículos.

1. **Accede a Strapi Admin:**
   ```
   http://localhost:1337/admin
   ```

2. **Ve a Settings:**
   - Click en "Settings" (icono de engranaje en la barra lateral)

3. **Configura Permisos:**
   - Settings → Users & Permissions Plugin → Roles → **Public**

4. **Habilita los siguientes permisos:**

   En la sección "Permissions", expande cada colección y marca:

   **Article:**
   - ✅ `find`
   - ✅ `findOne`

   **Category:**
   - ✅ `find`
   - ✅ `findOne`

   **Tag:**
   - ✅ `find`
   - ✅ `findOne`

   **Author:**
   - ✅ `find`
   - ✅ `findOne`

   **Upload (para imágenes):**
   - ✅ `find`
   - ✅ `findOne`

5. **Guarda los cambios:**
   - Click en el botón "Save" (arriba a la derecha)

---

## 📝 Paso 2: Crear tu Primer Artículo

### Opción A: Crear desde el Panel Admin (Recomendado)

1. **Ve a Content Manager:**
   - Click en "Content Manager" en la barra lateral

2. **Crear Categoría (Opcional pero recomendado):**
   - Content Manager → Category → "Create new entry"
   - **name:** Tecnología
   - **slug:** tecnologia
   - **description:** Artículos sobre tecnología
   - Click "Save" y "Publish"

3. **Crear Artículo:**
   - Content Manager → Article → "Create new entry"

   Rellena los campos:

   **Campos Obligatorios:**
   - **title:** `Mi Primer Artículo del Blog`
   - **slug:** `mi-primer-articulo` (se auto-genera del título)
   - **excerpt:** `Este es un resumen breve de mi primer artículo en el blog de ArkadiaLabs.`
   - **content:** (En Markdown)
     ```markdown
     # Bienvenido a Mi Blog

     Este es mi **primer artículo** usando el blog de ArkadiaLabs.

     ## Características Principales

     - ✅ Soporte completo de Markdown
     - ✅ Sintaxis de código con resaltado
     - ✅ Imágenes y multimedia
     - ✅ Enlaces y más

     ## Ejemplo de Código

     ```javascript
     const blog = {
       platform: 'Next.js',
       cms: 'Strapi',
       awesome: true
     };

     console.log('¡El blog funciona!');
     ```

     ## Conclusión

     Este es solo el comienzo de muchos artículos interesantes.
     ```

   **Imagen (Muy Recomendado):**
   - **Featured Image:** Click en "Browse" y sube una imagen
     - Formatos recomendados: JPG, PNG, WebP
     - Tamaño recomendado: 1200x800px mínimo
   - **Featured Image Alt:** `Imagen del primer artículo del blog`

   **Metadatos SEO (Opcional):**
   - **seoTitle:** `Mi Primer Artículo - Blog ArkadiaLabs`
   - **seoDescription:** `Descubre el primer artículo del blog de ArkadiaLabs sobre tecnología e innovación.`

   **Relaciones (Opcional):**
   - **categories:** Selecciona la categoría que creaste
   - **tags:** Puedes crear tags como "Tutorial", "Inicio"
   - **author:** Selecciona o crea un autor

4. **Publicar:**
   - Click en "Save" (botón azul arriba a la derecha)
   - Luego click en "Publish"
   - Confirma la publicación

---

### Opción B: Crear desde API (Para Pruebas Rápidas)

```bash
curl -X POST http://localhost:1337/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Mi Primer Artículo",
      "slug": "mi-primer-articulo",
      "excerpt": "Este es el resumen de mi primer artículo",
      "content": "# Hola Mundo\n\nEste es mi **primer artículo**.\n\n## Características\n- Markdown\n- Código\n- Imágenes\n\n```javascript\nconst hello = \"world\";\n```",
      "featuredImageAlt": "Imagen del artículo",
      "publishedAt": "2025-10-08T00:00:00.000Z"
    }
  }'
```

**Nota:** Esta opción crea el artículo pero SIN imagen. Es mejor usar el panel admin para subir imágenes.

---

## 🖼️ Paso 3: Subir Imágenes (Importante)

### Desde el Panel Admin:

1. **Durante la creación del artículo:**
   - En el campo "Featured Image", click "Browse"
   - Selecciona una imagen de tu computadora
   - La imagen se subirá automáticamente

2. **Desde Media Library:**
   - Media Library (en la barra lateral)
   - Click "Upload assets"
   - Arrastra imágenes o selecciónalas
   - Luego asócialas a los artículos

### Consejos para Imágenes:

- **Tamaño ideal:** 1200x800px o 1920x1080px
- **Formato:** JPG o PNG (WebP para mejor rendimiento)
- **Peso:** Menor a 500KB (optimiza antes de subir)
- **Ratio:** 3:2 o 16:9 se ven mejor en el diseño

---

## 🎯 Paso 4: Verificar que Funciona

1. **Abre el blog:**
   ```
   http://localhost:3000
   ```

2. **Deberías ver:**
   - ✅ Tu artículo en la página principal
   - ✅ Imagen destacada (o placeholder si no subiste imagen)
   - ✅ Título, excerpt y meta información
   - ✅ Animaciones fluidas

3. **Click en el artículo:**
   - Deberías ver la página completa del artículo
   - Contenido Markdown renderizado
   - Barra de progreso de lectura
   - Botón "Volver"

---

## ⚠️ Solución de Problemas

### No veo artículos en el frontend

**Causa:** Permisos no configurados

**Solución:**
1. Verifica los permisos públicos (Paso 1)
2. Asegúrate de que el artículo esté **Published** (no Draft)
3. Reinicia el frontend: `Ctrl+C` y `npm run dev`

### Las imágenes no se muestran

**Causa:** Imagen no subida o permisos de Upload

**Solución:**
1. Verifica que subiste una imagen en el campo "Featured Image"
2. Verifica permisos de Upload en Settings → Roles → Public
3. Si no hay imagen, se mostrará un placeholder gris con "Sin Imagen"

### Error: "Failed to fetch from Strapi"

**Causa:** Backend no está corriendo

**Solución:**
```bash
cd backend
npm run develop
```

### Las categorías no aparecen

**Causa:** No has creado categorías o están en Draft

**Solución:**
1. Content Manager → Category → Create new entry
2. Rellena name y slug
3. Click "Save" y "Publish"

---

## 📊 Estructura Recomendada de Contenido

### Para Empezar:

1. **Crear 2-3 Categorías:**
   - Tecnología
   - Desarrollo
   - Diseño

2. **Crear 5-10 Tags:**
   - JavaScript
   - React
   - Next.js
   - Tutorial
   - Guía

3. **Crear 1-2 Autores:**
   - Tu perfil
   - Equipo de ArkadiaLabs

4. **Crear 3-5 Artículos:**
   - Al menos uno con imagen
   - Diferentes categorías
   - Contenido Markdown variado

---

## 🎨 Ejemplo de Artículo Completo

```markdown
# Cómo Empezar con Next.js 15

Next.js 15 trae mejoras significativas en rendimiento y developer experience.

## Instalación

```bash
npx create-next-app@latest mi-proyecto
```

## Características Nuevas

1. **Turbopack:** Más rápido que Webpack
2. **Server Actions:** Simplifica el backend
3. **Partial Prerendering:** Mejor performance

## Ejemplo de Código

```typescript
// app/page.tsx
export default function Home() {
  return <h1>¡Hola Next.js 15!</h1>
}
```

## Conclusión

Next.js 15 es la mejor versión hasta ahora. ¡Pruébalo hoy!
```

---

## ✅ Checklist Final

Antes de considerar el blog listo:

- [ ] Permisos públicos configurados
- [ ] Al menos 1 artículo publicado
- [ ] Imagen subida (o acepta el placeholder)
- [ ] Frontend muestra el artículo correctamente
- [ ] La página individual funciona
- [ ] Animaciones se ven fluidas
- [ ] Responsive funciona en móvil

---

## 🎉 ¡Listo!

Tu blog está completamente funcional. Ahora puedes:
- Crear más artículos
- Personalizar categorías y tags
- Añadir autores
- Experimentar con Markdown
- Disfrutar de las animaciones

---

**¿Necesitas ayuda?** Consulta la documentación completa en:
- [INICIO-RAPIDO.md](INICIO-RAPIDO.md)
- [INSTRUCCIONES.md](INSTRUCCIONES.md)
- [frontend/README.md](frontend/README.md)
