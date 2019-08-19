FROM node:dubnium-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production --verbose
COPY . ./

EXPOSE 20000
ENTRYPOINT ["npm", "run", "deploy"];
