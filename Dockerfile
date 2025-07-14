# c:\proyectos\sistema-inventario\frontend\Dockerfile
FROM node:20-alpine

WORKDIR /app
 
# Copia los archivos de dependencias primero para aprovechar la caché de Docker.
COPY package.json package-lock.json ./
 
# Instala las dependencias. Esta capa solo se reconstruirá si los archivos de arriba cambian.
RUN npm install
 
# Ahora copia el resto del código fuente de la aplicación.
# Esto debe ir ANTES del CMD para que los archivos existan cuando se ejecute el comando.
COPY . .
 
# Expone el puerto que usa Vite.
EXPOSE 5173

# El comando para iniciar el servidor de desarrollo.
# El "-- --host" le dice a Vite que escuche en todas las interfaces de red (0.0.0.0),
# lo que es crucial para que sea accesible desde fuera del contenedor.
CMD ["npm", "run", "dev"]
