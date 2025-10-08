#!/bin/bash

echo "🚀 Iniciando Frontend del Blog de ArkadiaLabs..."
echo ""
echo "📍 Navegando a la carpeta frontend..."
cd "$(dirname "$0")/frontend"

echo "✅ Verificando dependencias..."
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

echo ""
echo "🎨 Iniciando servidor de desarrollo..."
echo "📱 El blog estará disponible en: http://localhost:3000"
echo "📱 Automáticamente redirigirá a: http://localhost:3000/blog"
echo ""
echo "⚠️  IMPORTANTE: Asegúrate de que el backend de Strapi esté corriendo"
echo "   Backend URL: http://localhost:1337"
echo ""
echo "🛑 Para detener el servidor, presiona Ctrl+C"
echo ""

npm run dev
