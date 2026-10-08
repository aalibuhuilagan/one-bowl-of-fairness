FROM node:20-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
ENV PORT=5174
EXPOSE 5174
CMD ["node", "server.cjs"]
