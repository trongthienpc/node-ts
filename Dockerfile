FROM node:lts-alpine

WORKDIR /app/node-ts

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]