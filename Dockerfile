# Etapa 1: Build da aplicação React/Vite
FROM node:20-alpine AS build

WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm ci

# Copiar código-fonte e buildar
COPY . .
RUN npm run build

# Etapa 2: Servidor Web Nginx ultra-leve para produção
FROM nginx:alpine

# Copiar build da aplicação para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Configuração customizada do Nginx com suporte a SPA (React Router) e compressão gzip
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    gzip on; \
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, no-transform"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
