#!/bin/bash

echo "🔧 Iniciando Backend de Strapi..."
echo ""
echo "📍 Navegando a la carpeta backend..."
cd "$(dirname "$0")/backend"

echo "✅ Verificando dependencias..."
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

echo ""
echo "🚀 Iniciando servidor de Strapi..."
echo "📱 Panel de administración: http://localhost:1337/admin"
echo "📱 API disponible en: http://localhost:1337/api"
echo ""
echo "🛑 Para detener el servidor, presiona Ctrl+C"
echo ""

npm run develop
