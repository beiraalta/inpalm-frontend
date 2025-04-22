FROM node:22.14.0
WORKDIR /app
COPY package*.json ./
RUN npm install -g expo-cli && npm install
COPY . .
CMD ["npx", "expo", "start", "--tunnel", "--port", "4003"]