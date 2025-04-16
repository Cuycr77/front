# Usar la imagen oficial de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de tu aplicación
COPY . /app/

# Instalar dependencias
RUN npm install

# Construir la aplicación para producción
RUN npm run build

# Servir la aplicación en producción
RUN npm install -g serve

# Exponer el puerto que usarás para el frontend
EXPOSE 5000

# Comando para ejecutar la app
CMD ["serve", "-s", "dist", "-l", "5000"]
