FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install


COPY tsconfig.json ./
COPY src ./src

RUN npm run build

EXPOSE 5000

# Comando para iniciar a aplicação
CMD [ "npm", "start" ]
