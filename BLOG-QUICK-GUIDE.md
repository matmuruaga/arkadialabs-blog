# Blog Redesign - Guía Rápida

## 🎯 Cambios Principales

### 1. Hero Section - Problema del Banner Blanco RESUELTO ✅

**ANTES:**
```tsx
// Gradient muy débil - texto invisible al hacer scroll
<div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
```

**AHORA:**
```tsx
// Triple overlay + text shadows = legibilidad perfecta
<div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
<div className="absolute inset-0 bg-black/30" />

// + Text shadows
style={{ textShadow: '0 4px 12px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)' }}
```

### 2. Contenido Markdown - De Plano a Espectacular ✅

**ANTES:**
```tsx
// Prose básico sin personalización
<div className="prose prose-lg">
  <ReactMarkdown>{content}</ReactMarkdown>
</div>
```

**AHORA:**
```tsx
// Componentes custom para cada elemento
<ReactMarkdown
  components={{
    code: CodeBlock,        // Syntax highlighting + copy button
    blockquote: Blockquote, // Gradient + decoración
    a: CustomLink,          // Animated underline + external icon
    img: CustomImage,       // Shadow + caption
    h1-h6: Heading,        // Anchor links + hover effects
    // ... y mucho más
  }}
>
  {content}
</ReactMarkdown>
```

---

## 🚀 Iniciar el Proyecto

```bash
cd /Users/matia/Desktop/arkadiaLabs-blog/frontend
npm install
npm run dev
```

Visita: `http://localhost:3002/blog/[cualquier-slug]`

---

## 📝 Ejemplos de Uso

### Code Blocks con Syntax Highlighting

Tu Markdown:
```markdown
\`\`\`javascript
const hello = () => {
  console.log('Hello World!');
}
\`\`\`
```

Se renderiza como:
- 🏷️ Badge de lenguaje ("javascript")
- 📋 Botón de copiar (aparece en hover)
- 🎨 Syntax highlighting VS Code Dark+
- ✅ Feedback visual al copiar

### Blockquotes Estilizados

Tu Markdown:
```markdown
> Esta es una cita importante que se verá increíble
```

Se renderiza con:
- Borde izquierdo azul de 4px
- Background gradient sutil
- Comillas grandes decorativas
- Texto en itálica

### Links Externos

Tu Markdown:
```markdown
[Visita Google](https://google.com)
```

Se renderiza con:
- Color azul accent
- Underline animado (scale from left)
- Icono de external link →
- `target="_blank"` automático

### Imágenes con Caption

Tu Markdown:
```markdown
![Descripción de la imagen](url-de-imagen.jpg)
```

Se renderiza con:
- Bordes redondeados
- Box shadow 2xl
- Alt text como caption debajo
- Lazy loading

### Headings con Anchor Links

Tu Markdown:
```markdown
## Mi Sección Importante
```

Se renderiza con:
- ID automático: `#mi-seccion-importante`
- Hover muestra "#" al lado
- Click en "#" copia el link
- Smooth scroll desde TOC

---

## 🎨 Personalización

### Cambiar Colores Principales

Edita `/frontend/src/app/globals.css`:

```css
:root {
  /* Cambia estos valores */
  --site-accent-blue: #1C7ED6;    /* Tu color azul */
  --site-accent-purple: #9775FA;  /* Tu color morado */
}

.dark {
  /* Colores para dark mode */
  --site-accent-blue: #339AF0;
  --site-accent-purple: #B197FC;
}
```

### Ajustar Tipografía

Edita `/frontend/tailwind.config.ts`:

```typescript
theme: {
  extend: {
    fontFamily: {
      sans: ['Tu Fuente', 'Noto Sans', 'sans-serif'],
      mono: ['Tu Fuente Mono', 'JetBrains Mono', 'monospace'],
    },
  },
}
```

### Modificar Spacing del Contenido

Edita `/frontend/src/components/ArticleContent.tsx`:

```tsx
// Ejemplo: Cambiar spacing de párrafos
function Paragraph({ children, ...props }) {
  return (
    <p className="text-lg text-foreground/90 leading-[1.8] mb-8" {...props}>
      {/* mb-6 → mb-8 para más espacio */}
      {children}
    </p>
  );
}
```

---

## 🔧 Componentes Principales

### 1. Hero Section (`page.tsx`)

```tsx
// Características clave:
- Altura: h-[85vh]
- Parallax: useTransform con scale 1 → 1.1
- Fade out: opacity 1 → 0 en 400px de scroll
- Overlays: 3 capas de gradients
- Text shadows: Para legibilidad
```

### 2. ArticleContent (`ArticleContent.tsx`)

```tsx
// Componentes custom incluidos:
- CodeBlock: Syntax highlighting + copy
- Blockquote: Gradient + decoración
- CustomLink: Animated underline
- CustomImage: Shadow + caption
- Heading: Anchor links (H1-H6)
- Lists: Styled bullets/numbers
- Table: Bordered + hover states
- HorizontalRule: Gradient + dots
```

