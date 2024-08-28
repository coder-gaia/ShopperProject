FROM node:18

WORKDIR /usr/src/app

# Copie o package.json e package-lock.json primeiro para aproveitar o cache de camadas
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY tsconfig.json ./
COPY src ./src

# Compile o TypeScript para JavaScript
RUN npx tsc

# Exponha a porta que a aplicação usará
EXPOSE 5000

# Comando para iniciar a aplicação
CMD [ "npm", "start" ]
