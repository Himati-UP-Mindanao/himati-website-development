FROM node:22

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install cross-env

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
