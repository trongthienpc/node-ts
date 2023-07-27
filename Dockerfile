FROM node:lts-alpine

WORKDIR /app/node-ts

COPY package.json .

RUN npm install --ignore-scripts

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]