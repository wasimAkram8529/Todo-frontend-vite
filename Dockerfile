#-------Build Environmet---------------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


#--------Runtime Environment-----------
FROM nginx:alpine AS runtime

COPY --from=builder /app/dist /usr/share/nginx/html

COPY config.template.js /usr/share/nginx/html/config.template.js

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
