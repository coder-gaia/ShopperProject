FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY src ./src
COPY .env .env 

RUN npx tsc

EXPOSE 5000

CMD ["npm", "start"]