### 3. TableOfContents (`TableOfContents.tsx`)

```tsx
// Características:
- Auto-extracción de headings del contenido
- IntersectionObserver para tracking
- Smooth scroll al hacer click
- Solo visible en XL+ (1280px+)
- Aparece después de 400px scroll
- Active indicator animado
```

---

## 📱 Responsive Breakpoints

```tsx
// Mobile First
sm:  640px   // Small phones
md:  768px   // Tablets
lg:  1024px  // Laptops
xl:  1280px  // Desktops (TOC visible)
2xl: 1536px  // Large screens
```

Ejemplos de uso:
```tsx
// Typography responsive
className="text-4xl md:text-6xl lg:text-7xl"

// Padding responsive
className="px-6 py-20 md:py-24"

// Grid responsive
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

---

## 🎭 Animaciones

### Framer Motion

```tsx
// Fade in al entrar
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>

// Parallax en hero
const heroScale = useTransform(scrollY, [0, 400], [1, 1.1]);
<motion.div style={{ scale: heroScale }}>

// Scroll-triggered
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
```

### CSS Animations

```css
/* Fade in utility */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Uso */
<div className="animate-fadeIn">
```

---

## 🐛 Debugging

### Problema: Colores no funcionan

```bash
# 1. Verifica que globals.css esté importado
# En layout.tsx debe haber:
import '@/app/globals.css'

# 2. Reinicia el servidor
npm run dev
```

### Problema: Syntax highlighting no aparece

```bash
# Verifica instalación
npm list react-syntax-highlighter

# Si no está, instala:
npm install react-syntax-highlighter @types/react-syntax-highlighter
```

### Problema: TOC no visible

```tsx
// Checklist:
1. ¿Pantalla > 1280px? (solo XL+)
2. ¿Scroll > 400px hacia abajo?
3. ¿El artículo tiene headings H1-H3?
4. ¿TableOfContents está importado en page.tsx?
```

---

## 📊 Performance Tips

### Optimizar Imágenes

```tsx
// Usar Next.js Image en lugar de <img>
import Image from 'next/image';

<Image
  src={imageUrl}
  alt="..."
  width={800}
  height={400}
  priority={false}  // true solo para hero
/>
```

### Lazy Load Componentes Pesados

```tsx
// Dynamic import para TOC
import dynamic from 'next/dynamic';

const TableOfContents = dynamic(
  () => import('@/components/TableOfContents'),
  { ssr: false }
);
```

### Minimizar Re-renders

```tsx
// Usar useMemo para contenido procesado
const processedContent = useMemo(
  () => convertContentToText(content),
  [content]
);
```

---

## 🎯 Checklist de Verificación

Antes de deployar, verifica:

- [ ] Hero se ve bien al hacer scroll (no blanco)
- [ ] Texto siempre legible sobre imagen
- [ ] Code blocks tienen syntax highlighting
- [ ] Copy button funciona en code blocks
- [ ] Links externos abren en nueva pestaña
- [ ] TOC aparece en desktop (XL+)
- [ ] TOC scroll smooth funciona
- [ ] Headings tienen anchor links
- [ ] Imágenes tienen caption del alt text
- [ ] Blockquotes tienen estilo distintivo
- [ ] Listas tienen bullets/números custom
- [ ] Tablas tienen hover states
- [ ] Share button funciona
- [ ] Back button navega correctamente
- [ ] Responsive en mobile/tablet/desktop
- [ ] Dark mode se ve bien
- [ ] No hay console errors

---

## 🚀 Deploy a Producción

```bash
# 1. Build
npm run build

# 2. Test producción localmente
npm run start

# 3. Deploy (ejemplo con Vercel)
vercel --prod
```

---

## 📚 Recursos Útiles

### Documentación
- [Framer Motion](https://www.framer.com/motion/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- [Tailwind CSS v4](https://tailwindcss.com/)

### Inspiración de Diseño
- [Medium](https://medium.com) - Tipografía
- [Vercel Blog](https://vercel.com/blog) - Layout
- [Stripe Blog](https://stripe.com/blog) - Spacing
- [Dev.to](https://dev.to) - Code blocks

---

## 💡 Tips Finales

1. **Siempre prueba en diferentes tamaños de pantalla**
2. **Verifica contraste de colores con herramientas WCAG**
3. **Usa lighthouse para auditar performance**
4. **Prueba con lectores de pantalla para accesibilidad**
5. **Mantén las animaciones sutiles (< 300ms)**
6. **Prefiere CSS sobre JS para animaciones simples**
7. **Lazy load todo lo que no sea crítico**
8. **Optimiza imágenes antes de subir**

---

**Happy Coding! 🎉**
