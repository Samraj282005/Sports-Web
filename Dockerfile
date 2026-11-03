FROM node:18.16.0-alpine3.18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0"]